import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { Field, normalizeField, parsePrimitiveType } from "../common";
import { TicketRecord } from "../wallet";
import { useContext, useEffect, useMemo, useState } from "react";
import { launchTicketQueryKey, useLaunchTicket } from "./useLaunchTicket";
import { claimTicket } from "../write";
import { useLaunch } from "./useLaunch";
import { useCreditsAmounts } from "./useCreditsAmounts";
import { useWallet } from "./useWallet";
import {
  ConnectedWalletContextState,
  ParsedLaunch,
  OnchainToken,
} from "../types";
import { useToken } from "./useToken";
import { AwaitTxContext } from "widgets/await-tx-modal";
import { tokenBalancesQueryKey } from "./useTokenBalances";

type Response =
  | {
      loading: false;
      launch: ParsedLaunch;
      token: OnchainToken;
      records: Array<TicketRecord>;
      selectedTicket: TicketRecord | undefined;
      selectTicket(ticket: TicketRecord): void;
      privacy: "public" | "private";
      setPrivacy(privacy: "public" | "private"): void;
      enabled: boolean;
      blocker: string | undefined;
      mutation: UseMutationResult<void, unknown, void, unknown>;
    }
  | { loading: true };

export function useClaimTicket(launchId: string, tokenId: string): Response {
  const queryClient = useQueryClient();
  const wallet = useWallet();

  const [selectedTicket, selectTicket] = useState<TicketRecord | undefined>();
  const [privacy, setPrivacy] = useState<"public" | "private">("public");
  const { setTransaction } = useContext(AwaitTxContext);

  const tickets = useLaunchTicket(launchId);
  const launch = useLaunch(launchId);
  const token = useToken(tokenId);
  const credits = useCreditsAmounts();

  const parsedTokenId = useMemo(
    () => parsePrimitiveType(normalizeField(tokenId)) as Field,
    [tokenId]
  );

  useEffect(() => {
    if (!selectedTicket && launch.data) {
      if (
        credits.amounts &&
        tickets.data?.privateTickets &&
        tickets.data.privateTickets.length > 0
      ) {
        selectTicket(tickets.data.privateTickets[0]);
      }
    }
  }, [launch.data, tickets.data, selectedTicket, credits.amounts]);

  const context = useMemo(() => {
    if (launch.data && selectedTicket) {
      if (privacy === "public") {
        return claimTicket.createPublicContext(parsedTokenId, selectedTicket);
      } else {
        return claimTicket.createPrivateContext(parsedTokenId, selectedTicket);
      }
    }
  }, [selectedTicket, launch.data, parsedTokenId, privacy]);

  const enabled = useMemo(
    () =>
      Boolean(
        launch.data &&
          token.data &&
          selectedTicket &&
          tickets.data &&
          context &&
          wallet.connected
      ),
    [
      launch.data,
      token.data,
      selectedTicket,
      tickets.data,
      wallet.connected,
      context,
    ]
  );

  const blocker = useMemo(() => {
    if (enabled && context && credits.amounts) {
      return claimTicket.check(context, credits.amounts);
    }
  }, [enabled, context, credits.amounts]);

  const onSuccess = async () => {
    await queryClient.invalidateQueries("creditsAmounts");
    await queryClient.invalidateQueries(launchTicketQueryKey(launchId));
    await queryClient.invalidateQueries(tokenBalancesQueryKey(tokenId));
  };

  const mutation = useMutation(
    async () => {
      if (enabled) {
        const txId = await claimTicket.claim(
          context!,
          wallet as ConnectedWalletContextState,
          credits.amounts!
        );

        setTransaction({ txId, txTitle: "Ticket claim" });
      }
    },
    {
      mutationKey: [
        "claim",
        "ticket",
        "for",
        "launch",
        launchId,
        "and",
        "token",
        tokenId,
      ],
      onSuccess,
    }
  );

  if (
    tickets.isSuccess &&
    !credits.loading &&
    launch.isSuccess &&
    token.isSuccess
  ) {
    return {
      loading: false,
      blocker,
      launch: launch.data,
      token: token.data!,
      enabled,
      mutation,
      selectedTicket,
      selectTicket,
      privacy,
      setPrivacy,
      records: tickets.data.privateTickets,
    };
  } else {
    return {
      loading: true,
    };
  }
}

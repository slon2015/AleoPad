import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { Field, U128, normalizeField, parsePrimitiveType } from "../common";
import { TicketRecord } from "../wallet";
import { useEffect, useMemo, useState } from "react";
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

type Response =
  | {
      loading: false;
      publicTicketAmount: U128;
      launch: ParsedLaunch;
      token: OnchainToken;
      records: Array<TicketRecord>;
      selectedTicket: "public" | TicketRecord | undefined;
      selectTicket(ticket: "public" | TicketRecord): void;
      enabled: boolean;
      blocker: string | undefined;
      mutation: UseMutationResult<void, unknown, void, unknown>;
    }
  | { loading: true };

export function useClaimTicket(launchId: string, tokenId: string): Response {
  const queryClient = useQueryClient();
  const wallet = useWallet();

  const [selectedTicket, selectTicket] = useState<
    "public" | TicketRecord | undefined
  >();

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
      if (launch.data.flags.isPublicSellsEnabled) {
        selectTicket("public");
      } else if (
        credits.amounts &&
        tickets.data?.privateTickets &&
        tickets.data.privateTickets.length > 0
      ) {
        selectTicket(tickets.data.privateTickets[0]);
      }
    }
  }, [launch.data, tickets.data, selectedTicket, credits.amounts]);

  const context = useMemo(() => {
    if (launch.data) {
      if (selectedTicket === "public" && tickets.data?.publicTicketAmount) {
        return claimTicket.createPublicContext(
          launch.data,
          parsedTokenId,
          tickets.data.publicTicketAmount
        );
      } else if (typeof selectedTicket === "object") {
        return claimTicket.createPrivateContext(parsedTokenId, selectedTicket);
      }
    }
  }, [selectedTicket, launch.data, tickets.data, parsedTokenId]);

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
  };

  const mutation = useMutation(
    async () => {
      if (enabled) {
        claimTicket.claim(
          context!,
          wallet as ConnectedWalletContextState,
          credits.amounts!
        );
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
      records: tickets.data.privateTickets,
      publicTicketAmount: tickets.data.publicTicketAmount,
    };
  } else {
    return {
      loading: true,
    };
  }
}

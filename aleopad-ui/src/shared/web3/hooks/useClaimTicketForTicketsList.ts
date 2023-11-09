import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { Field, normalizeField, parsePrimitiveType } from "../common";
import { TicketRecord } from "../wallet";
import { useContext, useMemo, useState } from "react";
import { launchTicketQueryKey } from "./useLaunchTicket";
import { claimTicket } from "../write";
import { useCreditsAmounts } from "./useCreditsAmounts";
import { useWallet } from "./useWallet";
import { ConnectedWalletContextState } from "../types";
import { useToken } from "./useToken";
import { AwaitTxContext } from "widgets/await-tx-modal";
import { tokenBalancesQueryKey } from "./useTokenBalances";

type Response =
  | {
      loading: false;
      privacy: "public" | "private";
      setPrivacy(privacy: "public" | "private"): void;
      enabled: boolean;
      blocker: string | undefined;
      mutation: UseMutationResult<void, unknown, void, unknown>;
    }
  | { loading: true };

export function useClaimTicketForTicketsList(
  tokenId: string,
  ticket?: TicketRecord
): Response {
  const queryClient = useQueryClient();
  const wallet = useWallet();

  const [privacy, setPrivacy] = useState<"public" | "private">("public");
  const { setTransaction } = useContext(AwaitTxContext);

  const token = useToken(tokenId);
  const credits = useCreditsAmounts();

  const parsedTokenId = useMemo(
    () => parsePrimitiveType(normalizeField(tokenId)) as Field,
    [tokenId]
  );

  const context = useMemo(() => {
    if (ticket) {
      if (privacy === "public") {
        return claimTicket.createPublicContext(parsedTokenId, ticket);
      } else {
        return claimTicket.createPrivateContext(parsedTokenId, ticket);
      }
    }
  }, [ticket, privacy, parsedTokenId]);

  const enabled = useMemo(
    () => Boolean(ticket && context && wallet.connected),
    [ticket, wallet.connected, context]
  );

  const blocker = useMemo(() => {
    if (enabled && context && credits.amounts) {
      return claimTicket.check(context, credits.amounts);
    }
  }, [enabled, context, credits.amounts]);

  const onSuccess = async () => {
    await queryClient.invalidateQueries("creditsAmounts");
    await queryClient.invalidateQueries(
      launchTicketQueryKey(ticket!.onchainRecord.data.launch_id)
    );
    await queryClient.invalidateQueries(tokenBalancesQueryKey(tokenId));
  };

  const mutation = useMutation<void, Error>(
    async () => {
      if (enabled) {
        const txId = await claimTicket.claim(
          context!,
          wallet as ConnectedWalletContextState,
          credits.amounts!
        );
        setTransaction(txId, "Claim ticket");
      }
    },
    {
      mutationKey: ["claim", "ticket", ticket],
      onSuccess,
    }
  );

  if (!credits.loading && token.isSuccess) {
    return {
      loading: false,
      blocker,
      enabled,
      mutation,
      privacy,
      setPrivacy,
    };
  } else {
    return {
      loading: true,
    };
  }
}

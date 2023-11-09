import { UseMutationResult, useMutation } from "react-query";
import { U128, normalizeField } from "../common";
import { useContext, useMemo, useState } from "react";
import { grantCap } from "../write";
import { useCreditsAmounts } from "./useCreditsAmounts";
import { useWallet } from "./useWallet";
import {
  ConnectedWalletContextState,
  OnchainAleopadLaunchAdministartionRecord,
} from "../types";
import { AwaitTxContext } from "widgets/await-tx-modal";

type Response =
  | {
      loading: false;
      amount: U128;
      setAmount: (am: U128) => void;
      grantee: string | null;
      setGrantee: (g: string | null) => void;
      enabled: boolean;
      blocker: string | undefined;
      mutation: UseMutationResult<void, unknown, void, unknown>;
    }
  | { loading: true };

export function useGrantCapForLaunch(
  administration?: OnchainAleopadLaunchAdministartionRecord
): Response {
  const wallet = useWallet();
  const credits = useCreditsAmounts();
  const { setTransaction } = useContext(AwaitTxContext);

  const [amount, setAmount] = useState(new U128(0));
  const [grantee, setGrantee] = useState<string | null>(null);

  const context = useMemo(() => {
    if (administration && grantee) {
      return grantCap.createContext(grantee, amount, administration);
    }
  }, [administration, grantee, amount]);

  const enabled = useMemo(
    () =>
      Boolean(administration && wallet.connected && context && credits.amounts),
    [wallet.connected, context, administration, credits.amounts]
  );

  const blocker = useMemo(() => {
    if (enabled && context && credits.amounts) {
      return grantCap.check(context, credits.amounts);
    }
  }, [enabled, context, credits.amounts]);

  const mutation = useMutation(
    async () => {
      if (enabled) {
        const txId = await grantCap.grant(
          context!,
          wallet as ConnectedWalletContextState,
          credits.amounts!
        );
        setTransaction({ txId, txTitle: "Cap grant" });
      }
    },
    {
      mutationKey: [
        "grant",
        "cap",
        "for",
        "launch",
        normalizeField(administration!.data.launch_id),
      ],
    }
  );

  if (!credits.loading) {
    return {
      loading: false,
      blocker,
      enabled,
      mutation,
      amount,
      grantee,
      setAmount,
      setGrantee,
    };
  } else {
    return {
      loading: true,
    };
  }
}

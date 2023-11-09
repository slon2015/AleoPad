import { useMutation, useQueryClient, UseMutationResult } from "react-query";
import { useCreditsAmounts } from "./useCreditsAmounts";
import { useWallet } from "./useWallet";
import { setUpLaunch } from "../write";
import { ConnectedWalletContextState } from "../types";
import React, { useContext } from "react";
import { AwaitTxContext } from "widgets/await-tx-modal";
import { LAUNCH_LIST_QUERY_KEY } from "./useLaunchesList";
import { TOKENS_LIST_QUERY_KEY } from "./useTokensList";
import { SetUpContext } from "../write/setup-launch/types";

type SetUpLaunchMethod =
  | {
      enabled: true;
      getBlocker(dto: setUpLaunch.NewLaunch): string | undefined;
      mutation: UseMutationResult<void, Error, setUpLaunch.NewLaunch>;
    }
  | {
      enabled: false;
    };

export function useSetUpLaunch(
  onSuccessComponent: (ctx: SetUpContext) => React.ReactNode
): SetUpLaunchMethod {
  const wallet = useWallet();
  const { setTransaction } = useContext(AwaitTxContext);

  const queryClient = useQueryClient();
  const { amounts } = useCreditsAmounts();

  const onSuccess = async () => {
    await queryClient.invalidateQueries("creditsAmounts");
    await queryClient.invalidateQueries(LAUNCH_LIST_QUERY_KEY);
    await queryClient.invalidateQueries(TOKENS_LIST_QUERY_KEY);
  };

  const context = (dto: setUpLaunch.NewLaunch) =>
    setUpLaunch.createContext(wallet as ConnectedWalletContextState, dto);

  const checkEnabled = () => {
    return wallet.connected && amounts !== undefined;
  };

  const getBlocker = (dto: setUpLaunch.NewLaunch) => {
    if (checkEnabled()) {
      return setUpLaunch.check(context(dto), amounts!.publicAmount);
    }
  };

  const mutation = useMutation<void, Error, setUpLaunch.NewLaunch>(
    async (dto: setUpLaunch.NewLaunch) => {
      if (checkEnabled()) {
        const ctx = context(dto);
        const txId = await setUpLaunch.setUp(
          ctx,
          wallet as ConnectedWalletContextState,
          amounts!.publicAmount
        );
        setTransaction({
          txId,
          txTitle: "Launch set up",
          onSuccess: onSuccessComponent.bind(null, ctx),
        });
      }
    },
    {
      mutationKey: ["setUp", "launch"],
      onSuccess,
    }
  );

  return checkEnabled()
    ? {
        enabled: true,
        getBlocker,
        mutation,
      }
    : { enabled: false };
}

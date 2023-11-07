import { useMutation, useQueryClient, UseMutationResult } from "react-query";
import { useCreditsAmounts } from "./useCreditsAmounts";
import { useWallet } from "./useWallet";
import { setUpLaunch } from "../write";
import { ConnectedWalletContextState } from "../types";
import { useContext } from "react";
import { AwaitTxContext } from "widgets/await-tx-modal";

type SetUpLaunchMethod =
  | {
      enabled: true;
      getBlocker(dto: setUpLaunch.NewLaunch): string | undefined;
      mutation: UseMutationResult<void, Error, setUpLaunch.NewLaunch>;
    }
  | {
      enabled: false;
    };

export function useSetUpLaunch(): SetUpLaunchMethod {
  const wallet = useWallet();
  const { setTransaction } = useContext(AwaitTxContext);

  const queryClient = useQueryClient();
  const { amounts } = useCreditsAmounts();

  const onSuccess = async () => {
    await queryClient.invalidateQueries("creditsAmounts");
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
        const txId = await setUpLaunch.setUp(
          context(dto),
          wallet as ConnectedWalletContextState,
          amounts!.publicAmount
        );
        setTransaction(txId, "Launch set up");
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

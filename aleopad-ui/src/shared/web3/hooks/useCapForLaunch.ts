import { useQuery } from "react-query";
import { getCapForLaunch } from "../wallet";
import { useWallet } from "./useWallet";
import { ConnectedWalletContextState } from "../types";
import { Field } from "../common";

export function capQueryKey(launchId: string | Field) {
  return ["cap", "for", "launch", launchId];
}

export function useCapForLaunch(launchId: string | Field) {
  const wallet = useWallet();

  return useQuery({
    queryKey: capQueryKey(launchId),
    enabled: wallet.connected,
    queryFn: ({ queryKey }) =>
      getCapForLaunch(
        queryKey[3] as string,
        wallet as ConnectedWalletContextState
      ),
  });
}

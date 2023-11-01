import { useQuery } from "react-query";
import { Field, normalizeField } from "../common";
import { getLaunchAdministrationRecord } from "../wallet";
import { useWallet } from "./useWallet";
import { ConnectedWalletContextState } from "../types";

export function launchAdministrationQueryKey(
  launchId: string | Field | undefined
) {
  return [
    "administration",
    "for",
    "launch",
    launchId ? normalizeField(launchId) : undefined,
  ];
}

export function useLaunchAdministartion(launchId: string | Field | undefined) {
  const wallet = useWallet();
  return useQuery({
    queryKey: launchAdministrationQueryKey(launchId),
    queryFn: ({ queryKey }) =>
      getLaunchAdministrationRecord(
        queryKey[3]!,
        wallet as ConnectedWalletContextState
      ),
    enabled: wallet.connected && Boolean(launchId),
  });
}

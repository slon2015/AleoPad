import { useQuery } from "react-query";
import { useWallet } from "./useWallet";
import { getTicketForLaunch } from "../wallet";
import { ConnectedWalletContextState } from "../types";

export function launchTicketQueryKey(launchId: string) {
  return ["tickets", "for", "launch", launchId];
}

export function useLaunchTicket(launchId: string) {
  const wallet = useWallet();

  return useQuery({
    enabled: wallet.connected,
    queryKey: launchTicketQueryKey(launchId),
    queryFn: ({ queryKey }) =>
      getTicketForLaunch({
        launchId: queryKey[3],
        ...(wallet as ConnectedWalletContextState),
      }),
  });
}

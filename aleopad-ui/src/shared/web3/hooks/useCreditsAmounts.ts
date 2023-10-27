import { useWallet } from "./useWallet";
import { useQuery } from "react-query";
import { ConnectedWalletContextState } from "../types";
import { CreditAmounts, getCredits } from "../wallet";

type Response = {
  amounts: Awaited<CreditAmounts> | undefined;
  loading: boolean;
  error?: string;
};

export function useCreditsAmounts(): Response {
  const wallet = useWallet();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["creditsAmounts"],
    enabled: wallet.connected,
    queryFn: () => getCredits(wallet as ConnectedWalletContextState),
  });

  return {
    amounts: data,
    loading: isLoading,
    error: isError ? String(error) : undefined,
  };
}

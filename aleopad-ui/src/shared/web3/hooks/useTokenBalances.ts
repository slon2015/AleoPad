import { useQuery } from "react-query";
import { Field, U128, normalizeField, parsePrimitiveType } from "../common";
import { getTokenRecords } from "../wallet";
import { useWallet } from "./useWallet";

type Response = {
  publicBalance: U128;
  privateBalance: U128;
};

export function tokenBalancesQueryKey(tokenId: string | Field) {
  return ["get", "token", "balances", "for", normalizeField(tokenId)];
}

export function useTokenBalances(tokenId: string | Field | undefined | null) {
  const wallet = useWallet();

  async function fetchBalances(tokenId: string): Promise<Response> {
    if (!wallet.connected) {
      throw new Error("Wallet not connected");
    }
    const privateRecords = await getTokenRecords(wallet, tokenId);

    return {
      publicBalance: new U128(0),
      privateBalance: privateRecords
        .map((r) => parsePrimitiveType(r.data.amount) as U128)
        .reduce((prev, cur) => prev.plus(cur), new U128(0)),
    };
  }

  return useQuery({
    queryKey: tokenBalancesQueryKey(tokenId!),
    queryFn: ({ queryKey }) => fetchBalances(queryKey[4]),
    enabled: wallet.connected && Boolean(tokenId),
  });
}

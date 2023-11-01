import { UseQueryResult, useQuery } from "react-query";
import { getTokenById } from "../read";
import { Field, normalizeField } from "../common";

export function tokenQueryKey(tokenId?: string | Field | null) {
  return ["token", tokenId && normalizeField(tokenId)];
}

export function useToken(
  tokenId?: string | Field,
  dependencyQuery?: UseQueryResult
) {
  return useQuery({
    queryKey: tokenQueryKey(tokenId),
    queryFn: ({ queryKey }) =>
      Boolean(queryKey[1]) ? getTokenById(queryKey[1] as string) : null,
    enabled: (dependencyQuery && dependencyQuery.isSuccess) || !dependencyQuery,
  });
}

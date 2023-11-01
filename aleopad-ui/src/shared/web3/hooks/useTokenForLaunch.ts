import { useQuery } from "react-query";
import { getTokenIdForLaunch } from "../read";
import { Field, normalizeField, parsePrimitiveType } from "../common";
import { useToken } from "./useToken";

export function tokenIdForLaunchQueryKey(launchId: string | Field) {
  return ["token", "id", "for", "launch", normalizeField(launchId)];
}

export function useTokenForLaunch(launchId: string | Field) {
  const tokenIdRequest = useQuery({
    queryKey: tokenIdForLaunchQueryKey(launchId),
    queryFn: ({ queryKey }) =>
      getTokenIdForLaunch(parsePrimitiveType(queryKey[4]) as Field),
  });

  return useToken(tokenIdRequest.data!, tokenIdRequest);
}

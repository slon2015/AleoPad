import { useQuery } from "react-query";
import { getTokenById } from "../read";

export function useToken(tokenId?: string) {
  return useQuery({
    queryKey: ["token", tokenId],
    queryFn: ({ queryKey }) =>
      Boolean(queryKey[1]) ? getTokenById(queryKey[1] as string) : null,
  });
}

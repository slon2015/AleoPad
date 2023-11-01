import { useQuery, useQueryClient } from "react-query";
import { getTokens } from "../read";
import { tokenQueryKey } from "./useToken";

const TOKENS_LIST_QUERY_KEY = ["get", "tokens", "list"];

export function useTokensList() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: TOKENS_LIST_QUERY_KEY,
    queryFn: () => getTokens(),
    onSuccess(data) {
      for (let index = 0; index < data.length; index++) {
        const token = data[index];
        queryClient.setQueryData(tokenQueryKey(token.id), token);
      }
    },
  });
}

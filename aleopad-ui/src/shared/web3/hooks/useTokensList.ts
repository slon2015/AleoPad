import { useQuery } from "react-query";
import { getTokens } from "../read";

export function useTokensList() {
  return useQuery({
    queryKey: ["get", "tokens", "list"],
    queryFn: () => getTokens(),
  });
}

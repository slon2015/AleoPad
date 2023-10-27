import { useQuery } from "react-query";
import { useBlockHeight } from "./useBlockHeight";
import { getMeanBlockTime } from "../read";

type Response = {
  meanBlockTimeInSeconds?: number;
  loading: boolean;
  error?: string;
};

export function useMeanBlockTime(): Response {
  const { blockHeight } = useBlockHeight();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["meanBlockTime", blockHeight],
    queryFn: ({ queryKey }) => getMeanBlockTime(queryKey[1] as number),
    enabled: blockHeight !== undefined,
    keepPreviousData: true,
  });

  return {
    meanBlockTimeInSeconds: data,
    loading: isLoading,
    error: isError ? String(error) : undefined,
  };
}

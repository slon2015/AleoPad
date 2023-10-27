import { useQuery } from "react-query";
import { getBlockHeight } from "../read";

type Response = {
  blockHeight?: number;
  loading: boolean;
  error?: string;
};

export function useBlockHeight(): Response {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blockHeight"],
    queryFn: () => getBlockHeight(),
    refetchInterval: 5000,
  });

  return {
    blockHeight: data,
    loading: isLoading,
    error: isError ? String(error) : undefined,
  };
}

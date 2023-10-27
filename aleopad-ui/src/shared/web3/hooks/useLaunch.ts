import { useQuery } from "react-query";
import { getLaunchById } from "../read";

export function useLaunch(launchId: string) {
  return useQuery({
    queryKey: ["launch", launchId],
    queryFn: ({ queryKey }) => getLaunchById(queryKey[1] as string),
  });
}

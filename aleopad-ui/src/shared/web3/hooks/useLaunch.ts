import { useQuery } from "react-query";
import { getLaunchById } from "../read";
import { Field, normalizeField } from "../common";

export function launchQueryKey(id?: string | Field) {
  return ["launch", id && normalizeField(id)];
}

export function useLaunch(launchId: string | Field) {
  return useQuery({
    queryKey: launchQueryKey(launchId),
    queryFn: ({ queryKey }) => getLaunchById(queryKey[1] as string),
  });
}

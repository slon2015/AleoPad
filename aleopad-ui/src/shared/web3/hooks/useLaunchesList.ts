import { useQuery, useQueryClient } from "react-query";
import { getLaunches } from "../read";
import { launchQueryKey } from "./useLaunch";

const LAUNCH_LIST_QUERY_KEY = ["get", "launches", "list"];

export function useLaunchesList() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: LAUNCH_LIST_QUERY_KEY,
    queryFn: () => getLaunches(),
    onSuccess(data) {
      for (let index = 0; index < data.length; index++) {
        const launch = data[index];
        queryClient.setQueryData(launchQueryKey(launch.id), launch);
      }
    },
  });
}

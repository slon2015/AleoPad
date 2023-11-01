import { useBlockHeight } from "shared/web3";
import {
  useLaunch as useOnchainLaunch,
  useToken as useOnchainToken,
} from "shared/web3";

import { Launch, mapLaunch } from "../model";

type LaunchState = {
  launch?: Launch;
  blockHeight?: number;
  loading: boolean;
  error?: string;
};

export function useLaunch(id: string): LaunchState {
  const {
    data: launch,
    isLoading: launchLoading,
    error: launchError,
  } = useOnchainLaunch(id);
  const {
    data: token,
    isLoading: tokenLoading,
    error: tokenError,
  } = useOnchainToken(launch?.tokenId?.toFixed());
  const {
    blockHeight,
    loading: heightLoading,
    error: heightError,
  } = useBlockHeight();

  return {
    launch: mapLaunch(launch, blockHeight, token),
    blockHeight,
    loading: launchLoading || tokenLoading || heightLoading,
    error: (launchError || tokenError || heightError || undefined) as
      | string
      | undefined,
  };
}

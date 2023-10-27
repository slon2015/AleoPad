import { Launch as DbLaunch, Token as DbToken } from "shared/web3/db";
import { getLaunchById, useBlockHeight } from "shared/web3";
import BigNumber from "bignumber.js";
import { useLaunch as useDbLaunch, useToken } from "shared/hooks";

import { Launch } from "../model";

type LaunchState = {
  launch?: Launch;
  blockHeight?: number;
  loading: boolean;
  error?: string;
};

function mapPrivacy(
  flags: Awaited<ReturnType<typeof getLaunchById>>["flags"]
): Launch["privacy"] {
  if (flags.isPrivateSellsEnabled && flags.isPublicSellsEnabled) {
    return "mixed";
  }

  if (flags.isPrivateSellsEnabled) {
    return "private";
  }

  return "public";
}

function mapStage(
  {
    sellBlockDuration,
    sellStartBlock,
    claimStartBlock,
    claimBlockDuration,
  }: DbLaunch,
  blockHeight: number
): Launch["stage"] {
  if (blockHeight < sellStartBlock) {
    return "pending";
  } else if (
    blockHeight >= sellStartBlock &&
    blockHeight < sellStartBlock + sellBlockDuration
  ) {
    return "sales";
  } else if (
    blockHeight >= sellStartBlock + sellBlockDuration &&
    blockHeight < claimStartBlock
  ) {
    return "await TGE";
  } else if (
    blockHeight >= claimStartBlock &&
    (claimBlockDuration === 0 ||
      blockHeight < claimStartBlock + claimBlockDuration)
  ) {
    return "claims";
  } else {
    return "finished";
  }
}

function mapLaunch(
  dbLaunch?: DbLaunch,
  blockHeight?: number,
  token?: DbToken
): Launch | undefined {
  if (!dbLaunch || !blockHeight) {
    return undefined;
  }
  return {
    id: dbLaunch.id,
    adminAddress: dbLaunch.adminAddress,
    sellStartBlock: dbLaunch.sellStartBlock,
    sellBlockDuration: dbLaunch.sellBlockDuration,
    claimStartBlock: dbLaunch.claimStartBlock,
    claimBlockDuration: dbLaunch.claimBlockDuration,
    ratio: BigNumber(dbLaunch.numerator).div(dbLaunch.denominator).toFixed(),
    privacy: mapPrivacy(dbLaunch.flags),
    cap: dbLaunch.flags.isCapEnabled,
    token,
    stage: mapStage(dbLaunch, blockHeight),
  };
}

export function useLaunch(id: string): LaunchState {
  const {
    launch,
    loading: launchLoading,
    error: launchError,
  } = useDbLaunch(id);
  const {
    token,
    loading: tokenLoading,
    error: tokenError,
  } = useToken(launch?.tokenId);
  const {
    blockHeight,
    loading: heightLoading,
    error: heightError,
  } = useBlockHeight();

  return {
    launch: mapLaunch(launch, blockHeight, token),
    blockHeight,
    loading: launchLoading || tokenLoading || heightLoading,
    error: launchError || tokenError || heightError || undefined,
  };
}

import { Launch as DbLaunch, Token as DbToken } from "shared/web3/db";
import {
  OnchainLaunch,
  OnchainToken,
  fieldToText,
  getLaunchById,
  useBlockHeight,
} from "shared/web3";
import BigNumber from "bignumber.js";
import {
  useLaunch as useOnchainLaunch,
  useToken as useOnchainToken,
} from "shared/web3";

import { Launch } from "../model";
import { Token, mapToken } from "entities/token/model";

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
  }: OnchainLaunch,
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
  dbLaunch?: OnchainLaunch,
  blockHeight?: number,
  token?: OnchainToken | null
): Launch | undefined {
  if (!dbLaunch || !blockHeight) {
    return undefined;
  }
  return {
    id: dbLaunch.id.toFixed(),
    adminAddress: dbLaunch.adminAddress,
    sellStartBlock: dbLaunch.sellStartBlock,
    sellBlockDuration: dbLaunch.sellBlockDuration,
    claimStartBlock: dbLaunch.claimStartBlock,
    claimBlockDuration: dbLaunch.claimBlockDuration,
    numerator: dbLaunch.numerator,
    denominator: dbLaunch.denominator,
    privacy: mapPrivacy(dbLaunch.flags),
    cap: dbLaunch.flags.isCapEnabled,
    token: mapToken(token),
    stage: mapStage(dbLaunch, blockHeight),
  };
}

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

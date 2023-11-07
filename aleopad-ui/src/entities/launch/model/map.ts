import { OnchainToken, ParsedLaunch, getLaunchById } from "shared/web3";
import { Launch } from "./types";
import { mapToken } from "entities/token/model";

export function mapPrivacy(
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

export function mapStage(
  {
    sellBlockDuration,
    sellStartBlock,
    claimStartBlock,
    claimBlockDuration,
  }: ParsedLaunch,
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

export function mapLaunch(
  dbLaunch?: ParsedLaunch,
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

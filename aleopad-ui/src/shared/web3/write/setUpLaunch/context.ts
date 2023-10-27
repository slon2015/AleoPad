import BigNumber from "bignumber.js";
import {
  Scalar,
  normalizeField,
  normalizeU32,
  normalizeU8,
  textToField,
  divideToDecimals,
} from "../../common";
import { ConnectedWalletContextState } from "../../types";
import { CREATE_LAUNCH_FEE_AMOUNT } from "./constants";
import { newId, randomBytes } from "./id";
import { ratioToNumeratorDenominator } from "./ratio";
import {
  NewLaunch,
  PublicLaunchParams,
  PublicTokenParams,
  SetUpContext,
} from "./types";

function convertToPublicLaunchParams(
  launch: NewLaunch,
  publicKey: string
): PublicLaunchParams {
  const { numerator, denominator } = ratioToNumeratorDenominator(launch.ratio);

  return {
    launch_id: newId(),
    sell_start_block_height: normalizeU32(launch.sellBlockStart),
    sell_duration_in_blocks: normalizeU32(launch.sellDurationInBlocks),
    claim_start_block_height: normalizeU32(launch.claimBlockStart),
    claim_duration_in_blocks: normalizeU32(launch.claimDurationInBlocks || 0),
    is_cap_enabled: launch.flags.isCapEnabled,
    is_private_sells_enabled: launch.flags.isPrivateSellsEnabled,
    is_public_sells_enabled: launch.flags.isPublicSellsEnabled,
    launch_admin: publicKey,
    credits_ratio_numerator: numerator,
    credits_ratio_denominator: denominator,
  };
}

function convertToPublicTokenParams(launch: NewLaunch): PublicTokenParams {
  return {
    token_id: newId(),
    name: normalizeField(textToField(launch.token.name)),
    symbol: normalizeField(textToField(launch.token.symbol)),
    decimals: normalizeU8(launch.token.decimals),
  };
}

function generateCapRandomScalar(
  isCapEnebled: NewLaunch["flags"]["isCapEnabled"]
): Scalar {
  if (!isCapEnebled) {
    return new Scalar(0);
  }

  return new Scalar(randomBytes(16));
}

export function createContext(
  wallet: ConnectedWalletContextState,
  launch: NewLaunch
): SetUpContext {
  return {
    publicLaunchParams: convertToPublicLaunchParams(launch, wallet.publicKey),
    publicTokenParams: convertToPublicTokenParams(launch),
    adminAddress: wallet.publicKey,
    randomCapScalar: generateCapRandomScalar(launch.flags.isCapEnabled),
    requiredCredits: BigNumber(CREATE_LAUNCH_FEE_AMOUNT),
  };
}

export function checkContext(
  context: SetUpContext,
  publicAmount: BigNumber
): SetUpContext {
  if (publicAmount.isLessThan(context.requiredCredits)) {
    throw new Error(
      `Public credits amount lower than ${divideToDecimals(
        context.requiredCredits,
        6
      )}`
    );
  }

  return context;
}

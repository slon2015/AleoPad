import BigNumber from "bignumber.js";
import { Scalar, context } from "../../common";

export interface NewLaunch {
  token: {
    name: string;
    symbol: string;
    decimals: number;
  };
  sellBlockStart: number;
  sellDurationInBlocks: number;
  claimBlockStart: number;
  claimDurationInBlocks: false | number;
  ratio: BigNumber;
  flags: {
    isCapEnabled: boolean;
    isPublicSellsEnabled: boolean;
    isPrivateSellsEnabled: boolean;
  };
}

export interface PublicLaunchParams {
  launch_id: string;
  launch_admin: string;
  sell_start_block_height: string;
  sell_duration_in_blocks: string;
  claim_start_block_height: string;
  claim_duration_in_blocks: string;
  credits_ratio_numerator: string;
  credits_ratio_denominator: string;
  is_private_sells_enabled: boolean;
  is_public_sells_enabled: boolean;
  is_cap_enabled: boolean;
}

export interface PublicTokenParams {
  token_id: string;
  name: string;
  symbol: string;
  decimals: string;
}

export type SetUpContext = {
  publicLaunchParams: PublicLaunchParams;
  publicTokenParams: PublicTokenParams;
  adminAddress: string;
  randomCapScalar: Scalar;
} & context.Common;

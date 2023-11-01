import { Field, U128 } from "../common";

export interface ParsedLaunch {
  id: Field;
  numerator: U128;
  denominator: U128;
  sellStartBlock: number;
  sellBlockDuration: number;
  claimStartBlock: number;
  claimBlockDuration: number;
  adminAddress: string;
  flags: {
    isPrivateSellsEnabled: boolean;
    isPublicSellsEnabled: boolean;
    isCapEnabled: boolean;
  };
  tokenId?: Field;
}

export interface OnchainLaunch {
  sell_start_block_height: number;
  sell_duration_in_blocks: number;

  claim_start_block_height: number;
  claim_duration_in_blocks: number;

  credits_ratio_numerator: U128;
  credits_ratio_denominator: U128;

  admin: string;

  is_private_sells_enabled: boolean;
  is_public_sells_enabled: boolean;

  is_cap_enabled: boolean;
}

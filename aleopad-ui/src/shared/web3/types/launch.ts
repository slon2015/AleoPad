import { Field, U128 } from "../common";

export interface Launch {
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

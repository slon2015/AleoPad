import Repository from "../repository";

export interface Launch {
  id: string;
  numerator: string;
  denominator: string;
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
  tokenId?: string;
}

export const launches = new Repository<Launch>("launches");

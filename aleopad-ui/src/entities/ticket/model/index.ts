import BigNumber from "bignumber.js";

export type Ticket = {
  launchId: string;
  amount: BigNumber.Value;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimals: number;
  isClaimable: boolean;
};

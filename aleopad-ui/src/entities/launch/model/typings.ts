import BigNumber from "bignumber.js";
import { Launch as DbLaunch, Token } from "shared/web3";

export type Launch = Omit<
  DbLaunch,
  "flags" | "numerator" | "denominator" | "tokenId"
> & {
  privacy: "private" | "public" | "mixed";
  cap: boolean;
  numerator: BigNumber.Value;
  denominator: BigNumber.Value;
  token?: Token;
  stage: "pending" | "sales" | "await TGE" | "claims" | "finished";
};

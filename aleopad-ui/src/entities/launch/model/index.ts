import { Launch as DbLaunch, Token } from "shared/web3";

export type Launch = Omit<
  DbLaunch,
  "flags" | "numerator" | "denominator" | "tokenId"
> & {
  privacy: "private" | "public" | "mixed";
  cap: boolean;
  ratio: string;
  token?: Token;
  stage: "pending" | "sales" | "await TGE" | "claims" | "finished";
};

import BigNumber from "bignumber.js";

export type Type<D extends object, T extends string> = Omit<D, "type"> & {
  type: T;
};

export type Common = {
  requiredCredits: BigNumber;
};

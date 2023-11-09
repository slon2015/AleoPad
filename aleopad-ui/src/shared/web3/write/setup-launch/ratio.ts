import BigNumber from "bignumber.js";
import { normalizeU128 } from "shared/web3/common";

export function ratioToNumeratorDenominator(ratio: BigNumber): {
  numerator: string;
  denominator: string;
} {
  if (ratio.isLessThan(1)) {
    return {
      numerator: normalizeU128(BigNumber(1).dividedBy(ratio)),
      denominator: normalizeU128("1"),
    };
  } else {
    return {
      numerator: normalizeU128("1"),
      denominator: normalizeU128(ratio),
    };
  }
}

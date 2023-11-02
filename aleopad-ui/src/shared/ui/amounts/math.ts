import BigNumber from "bignumber.js";

export function applyBothDecimals(
  ratio: BigNumber.Value,
  decimalsRight: number,
  decimalsLeft: number
): BigNumber {
  if (decimalsRight != decimalsLeft) {
    return BigNumber(ratio).dividedBy(
      BigNumber(10).pow(Math.abs(decimalsRight - decimalsLeft))
    );
  }

  return BigNumber(ratio);
}

export function invertRatio(ratio: BigNumber.Value): [BigNumber, BigNumber] {
  return [BigNumber(1).dividedBy(ratio), BigNumber(1)];
}

export function toRatio(
  numerator: BigNumber.Value,
  denominator: BigNumber.Value
): BigNumber {
  return BigNumber(numerator).div(denominator);
}

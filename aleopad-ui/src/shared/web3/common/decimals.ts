import BigNumber from "bignumber.js";

export function multipleToDecimals(
  value: BigNumber.Value,
  decimals: number
): BigNumber {
  return BigNumber(value).multipliedBy(BigNumber(10).pow(decimals));
}

export function divideToDecimals(
  value: BigNumber.Value,
  decimals: number
): BigNumber {
  return BigNumber(value).dividedBy(BigNumber(10).pow(decimals));
}

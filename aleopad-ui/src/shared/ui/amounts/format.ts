import BigNumber from "bignumber.js";

const milestones = [
  { value: 1_000_000, symbol: "M" },
  { value: 1000, symbol: "K" },
];

export function formatNumber(
  value: BigNumber.Value,
  decimalPlaces?: number
): string {
  for (let index = 0; index < milestones.length; index++) {
    const milestone = milestones[index];
    if (BigNumber(value).isGreaterThanOrEqualTo(milestone.value)) {
      if (!decimalPlaces && decimalPlaces !== 0) {
        return (
          BigNumber(value).div(milestone.value).toFixed() + milestone.symbol
        );
      } else {
        return (
          BigNumber(value).div(milestone.value).toFixed(decimalPlaces) +
          milestone.symbol
        );
      }
    }
  }

  if (!decimalPlaces && decimalPlaces !== 0) {
    return BigNumber(value).toFixed();
  } else {
    return BigNumber(value).toFixed(decimalPlaces);
  }
}

import BigNumber from "bignumber.js";
import { useMemo } from "react";
import { applyBothDecimals, invertRatio, toRatio } from "./math";
import { Typography } from "antd";
import { formatNumber } from "./format";

interface RaioProps {
  rightSymbol: string;
  rightDecimals: number;
  leftSymbol: string;
  leftDecimals: number;
  notInvertAmounts?: boolean;
  creditsAmount?: BigNumber.Value;
  creditsDecimalPlaces?: number;
  ratioData:
    | {
        value: BigNumber.Value;
      }
    | {
        numerator: BigNumber.Value;
        denominator: BigNumber.Value;
      };
}

const LOWER_THRESHOLD = 0.0001;

export default function Ratio({
  ratioData,
  leftSymbol,
  leftDecimals,
  rightSymbol,
  rightDecimals,
  notInvertAmounts,
  creditsAmount = 1,
  creditsDecimalPlaces = 0,
}: RaioProps) {
  const ratio = useMemo(() => {
    if ("value" in ratioData) {
      return applyBothDecimals(
        BigNumber(1).dividedBy(ratioData.value),
        rightDecimals,
        leftDecimals
      );
    } else {
      return applyBothDecimals(
        toRatio(ratioData.numerator, ratioData.denominator),
        rightDecimals,
        leftDecimals
      );
    }
  }, [ratioData, rightDecimals, leftDecimals]);

  const [rightAmount, leftAmount] = useMemo(() => {
    if (!notInvertAmounts && ratio.isLessThanOrEqualTo(LOWER_THRESHOLD)) {
      return invertRatio(ratio);
    } else {
      return [BigNumber(1), BigNumber(ratio)];
    }
  }, [ratio, notInvertAmounts]);

  return (
    <Typography.Text>
      {formatNumber(
        rightAmount.multipliedBy(creditsAmount),
        creditsDecimalPlaces
      )}{" "}
      {rightSymbol.toUpperCase()} ={" "}
      {formatNumber(leftAmount.multipliedBy(creditsAmount))}{" "}
      {leftSymbol.toUpperCase()}
    </Typography.Text>
  );
}

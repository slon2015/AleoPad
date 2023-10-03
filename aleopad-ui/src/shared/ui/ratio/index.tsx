import BigNumber from "bignumber.js";
import { useMemo } from "react";
import { applyDecimals, invertRatio, toRatio } from "./math";
import { Typography } from "antd";
import { formatNumber } from "./format";

interface RaioProps {
  rightSymbol: string;
  rightDecimals: number;
  leftSymbol: string;
  leftDecimals: number;
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
}: RaioProps) {
  const ratio = useMemo(() => {
    if ("value" in ratioData) {
      return applyDecimals(ratioData.value, rightDecimals, leftDecimals);
    } else {
      return applyDecimals(
        toRatio(ratioData.numerator, ratioData.denominator),
        rightDecimals,
        leftDecimals
      );
    }
  }, [ratioData, rightDecimals, leftDecimals]);

  const [rightAmount, leftAmount] = useMemo(() => {
    if (ratio.isLessThanOrEqualTo(LOWER_THRESHOLD)) {
      return invertRatio(ratio);
    } else {
      return [BigNumber(1), BigNumber(ratio)];
    }
  }, [ratio]);

  return (
    <Typography.Text>
      {formatNumber(rightAmount, 0)} {rightSymbol.toUpperCase()} ={" "}
      {formatNumber(leftAmount)} {leftSymbol.toUpperCase()}
    </Typography.Text>
  );
}

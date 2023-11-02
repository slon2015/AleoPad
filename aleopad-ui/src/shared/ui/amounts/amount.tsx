import { Typography } from "antd";
import BigNumber from "bignumber.js";
import { U128, divideToDecimals } from "shared/web3";
import { formatNumber } from "./format";
import { useMemo } from "react";

interface AmountProps {
  amount:
    | BigNumber.Value
    | {
        amount: BigNumber.Value;
        numerator: U128;
        denominator: U128;
      };
  decimals: number;
  symbol: string;
}

function calculateAmount(input: AmountProps["amount"]): BigNumber {
  if (typeof input === "object" && "numerator" in input) {
    return BigNumber(input.amount)
      .multipliedBy(input.numerator)
      .dividedBy(input.denominator);
  }
  return BigNumber(input);
}

export function Amount({ amount, decimals, symbol }: AmountProps) {
  const calculatedAmount = useMemo(() => calculateAmount(amount), [amount]);
  return (
    <Typography.Text>
      {formatNumber(divideToDecimals(calculatedAmount, decimals))} {symbol}
    </Typography.Text>
  );
}

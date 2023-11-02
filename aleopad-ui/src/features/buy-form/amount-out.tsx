import { Typography } from "antd";
import { Amount } from "shared/ui";
import { U128, U64 } from "shared/web3";

interface AmountOutProps {
  decimals: number;
  symbol: string;
  numerator: U128;
  denominator: U128;
  creditsAmount: U64;
}

export function AmountOut({
  decimals,
  symbol,
  numerator,
  denominator,
  creditsAmount,
}: AmountOutProps) {
  return (
    <Typography.Text>
      You will receive{" ~ "}
      <Amount
        amount={{
          amount: creditsAmount,
          numerator,
          denominator,
        }}
        decimals={decimals}
        symbol={symbol}
      />
    </Typography.Text>
  );
}

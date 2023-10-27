import { Button, Form, InputNumber, Row, Typography } from "antd";
import { useMemo } from "react";
import { U64, multipleToDecimals, divideToDecimals } from "shared/web3";

interface BuyPublicFormProps {
  publicBalance: U64;
  showTitle: boolean;
  setAmount(microcredits: U64): void;
  enabled: boolean;
  blocker?: string;
  buy: () => void;
  amount: U64;
}

export function BuyPublicForm({
  publicBalance,
  setAmount,
  showTitle,
  enabled,
  blocker,
  buy,
  amount,
}: BuyPublicFormProps) {
  const isBuyEnabled = useMemo(
    () => amount.gt(0) && amount.lte(publicBalance) && enabled && !blocker,
    [amount, publicBalance, enabled, blocker]
  );

  function onValueChange(value: number | null) {
    setAmount(new U64(multipleToDecimals(value || 0, 6)));
  }

  function onMaxClick() {
    setAmount(publicBalance);
  }

  function onBuyClick() {
    if (isBuyEnabled) {
      buy();
    }
  }

  return (
    <Form title={showTitle ? "Buy public" : undefined} layout="vertical">
      <Form.Item
        label={`Credits amount (available ${divideToDecimals(
          publicBalance,
          6
        ).toFixed()})`}
      >
        <InputNumber
          min={0}
          value={divideToDecimals(amount, 6).toNumber()}
          onChange={onValueChange}
          addonAfter={<Button onClick={onMaxClick}>Max</Button>}
        />
      </Form.Item>
      <Form.Item>
        <Row justify="center">
          <Button type="primary" disabled={!isBuyEnabled} onClick={onBuyClick}>
            Buy
          </Button>
        </Row>
        {blocker && (
          <Row>
            <Typography.Text type="danger">{blocker}</Typography.Text>
          </Row>
        )}
      </Form.Item>
    </Form>
  );
}

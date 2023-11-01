import { Button, Form, InputNumber, Row, Typography } from "antd";
import { useMemo } from "react";
import {
  U64,
  multipleToDecimals,
  divideToDecimals,
  CreditsRecord,
} from "shared/web3";
import { CreditRecordsList } from "./credit-records-list";

interface BuyPrivateFormProps {
  records: Array<CreditsRecord>;
  showTitle: boolean;
  buy(): void;
  selectRecord(record: CreditsRecord): void;
  selectedRecord: CreditsRecord | undefined;
  amount: U64;
  setAmount(amount: U64): void;
  enabled: boolean;
  blocker?: string;
}

export function BuyPrivateForm({
  records,
  buy,
  selectRecord,
  selectedRecord,
  amount,
  setAmount,
  enabled,
  blocker,
  showTitle,
}: BuyPrivateFormProps) {
  const maximumAmount = useMemo(
    () => U64.maximum(...records.map((r) => r.amount), 0),
    [records]
  );

  const isBuyEnabled = useMemo(
    () =>
      amount.gt(0) &&
      amount.lte(maximumAmount) &&
      selectedRecord &&
      enabled &&
      !blocker,
    [amount, maximumAmount, enabled, blocker, selectedRecord]
  );

  function onValueChange(value: number | null) {
    setAmount(new U64(multipleToDecimals(value || 0, 6)));
  }

  function onMaxClick() {
    setAmount(maximumAmount);
  }

  function onBuyClick() {
    if (isBuyEnabled) {
      buy();
    }
  }

  return (
    <Form title={showTitle ? "Buy private" : undefined} layout="vertical">
      <Form.Item
        label={`Credits amount (available ${divideToDecimals(
          maximumAmount,
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
        <CreditRecordsList
          records={records}
          selectedRecord={selectedRecord}
          onRecordClick={selectRecord}
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

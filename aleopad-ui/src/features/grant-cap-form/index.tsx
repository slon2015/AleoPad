import { Button, Form, Input, InputNumber, Row, Skeleton } from "antd";
import { ChangeEventHandler, useCallback, useState } from "react";
import {
  OnchainAleopadLaunchAdministartionRecord,
  U128,
  divideToDecimals,
  multipleToDecimals,
  useGrantCapForLaunch,
} from "shared/web3";

interface GrantCapFormProps {
  administration: OnchainAleopadLaunchAdministartionRecord;
  tokenDecimals: number;
}

const ADDRESS_VALIDATION_MESSAGES: Record<string, string> = {
  invalidPrefix: `Address should start with 'aleo1'`,
};

export function GrantCapForm({
  administration,
  tokenDecimals,
}: GrantCapFormProps) {
  const [addressValidationError, setAddressValidationError] = useState<
    string | null
  >(null);
  const grantCap = useGrantCapForLaunch(administration);

  if (grantCap.loading) {
    return <Skeleton />;
  }

  const onCapAmountChange = (e: number | null) => {
    const newValue = e || 0;
    grantCap.setAmount(new U128(multipleToDecimals(newValue, tokenDecimals)));
  };

  const onGranteeAddressChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value.startsWith("aleo1")) {
      setAddressValidationError("invalidPrefix");
    } else {
      setAddressValidationError(null);
    }
    grantCap.setGrantee(e.target.value || "");
  };

  const onGrantClick = () => {
    grantCap.mutation.mutate();
  };

  return (
    <Form labelCol={{ span: 7 }}>
      <Form.Item
        label="Grantee"
        validateStatus={Boolean(addressValidationError) ? "error" : undefined}
        help={
          addressValidationError &&
          ADDRESS_VALIDATION_MESSAGES[addressValidationError]
        }
      >
        <Input
          value={grantCap.grantee || ""}
          onChange={onGranteeAddressChange}
        />
      </Form.Item>
      <Form.Item label="Amount">
        <InputNumber
          value={divideToDecimals(grantCap.amount, tokenDecimals).toNumber()}
          onChange={onCapAmountChange}
          min={0}
        />
      </Form.Item>
      <Form.Item help={grantCap.blocker}>
        <Row justify="center">
          <Button type="primary" onClick={onGrantClick}>
            Grant
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
}

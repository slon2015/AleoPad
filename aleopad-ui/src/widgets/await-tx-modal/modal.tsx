import { Modal, Typography } from "antd";

type AwaitTransactionModalProps = Partial<{
  txTitle: string;
  txDescription: string;
  txStatus: string;
}>;

export function AwaitTransactionModal({
  txStatus,
  txTitle,
  txDescription,
}: AwaitTransactionModalProps) {
  return (
    <Modal
      closable={false}
      title={txTitle || "Await transaction"}
      open={Boolean(txStatus)}
      footer={null}
      centered
    >
      {txDescription && <Typography.Text>{txDescription}</Typography.Text>}
      <Typography.Text>Transaction status: {txStatus}</Typography.Text>
    </Modal>
  );
}

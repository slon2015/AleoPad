import { Card, Modal, Row, Typography } from "antd";
import { useCallback } from "react";
import { Link } from "react-router-dom";

type AwaitTransactionModalProps = Partial<{
  txTitle: string;
  txDescription: string;
  txStatus: string;
  txId: string;
  onSuccess: () => React.ReactNode;
  onClose: () => void;
  isFinished: boolean;
}>;

export function AwaitTransactionModal({
  txStatus,
  txTitle,
  txDescription,
  txId,
  onSuccess,
  onClose,
  isFinished,
}: AwaitTransactionModalProps) {
  const isTxSuccesfull = txStatus === "Completed";

  const onCancel = useCallback(() => {
    if (isFinished && onClose) {
      onClose();
    }
  }, [isFinished, onClose]);

  return (
    <Modal
      closable={isFinished}
      title={txTitle || "Await transaction"}
      open={Boolean(txStatus)}
      footer={null}
      centered
      onCancel={onCancel}
    >
      <Row>
        {txDescription && <Typography.Text>{txDescription}</Typography.Text>}
      </Row>
      <Row>
        <Typography.Text>Transaction status: {txStatus}</Typography.Text>
      </Row>
      <Row>
        {isTxSuccesfull && (
          <Link
            to={`${process.env.REACT_APP_EXPLORER_URL!}transaction?id=${txId}`}
            target="_blank"
          >
            See your transaction
          </Link>
        )}
      </Row>
      {onSuccess && isTxSuccesfull && (
        <Row>
          <Card>{onSuccess()}</Card>
        </Row>
      )}
    </Modal>
  );
}

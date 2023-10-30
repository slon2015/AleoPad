import React from "react";
import BigNumber from "bignumber.js";
import { Modal, Row } from "antd";
import BuyForm from "features/buy-form";

interface BuyModalProps {
  launch?: {
    id: string;
    numerator: BigNumber.Value;
    denominator: BigNumber.Value;
    privacy: "private" | "public" | "mixed";
    token?: {
      id: string;
      name: string;
      symbol: string;
      decimals: number;
    };
  };
  onModalClose(): void;
}

export function BuyModal({ launch, onModalClose }: BuyModalProps) {
  const isModalOpen = Boolean(launch);

  return (
    <Modal
      open={isModalOpen}
      onCancel={onModalClose}
      title={launch?.token?.name || "Buy Launch ticket"}
      footer={null}
    >
      {launch && (
        <Row justify="center">
          <BuyForm launchId={launch.id} privacy={launch!.privacy} />
        </Row>
      )}
    </Modal>
  );
}

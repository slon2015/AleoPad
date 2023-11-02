import React from "react";
import { Modal, Row } from "antd";
import BuyForm from "features/buy-form";
import { ParsedLaunch } from "shared/web3";
import { mapPrivacy } from "entities/launch";

interface BuyModalProps {
  launch: ParsedLaunch;
  onModalClose(): void;
}

export function BuyModal({ launch, onModalClose }: BuyModalProps) {
  const isModalOpen = Boolean(launch);
  const privacy = mapPrivacy(launch.flags);

  return (
    <Modal
      open={isModalOpen}
      onCancel={onModalClose}
      title="Buy Launch ticket"
      footer={null}
    >
      {launch && (
        <Row justify="center">
          <BuyForm launchId={launch.id} privacy={privacy} />
        </Row>
      )}
    </Modal>
  );
}

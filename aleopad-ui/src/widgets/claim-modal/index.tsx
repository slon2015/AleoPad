import React from "react";
import { Modal, Row } from "antd";
import { TicketRecord } from "shared/web3";
import { ClaimSelectedTicketForm } from "features/claim-form";

interface ClaimModalProps {
  ticket: TicketRecord;
  tokenId: string;
  onModalClose(): void;
}

export function ClaimModal({ ticket, tokenId, onModalClose }: ClaimModalProps) {
  const isModalOpen = Boolean(ticket);

  return (
    <Modal
      open={isModalOpen}
      onCancel={onModalClose}
      title="Claim Launch ticket"
      footer={null}
    >
      <Row justify="center">
        <ClaimSelectedTicketForm ticket={ticket} tokenId={tokenId} />
      </Row>
    </Modal>
  );
}

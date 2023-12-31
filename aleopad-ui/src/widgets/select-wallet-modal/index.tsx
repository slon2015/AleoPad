import React from "react";
import { Avatar, Button, List, Modal, Row, Space, Typography } from "antd";
import { NonConnectedWalletContextState } from "shared/web3";
import { Wallet } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletReadyState } from "@demox-labs/aleo-wallet-adapter-base";

type SelectWalletModalProps = Pick<
  NonConnectedWalletContextState,
  "wallets" | "select"
> & {
  onModalClose(): void;
  isModalOpen: boolean;
};

export function SelectWalletModal({
  wallets,
  select,
  isModalOpen,
  onModalClose,
}: SelectWalletModalProps) {
  function onWalletItemClick(wallet: Wallet) {
    select(wallet.adapter.name);
  }

  function renderItem(wallet: Wallet) {
    return (
      <List.Item
        actions={
          wallet.readyState === WalletReadyState.NotDetected
            ? [
                <Button type="link" href={wallet.adapter.url}>
                  Install
                </Button>,
              ]
            : [
                <Button
                  onClick={() => onWalletItemClick(wallet)}
                  type="primary"
                  disabled={wallet.readyState === WalletReadyState.Unsupported}
                >
                  Select
                </Button>,
              ]
        }
      >
        <Row>
          <Space>
            <Avatar src={wallet.adapter.icon} size={32} shape="square" />
            <Typography.Text>{wallet.adapter.name}</Typography.Text>
          </Space>
        </Row>
      </List.Item>
    );
  }

  return (
    <Modal
      open={isModalOpen}
      onCancel={onModalClose}
      title="Select wallet"
      footer={null}
    >
      <List dataSource={wallets} renderItem={renderItem} bordered />
    </Modal>
  );
}

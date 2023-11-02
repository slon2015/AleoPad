import { Button } from "antd";
import { useCallback, useState } from "react";
import { NonConnectedWalletContextState } from "shared/web3";
import { SelectWalletModal } from "widgets/select-wallet-modal";

type NonConnectedConnectButtonProps = Pick<
  NonConnectedWalletContextState,
  "connect" | "connecting" | "select" | "wallets"
>;

export function NonConnectedConnectButton({
  connect,
  connecting,
  select,
  wallets,
}: NonConnectedConnectButtonProps) {
  const [isModalOpened, setModalOpened] = useState(false);

  const onConnectClick = useCallback(() => {
    setModalOpened(true);
    // connect(DecryptPermission.UponRequest, WalletAdapterNetwork.Testnet);
  }, [setModalOpened]);

  return (
    <>
      <Button type="primary" disabled={connecting} onClick={onConnectClick}>
        Connect
      </Button>
      <SelectWalletModal
        wallets={wallets}
        select={select}
        isModalOpen={isModalOpened}
        onModalClose={() => setModalOpened(false)}
      />
    </>
  );
}

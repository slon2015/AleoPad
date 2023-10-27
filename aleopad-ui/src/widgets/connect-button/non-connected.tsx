import { Button } from "antd";
import { useCallback } from "react";
import { NonConnectedWalletContextState } from "shared/web3";

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
  const onConnectClick = useCallback(() => {
    select(wallets[0].adapter.name);
    // connect(DecryptPermission.UponRequest, WalletAdapterNetwork.Testnet);
  }, [select, wallets]);

  return (
    <Button type="primary" disabled={connecting} onClick={onConnectClick}>
      Connect
    </Button>
  );
}

import { Button, Popconfirm } from "antd";
import { useCallback, useMemo } from "react";
import { ConnectedWalletContextState } from "shared/web3";

type ConnectedConnectButtonProps = Pick<
  ConnectedWalletContextState,
  "publicKey" | "disconnect" | "disconnecting"
>;

export function ConnectedConnectButton({
  publicKey,
  disconnect,
  disconnecting,
}: ConnectedConnectButtonProps) {
  const croppedAddress = useMemo(
    () =>
      publicKey.substring(0, 8) +
      "..." +
      publicKey.substring(publicKey.length - 4),
    [publicKey]
  );

  const onDisconnectClick = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <Popconfirm
      title="disconnect"
      okText="ok"
      onConfirm={onDisconnectClick}
      showCancel={false}
    >
      <Button type="primary" disabled={disconnecting}>
        {croppedAddress}
      </Button>
    </Popconfirm>
  );
}

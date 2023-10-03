import { useWallet } from "shared/web3";
import { ConnectedConnectButton } from "./connected";
import { NonConnectedConnectButton } from "./non-connected";

export default function ConnectButton() {
  const state = useWallet();

  if (state.connected) {
    return (
      <ConnectedConnectButton
        disconnect={state.disconnect}
        disconnecting={state.disconnecting}
        publicKey={state.publicKey}
      />
    );
  } else {
    return (
      <NonConnectedConnectButton
        connect={state.connect}
        connecting={state.connecting}
        select={state.select}
        wallets={state.wallets}
      />
    );
  }
}

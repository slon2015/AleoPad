import { useWallet as useLeoWallet } from "@demox-labs/aleo-wallet-adapter-react";
import {
  ConnectedWalletContextState,
  NonConnectedWalletContextState,
  WalletContextState,
} from "../types";

export const useWallet = (): WalletContextState => {
  const state = useLeoWallet();

  if (state.connected) {
    const conectedState: ConnectedWalletContextState = {
      connected: true,
      disconnect: state.disconnect,
      disconnecting: state.disconnecting,
      publicKey: state.publicKey!!,
      requestExecution: state.requestExecution,
      requestRecords: state.requestRecords,
      requestTransaction: state.requestTransaction,
      transactionStatus: state.transactionStatus,
    };

    return conectedState;
  } else {
    const nonConnectedState: NonConnectedWalletContextState = {
      connected: false,
      connect: state.connect,
      connecting: state.connecting,
      wallets: state.wallets,
      select: state.select,
    };

    return nonConnectedState;
  }
};

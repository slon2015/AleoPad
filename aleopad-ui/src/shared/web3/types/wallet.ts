import { WalletContextState as AdapterWalletContextState } from "@demox-labs/aleo-wallet-adapter-react";

export type ConnectedWalletContextState = Required<
  Pick<
    AdapterWalletContextState,
    | "requestRecords"
    | "requestExecution"
    | "requestTransaction"
    | "transactionStatus"
    | "disconnect"
    | "disconnecting"
  > & {
    connected: true;
    publicKey: string;
  }
>;

export type NonConnectedWalletContextState = Pick<
  AdapterWalletContextState,
  "connect" | "connecting" | "wallets" | "select"
> & {
  connected: false;
};

export type WalletContextState =
  | ConnectedWalletContextState
  | NonConnectedWalletContextState;

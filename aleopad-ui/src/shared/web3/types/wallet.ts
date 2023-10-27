import { WalletContextState as AdapterWalletContextState } from "@demox-labs/aleo-wallet-adapter-react";

type NotUndefined<T> = { [k in keyof T]-?: Exclude<T[k], undefined> };

export type ConnectedWalletContextState = NotUndefined<
  Pick<
    AdapterWalletContextState,
    | "requestRecords"
    | "requestExecution"
    | "requestTransaction"
    | "transactionStatus"
    | "disconnect"
    | "disconnecting"
    | "wallet"
  >
> & {
  connected: true;
  publicKey: string;
};

export type NonConnectedWalletContextState = Pick<
  AdapterWalletContextState,
  "connect" | "connecting" | "wallets" | "select"
> & {
  connected: false;
};

export type WalletContextState =
  | ConnectedWalletContextState
  | NonConnectedWalletContextState;

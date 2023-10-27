import { SetUpContext } from "./types";
import { ConnectedWalletContextState } from "../../types";
import { normalizeScalar } from "../../common";

import {
  Transaction,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";

export function buildTransaction(
  wallet: ConnectedWalletContextState["publicKey"],
  context: SetUpContext
): Transaction {
  return Transaction.createTransaction(
    wallet,
    WalletAdapterNetwork.Testnet,
    process.env.REACT_APP_MANAGEMET_PROGRAMM_ID!,
    "set_up_new_regular_token",
    [
      context.publicLaunchParams,
      normalizeScalar(context.randomCapScalar),
      context.publicTokenParams,
      context.adminAddress,
    ],
    context.requiredCredits.toNumber()
  );
}

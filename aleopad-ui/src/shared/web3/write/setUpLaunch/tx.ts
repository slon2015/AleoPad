import { PublicLaunchParams, SetUpContext } from "./types";
import { ConnectedWalletContextState } from "../../types";
import { normalizeScalar, normalizeStruct } from "../../common";

import {
  Transaction,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import {
  PUBLIC_LAUNCH_PARAMS_PROPS_ORDER,
  PUBLIC_TOKEN_PARAMS_PROPS_ORDER,
} from "./constants";

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
      normalizeStruct(
        context.publicLaunchParams,
        PUBLIC_LAUNCH_PARAMS_PROPS_ORDER
      ),
      normalizeScalar(context.randomCapScalar),
      normalizeStruct(
        context.publicTokenParams,
        PUBLIC_TOKEN_PARAMS_PROPS_ORDER
      ),
      context.adminAddress,
    ],
    context.requiredCredits.toNumber()
  );
}

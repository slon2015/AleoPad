import {
  Transaction,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { GrantCapContext } from "./types";
import { normalizeU128 } from "../../common";

export function buildTransaction(
  context: GrantCapContext,
  publicKey: string
): Transaction {
  return Transaction.createTransaction(
    publicKey,
    WalletAdapterNetwork.Testnet,
    process.env.REACT_APP_CORE_PROGRAMM_ID!,
    "issue_cap_to_user",
    [context.record, context.grantee, normalizeU128(context.amount)],
    context.feeCredits.toNumber()
  );
}

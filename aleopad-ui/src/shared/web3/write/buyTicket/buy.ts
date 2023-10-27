import { ConnectedWalletContextState, OnchainLaunch } from "../../types";
import { NonValidatedContext } from "./types";
import { checkContext } from "./context";
import { buildTransaction } from "./tx";
import { awaitTx } from "../../common";

export async function buy(
  context: NonValidatedContext,
  wallet: ConnectedWalletContextState,
  launch: OnchainLaunch
): Promise<void> {
  const validated = checkContext(context);

  const transaction = buildTransaction(validated, wallet.publicKey, launch);

  const txId = await wallet.requestTransaction(transaction);

  return awaitTx(txId);
}

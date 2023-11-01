import { ConnectedWalletContextState } from "../../types";
import { awaitTx } from "../../common";
import { GrantCapContext } from "./types";
import { checkContext } from "./context";
import { buildTransaction } from "./tx";
import { CreditAmounts } from "../../wallet";

export async function grant(
  context: GrantCapContext,
  wallet: ConnectedWalletContextState,
  credits: CreditAmounts
): Promise<void> {
  const validated = checkContext(context, credits);

  const transaction = buildTransaction(validated, wallet.publicKey);

  const txId = await wallet.requestTransaction(transaction);

  return awaitTx(txId);
}

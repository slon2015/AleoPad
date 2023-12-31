import { ConnectedWalletContextState } from "../../types";
import { NonValidatedClaimContext } from "./types";
import { checkContext } from "./context";
import { buildTransaction } from "./tx";
import { CreditAmounts } from "../../wallet";

export async function claim(
  context: NonValidatedClaimContext,
  wallet: ConnectedWalletContextState,
  credits: CreditAmounts
): Promise<string> {
  const validated = checkContext(context, credits);

  const transaction = buildTransaction(validated, wallet.publicKey);

  const txId = await wallet.requestTransaction(transaction);

  return txId;
}

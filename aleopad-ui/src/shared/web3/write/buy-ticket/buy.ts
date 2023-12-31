import { ConnectedWalletContextState, ParsedLaunch } from "../../types";
import { NonValidatedContext } from "./types";
import { checkContext } from "./context";
import { buildTransaction } from "./tx";
import { CreditAmounts } from "../../wallet";

export async function buy(
  context: NonValidatedContext,
  wallet: ConnectedWalletContextState,
  launch: ParsedLaunch,
  amounts?: CreditAmounts["publicAmount"]
): Promise<string> {
  const validated = checkContext(context, amounts);

  const transaction = buildTransaction(validated, wallet.publicKey, launch);

  const txId = await wallet.requestTransaction(transaction);

  return txId;
}

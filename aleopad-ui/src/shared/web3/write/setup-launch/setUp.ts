import { ConnectedWalletContextState } from "../../types";
import { SetUpContext } from "./types";
import { checkContext } from "./context";
import { buildTransaction } from "./tx";
import BigNumber from "bignumber.js";

export async function setUp(
  context: SetUpContext,
  wallet: ConnectedWalletContextState,
  publicAmount: BigNumber
): Promise<string> {
  const validated = checkContext(context, publicAmount);

  const transaction = buildTransaction(wallet.publicKey, validated);

  const txId = await wallet.requestTransaction(transaction);

  return txId;
}

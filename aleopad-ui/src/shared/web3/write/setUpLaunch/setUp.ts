import { ConnectedWalletContextState } from "../../types";
import { awaitTx } from "../../common";
import { SetUpContext } from "./types";
import { checkContext } from "./context";
import { buildTransaction } from "./tx";
import BigNumber from "bignumber.js";

export async function setUp(
  context: SetUpContext,
  wallet: ConnectedWalletContextState,
  publicAmount: BigNumber
): Promise<void> {
  const validated = checkContext(context, publicAmount);

  const transaction = buildTransaction(wallet.publicKey, validated);

  const txId = await wallet.requestTransaction(transaction);

  return awaitTx(txId);
}

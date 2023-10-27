import BigNumber from "bignumber.js";
import { checkContext } from "./context";
import { SetUpContext } from "./types";

export function check(
  context: SetUpContext,
  publicAmount: BigNumber
): string | undefined {
  try {
    checkContext(context, publicAmount);
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
    throw err;
  }
}

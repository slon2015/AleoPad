import { checkContext } from "./context";
import { NonValidatedClaimContext } from "./types";
import { CreditAmounts } from "../../wallet";

export function check(
  context: NonValidatedClaimContext,
  credits: CreditAmounts
): string | undefined {
  try {
    checkContext(context, credits);
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
    throw err;
  }
}

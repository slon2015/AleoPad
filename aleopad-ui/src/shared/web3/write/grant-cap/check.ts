import { checkContext } from "./context";
import { CreditAmounts } from "../../wallet";
import { GrantCapContext } from "./types";

export function check(
  context: GrantCapContext,
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

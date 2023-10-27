import BigNumber from "bignumber.js";
import { BuyPublicWithCapContext, BuyPublicWithoutCapContext } from "./types";
import { CapResult } from "../../wallet";
import { BUY_TICKET_FEE_AMOUNT } from "./constants";
import { U128 } from "shared/web3/common";

export function preparePublicContextWithoutCap(
  expectedAmount: U128,
  requiredCredits: BigNumber
): BuyPublicWithoutCapContext {
  return {
    type: "public-without-cap",
    requiredCredits: requiredCredits.plus(BUY_TICKET_FEE_AMOUNT),
    amount: expectedAmount,
  };
}

export function preparePublicContextWithCap(
  expectedAmount: U128,
  requiredCredits: BigNumber,
  cap?: CapResult
): BuyPublicWithCapContext {
  return {
    type: "public-with-cap",
    requiredCredits: requiredCredits.plus(BUY_TICKET_FEE_AMOUNT),
    capRecord: cap && cap.amountToBuy.isGreaterThan(0) ? cap : undefined,
    amount: expectedAmount,
  };
}

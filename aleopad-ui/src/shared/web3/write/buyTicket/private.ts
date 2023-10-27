import { BUY_TICKET_FEE_AMOUNT } from "./constants";
import BigNumber from "bignumber.js";
import { BuyPrivateWithCapContext, BuyPrivateWithoutCapContext } from "./types";
import { CapResult, CreditAmounts, CreditsRecord } from "../../wallet";
import { U128 } from "shared/web3/common";

export function findRecordWithAmount(
  this: CreditAmounts["privateRecords"],
  amount: U128 | number
): CreditsRecord | undefined {
  return this.find((r) => r.amount.isGreaterThanOrEqualTo(amount));
}

export function preparePrivateContextWithoutCap(
  paymentRecord: CreditsRecord,
  requiredCredits: BigNumber,
  records: CreditAmounts["privateRecords"],
  expectedAmount: BigNumber
): BuyPrivateWithoutCapContext {
  const feeRecord = findRecordWithAmount.call(
    records.filter((r) => r !== paymentRecord),
    BUY_TICKET_FEE_AMOUNT
  );

  return {
    type: "private-without-cap",
    requiredCredits,
    paymentRecord: paymentRecord.amount.gte(requiredCredits)
      ? paymentRecord
      : undefined,
    feeRecord,
    amount: expectedAmount,
  };
}

export function preparePrivateContextWithCap(
  paymentRecord: CreditsRecord,
  requiredCredits: BigNumber,
  records: CreditAmounts["privateRecords"],
  expectedAmount: BigNumber,
  cap?: CapResult
): BuyPrivateWithCapContext {
  const feeRecord = findRecordWithAmount.call(
    records.filter((r) => r !== paymentRecord),
    BUY_TICKET_FEE_AMOUNT
  );

  return {
    type: "private-with-cap",
    requiredCredits,
    paymentRecord: paymentRecord.amount.gte(requiredCredits)
      ? paymentRecord
      : undefined,
    feeRecord,
    capRecord: cap && cap.amountToBuy.isGreaterThan(0) ? cap : undefined,
    amount: expectedAmount,
  };
}

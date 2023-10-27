import BigNumber from "bignumber.js";

import { Field, U128 } from "../../common";
import { OnchainLaunch } from "../../types";
import { CreditAmounts, TicketRecord } from "../../wallet";

import {
  NonValidatedClaimContext,
  PrivateClaimContext,
  PublicClaimContext,
  ValidatedClaimContext,
} from "./types";
import { CLAIM_TICKET_FEE_AMOUNT } from "./constants";

export function createPublicContext(
  launch: OnchainLaunch,
  tokenId: Field,
  publicTicketAmount: U128
): PublicClaimContext {
  return {
    launchId: launch.id,
    publicTicketAmount,
    requiredCredits: BigNumber(CLAIM_TICKET_FEE_AMOUNT),
    tokenId,
    type: "public-claim",
  };
}

export function createPrivateContext(
  tokenId: Field,
  record: TicketRecord
): PrivateClaimContext {
  return {
    tokenId,
    ticket: record,
    requiredCredits: BigNumber(CLAIM_TICKET_FEE_AMOUNT),
    type: "private-claim",
    feeRecord: undefined,
  };
}

export function checkContext(
  context: NonValidatedClaimContext,
  credits: CreditAmounts
): ValidatedClaimContext {
  switch (context.type) {
    case "private-claim":
      const feeRecord = credits.privateRecords.find((r) =>
        r.amount.gte(CLAIM_TICKET_FEE_AMOUNT)
      );
      if (!feeRecord) {
        throw new Error("Record for fee payment not found");
      }
      if (context.ticket.amount.lte(0)) {
        throw new Error("Ticket is empty");
      }
      return { ...context, feeRecord } as ValidatedClaimContext;
    case "public-claim":
      if (context.requiredCredits.gt(credits.publicAmount)) {
        throw new Error("Public credits for fee payment not found");
      }
      if (context.publicTicketAmount.lte(0)) {
        throw new Error("Ticket is empty");
      }

      return context as ValidatedClaimContext;
  }
}

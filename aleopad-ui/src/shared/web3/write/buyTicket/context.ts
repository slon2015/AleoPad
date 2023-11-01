import {
  BuyPrivateContext,
  BuyPublicContext,
  NonValidatedContext,
  ValidatedContext,
} from "./types";
import { U128, U64, divideToDecimals } from "../../common";
import { ParsedLaunch } from "../../types";
import { CreditAmounts, CapResult, CreditsRecord } from "../../wallet";
import {
  preparePrivateContextWithCap,
  preparePrivateContextWithoutCap,
} from "./private";
import {
  preparePublicContextWithCap,
  preparePublicContextWithoutCap,
} from "./public";
import BigNumber from "bignumber.js";

function calculateAmountToBuy(
  numerator: U128,
  denominator: U128,
  credits: U64
): BigNumber {
  return numerator.multipliedBy(credits).dividedBy(denominator);
}

export function createPublicContext(
  launch: ParsedLaunch,
  credits: U64,
  cap?: CapResult
): BuyPublicContext {
  const amountToBuy = calculateAmountToBuy(
    launch.numerator,
    launch.denominator,
    credits
  );

  if (launch.flags.isCapEnabled) {
    return preparePublicContextWithCap(amountToBuy, credits, cap);
  }

  return preparePublicContextWithoutCap(amountToBuy, credits);
}

export function createPrivateContext(
  launch: ParsedLaunch,
  credits: U64,
  record: CreditsRecord,
  allRecords: CreditAmounts["privateRecords"],
  cap?: CapResult
): BuyPrivateContext {
  const amountToBuy = calculateAmountToBuy(
    launch.numerator,
    launch.denominator,
    credits
  );

  return launch.flags.isCapEnabled
    ? preparePrivateContextWithCap(
        record,
        credits,
        allRecords,
        amountToBuy,
        cap
      )
    : preparePrivateContextWithoutCap(record, credits, allRecords, amountToBuy);
}

export function checkContext(
  ctx: NonValidatedContext,
  publicAmount?: BigNumber
): ValidatedContext {
  if ("paymentRecord" in ctx) {
    if (!ctx.paymentRecord) {
      throw new Error(
        `Insufficient balance: ${divideToDecimals(
          ctx.requiredCredits,
          6
        )} credits record required`
      );
    }
    if (ctx.paymentRecord.amount.lt(ctx.requiredCredits)) {
      throw new Error(
        `Insufficient record amount: ${divideToDecimals(
          ctx.paymentRecord.amount,
          6
        )}, but ${divideToDecimals(
          ctx.requiredCredits,
          6
        )} credits record required`
      );
    }
  }

  if (
    (ctx.type === "public-with-cap" || ctx.type === "public-without-cap") &&
    (!publicAmount ||
      publicAmount.isLessThan(ctx.requiredCredits.plus(ctx.feeCreditsAmount)))
  ) {
    throw new Error(
      `Public credits amount lower than ${divideToDecimals(
        ctx.requiredCredits,
        6
      )}`
    );
  }

  if ("feeRecord" in ctx && !ctx.feeRecord) {
    throw new Error("At least 2 records required for private buy");
  }

  if ("capRecord" in ctx) {
    if (!ctx.capRecord) {
      throw new Error("Cap for launch not found");
    }
    if (ctx.capRecord.amountToBuy.lt(ctx.amount)) {
      throw new Error("Cap amount lower than expected amount");
    }
  }

  return ctx as ValidatedContext;
}

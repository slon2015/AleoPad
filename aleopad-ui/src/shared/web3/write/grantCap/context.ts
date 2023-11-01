import BigNumber from "bignumber.js";
import { GrantCapContext } from "./types";
import { U128, U64 } from "shared/web3/common";
import { OnchainAleopadLaunchAdministartionRecord } from "shared/web3/types";
import { GRANT_CAP_FEE_AMOUNT } from "./constants";
import { CreditAmounts } from "shared/web3/wallet";

export function createContext(
  grantee: string,
  amount: BigNumber.Value,
  record: OnchainAleopadLaunchAdministartionRecord
): GrantCapContext {
  return {
    amount: new U128(amount),
    grantee,
    record,
    feeCredits: new U64(GRANT_CAP_FEE_AMOUNT),
  };
}

export function checkContext(
  ctx: GrantCapContext,
  credits: CreditAmounts
): GrantCapContext {
  if (
    ctx.feeCredits.lt(credits.publicAmount) &&
    !credits.privateRecords.find((r) => r.amount.gte(ctx.feeCredits))
  ) {
    throw new Error(`Credits not enought to pay fee`);
  }

  return ctx;
}

import BigNumber from "bignumber.js";
import { U128, U64, context } from "../../common";
import { CapResult, CreditsRecord } from "../../wallet";

type BuyCommon = {
  amount: U128;
};

export type BuyPrivateWithoutCapContext = context.Type<
  {
    paymentRecord?: CreditsRecord;
    feeRecord?: CreditsRecord;
  } & context.Common &
    BuyCommon,
  "private-without-cap"
>;

export type CapContext = {
  capRecord?: CapResult;
};

export type BuyPrivateWithCapContext = context.Type<
  BuyPrivateWithoutCapContext & CapContext,
  "private-with-cap"
>;

export type BuyPublicWithoutCapContext = context.Type<
  {
    feeCreditsAmount: U64;
  } & context.Common &
    BuyCommon,
  "public-without-cap"
>;

export type BuyPublicWithCapContext = context.Type<
  BuyPublicWithoutCapContext & CapContext,
  "public-with-cap"
>;

export type BuyPublicContext =
  | BuyPublicWithCapContext
  | BuyPublicWithoutCapContext;

export type BuyPrivateContext =
  | BuyPrivateWithCapContext
  | BuyPrivateWithoutCapContext;

export type NonValidatedContext = BuyPublicContext | BuyPrivateContext;

export type ValidatedContext = Required<NonValidatedContext>;

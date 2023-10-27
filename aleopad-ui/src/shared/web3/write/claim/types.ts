import { Field, U128, context } from "../../common";
import { CreditsRecord, TicketRecord } from "../../wallet";

export type PublicClaimContext = context.Type<
  {
    tokenId: Field;
    launchId: Field;
    publicTicketAmount: U128;
  } & context.Common,
  "public-claim"
>;

export type PrivateClaimContext = context.Type<
  {
    ticket: TicketRecord;
    tokenId: Field;
    feeRecord?: CreditsRecord;
  } & context.Common,
  "private-claim"
>;

export type NonValidatedClaimContext = PublicClaimContext | PrivateClaimContext;

export type ValidatedClaimContext = Required<NonValidatedClaimContext>;

export type Tickets = {
  launchId: Field;
  publicAmount: U128;
  records: Array<TicketRecord>;
};

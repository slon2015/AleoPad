import { Field, U128, context } from "../../common";
import { CreditsRecord, TicketRecord } from "../../wallet";

export type PrivateClaimContext = context.Type<
  {
    ticket: TicketRecord;
    tokenId: Field;
    feeRecord?: CreditsRecord;
  } & context.Common,
  "private-claim"
>;

export type PublicClaimContext = context.Type<
  Omit<PrivateClaimContext, "feeRecord">,
  "public-claim"
>;

export type NonValidatedClaimContext = PublicClaimContext | PrivateClaimContext;

export type ValidatedClaimContext = Required<NonValidatedClaimContext>;

export type Tickets = {
  launchId: Field;
  records: Array<TicketRecord>;
};

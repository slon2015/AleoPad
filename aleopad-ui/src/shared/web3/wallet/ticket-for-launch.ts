import { ConnectedWalletContextState, OnchainTicketRecord } from "../types";
import { U128, parsePrimitiveType } from "../common";

type Arg = Pick<ConnectedWalletContextState, "publicKey" | "requestRecords"> & {
  launchId: string;
};

export type Tickets = {
  privateTickets: Array<TicketRecord>;
};

export type TicketRecord = {
  id: string;
  amount: U128;
  onchainRecord: OnchainTicketRecord;
};

export async function getTicketForLaunch({
  requestRecords,
}: Arg): Promise<Tickets> {
  const records = await requestRecords(process.env.REACT_APP_CORE_PROGRAMM_ID!);

  return {
    privateTickets: records
      .filter((r) => r.recordName === "LaunchTicket")
      .filter((r) => !r.spent)
      .map((r) => r as OnchainTicketRecord)
      .map((r) => ({
        id: r.id,
        amount: parsePrimitiveType(r.data.amount) as U128,
        onchainRecord: r,
      })),
  };
}

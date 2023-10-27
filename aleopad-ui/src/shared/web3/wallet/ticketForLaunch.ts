import {
  ConnectedWalletContextState,
  OnchainRecord,
  OnchainTicketRecord,
} from "../types";
import { U128, parsePrimitiveType } from "../common";
import { getPropgramMapping } from "../read";

type Arg = Pick<ConnectedWalletContextState, "publicKey" | "requestRecords"> & {
  launchId: string;
};

export type Tickets = {
  publicTicketAmount: U128;
  privateTickets: Array<TicketRecord>;
};

export type TicketRecord = {
  id: string;
  amount: U128;
  onchainRecord: OnchainTicketRecord;
};

function publicTicketId(launchId: string, ownerAddress: string): string {
  return "0field";
}

export async function getTicketForLaunch({
  launchId,
  publicKey,
  requestRecords,
}: Arg): Promise<Tickets> {
  const [publicTicket, records]: [string | null, Array<OnchainRecord<any>>] =
    await Promise.all([
      getPropgramMapping(
        process.env.REACT_APP_CORE_PROGRAMM_ID!,
        "public_tickets",
        publicTicketId(launchId, publicKey)
      ),
      requestRecords(process.env.REACT_APP_CORE_PROGRAMM_ID!),
    ]);

  return {
    publicTicketAmount: publicTicket
      ? (parsePrimitiveType(publicTicket) as U128)
      : new U128(0),
    privateTickets: records
      .filter((r) => r.type === "LaunchTicket")
      .filter((r) => !r.spent)
      .map((r) => r as OnchainTicketRecord)
      .map((r) => ({
        id: r.id,
        amount: parsePrimitiveType(r.data.amount) as U128,
        onchainRecord: r,
      })),
  };
}

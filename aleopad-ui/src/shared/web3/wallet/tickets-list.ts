import {
  ConnectedWalletContextState,
  OnchainRecord,
  OnchainTicketRecord,
} from "../types";

function filterRecord(r: OnchainRecord<{}>): boolean {
  return !r.spent && r.recordName === "LaunchTicket";
}

export async function getTicketsList(
  wallet: ConnectedWalletContextState
): Promise<Array<OnchainTicketRecord>> {
  const records: Array<OnchainRecord<{}>> = await wallet.requestRecords(
    process.env.REACT_APP_CORE_PROGRAMM_ID!
  );

  return records.filter(filterRecord).map((r) => r as OnchainTicketRecord);
}

import { U128, normalizeField, parsePrimitiveType } from "../common";
import {
  ConnectedWalletContextState,
  OnchainCapRecord,
  OnchainRecord,
} from "../types";

export type CapResult = {
  id: string;
  amountToBuy: U128;
  onchainRecord: OnchainCapRecord;
};

export async function getCapForLaunch(
  launchId: string,
  wallet: ConnectedWalletContextState
): Promise<CapResult | undefined> {
  const records: Array<OnchainRecord<{}>> = await wallet.requestRecords(
    process.env.REACT_APP_CORE_PROGRAMM_ID!
  );

  const capRecords = records
    .filter((r) => !r.spent)
    .filter((r) => r.recordName === "TicketAmountCap")
    .map((r) => r as OnchainCapRecord)
    .filter((r) => r.data.launch_id === normalizeField(launchId));

  if (capRecords.length === 1) {
    return {
      id: capRecords[0].id,
      amountToBuy: parsePrimitiveType(capRecords[0].data.amount_to_buy) as U128,
      onchainRecord: capRecords[0],
    };
  }
}

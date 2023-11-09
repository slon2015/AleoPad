import { cleanupVisibilityModifier, normalizeField } from "../common";
import {
  ConnectedWalletContextState,
  OnchainAleopadLaunchAdministartionRecord,
  OnchainRecord,
} from "../types";

export type AdministrationResult = OnchainAleopadLaunchAdministartionRecord;

export async function getLaunchAdministrationRecord(
  launchId: string,
  wallet: ConnectedWalletContextState
): Promise<AdministrationResult | undefined> {
  const records: Array<OnchainRecord<{}>> = await wallet.requestRecords(
    process.env.REACT_APP_CORE_PROGRAMM_ID!
  );

  const administrationRecord = records
    .filter((r) => !r.spent)
    .filter((r) => r.recordName === "AleopadLaunchAdministartion")
    .map((r) => r as OnchainAleopadLaunchAdministartionRecord)
    .find(
      (r) =>
        cleanupVisibilityModifier(r.data.launch_id) === normalizeField(launchId)
    );

  return administrationRecord;
}

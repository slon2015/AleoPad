import { Field, cleanupVisibilityModifier, normalizeField } from "../common";
import {
  ConnectedWalletContextState,
  OnchainPrivateTokenRecord,
  OnchainRecord,
} from "../types";

export async function getTokenRecords(
  { requestRecords }: ConnectedWalletContextState,
  tokenId: string | Field
): Promise<Array<OnchainPrivateTokenRecord>> {
  const records: Array<OnchainRecord<any>> = await requestRecords(
    process.env.REACT_APP_TOKENS_PROGRAMM_ID!
  );

  return records
    .filter((r) => !r.spent)
    .filter((r) => r.recordName === "PrivateToken")
    .map((r) => r as OnchainPrivateTokenRecord)
    .filter(
      (r) => cleanupVisibilityModifier(r.data.token) === normalizeField(tokenId)
    );
}

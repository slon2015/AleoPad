import { Field, normalizeField, parsePrimitiveType } from "../common";
import { getPropgramMapping } from "./readMapping";

export async function getTokenIdForLaunch(id: Field): Promise<Field | null> {
  const tokenId = await getPropgramMapping(
    process.env.REACT_APP_TOKENS_PROGRAMM_ID!,
    "launch_tokens",
    normalizeField(id)
  );

  if (!tokenId) {
    return null;
  }

  return parsePrimitiveType(tokenId) as Field;
}

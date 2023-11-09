import { OnchainToken } from "../types";
import {
  Field,
  normalizeField,
  parseLeoStruct,
  parsePrimitiveType,
} from "../common";
import { getPropgramMapping } from "./read-mapping";

interface TokenInfo {
  name: Field;
  symbol: Field;
  decimals: number;
}

export async function getTokenById(id: string): Promise<OnchainToken> {
  const normalizedId = normalizeField(id);

  const tokenInfoResponse = await getPropgramMapping(
    process.env.REACT_APP_TOKENS_PROGRAMM_ID!!,
    "tokens",
    normalizedId
  );

  if (!tokenInfoResponse) {
    throw new Error(`Token with id ${id} not found`);
  }

  const { decimals, name, symbol }: TokenInfo =
    parseLeoStruct(tokenInfoResponse);

  return {
    id: parsePrimitiveType(normalizedId) as Field,
    decimals,
    name: name,
    symbol: symbol,
  };
}

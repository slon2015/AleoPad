import { Field, parseLeoStruct, parsePrimitiveType } from "../common";
import { OnchainToken } from "../types";
import { getAllPropgramMappingValues } from "./read-mapping";

type MappingToken = {
  name: Field;
  symbol: Field;
  decimals: number;
};

export async function getTokens(): Promise<Array<OnchainToken>> {
  const mappingValues = await getAllPropgramMappingValues(
    process.env.REACT_APP_TOKENS_PROGRAMM_ID!,
    "tokens"
  );

  return mappingValues.map<OnchainToken>((t) => ({
    id: parsePrimitiveType(t.key) as Field,
    ...(parseLeoStruct(t.value) as MappingToken),
  }));
}

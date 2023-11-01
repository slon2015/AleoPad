import { Field, parseLeoStruct, parsePrimitiveType } from "../common";
import { ParsedLaunch, OnchainLaunch } from "../types";
import { getAllPropgramMappingValues } from "./readMapping";

export async function getLaunches(): Promise<Array<ParsedLaunch>> {
  const launchValues = await getAllPropgramMappingValues(
    process.env.REACT_APP_CORE_PROGRAMM_ID!,
    "launches"
  );

  const result: Array<ParsedLaunch> = [];

  for (let index = 0; index < launchValues.length; index++) {
    const launchMappingValue = launchValues[index];

    const parsedStruct = parseLeoStruct(
      launchMappingValue.value
    ) as OnchainLaunch;

    result.push({
      id: parsePrimitiveType(launchMappingValue.key) as Field,
      numerator: parsedStruct.credits_ratio_numerator,
      denominator: parsedStruct.credits_ratio_denominator,
      sellStartBlock: parsedStruct.sell_start_block_height,
      sellBlockDuration: parsedStruct.sell_duration_in_blocks,
      claimStartBlock: parsedStruct.claim_start_block_height,
      claimBlockDuration: parsedStruct.claim_duration_in_blocks,
      adminAddress: parsedStruct.admin,
      flags: {
        isPrivateSellsEnabled: parsedStruct.is_private_sells_enabled,
        isPublicSellsEnabled: parsedStruct.is_public_sells_enabled,
        isCapEnabled: parsedStruct.is_cap_enabled,
      },
    });
  }

  return result;
}

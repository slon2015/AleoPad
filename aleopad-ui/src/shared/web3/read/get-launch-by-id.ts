import { ParsedLaunch } from "../types";
import {
  Field,
  normalizeField,
  parseLeoStruct,
  parsePrimitiveType,
} from "../common";
import { getPropgramMapping } from "./read-mapping";
import Big from "bignumber.js";

interface LaunchInfo {
  sell_start_block_height: number;
  sell_duration_in_blocks: number;

  claim_start_block_height: number;
  claim_duration_in_blocks: number;

  credits_ratio_numerator: Big;
  credits_ratio_denominator: Big;

  admin: string;

  is_private_sells_enabled: boolean;
  is_public_sells_enabled: boolean;

  is_cap_enabled: boolean;
}

export async function getLaunchById(id: string): Promise<ParsedLaunch> {
  const normalizedId = normalizeField(id);

  const launchParamsResponse = await getPropgramMapping(
    process.env.REACT_APP_CORE_PROGRAMM_ID!!,
    "launches",
    normalizedId
  );

  if (!launchParamsResponse) {
    throw new Error(`Launch with id ${id} not found`);
  }

  const launchParams: LaunchInfo = parseLeoStruct(launchParamsResponse);

  const tokeIdResponse = await getPropgramMapping(
    process.env.REACT_APP_TOKENS_PROGRAMM_ID!!,
    "launch_tokens",
    normalizedId
  );

  return {
    id: parsePrimitiveType(normalizedId) as Field,
    adminAddress: launchParams.admin,
    sellStartBlock: launchParams.sell_start_block_height,
    sellBlockDuration: launchParams.sell_duration_in_blocks,

    claimStartBlock: launchParams.claim_start_block_height,
    claimBlockDuration: launchParams.claim_duration_in_blocks,
    numerator: launchParams.credits_ratio_numerator,
    denominator: launchParams.credits_ratio_denominator,
    flags: {
      isPrivateSellsEnabled: launchParams.is_private_sells_enabled,
      isPublicSellsEnabled: launchParams.is_public_sells_enabled,
      isCapEnabled: launchParams.is_cap_enabled,
    },
    tokenId: tokeIdResponse
      ? (parsePrimitiveType(tokeIdResponse) as Field)
      : undefined,
  };
}

export const CREATE_LAUNCH_FEE_AMOUNT = 1_000_000;

export const PUBLIC_LAUNCH_PARAMS_PROPS_ORDER = [
  "launch_id",
  "launch_admin",
  "sell_start_block_height",
  "sell_duration_in_blocks",
  "claim_start_block_height",
  "claim_duration_in_blocks",
  "credits_ratio_numerator",
  "credits_ratio_denominator",
  "is_private_sells_enabled",
  "is_public_sells_enabled",
  "is_cap_enabled",
];

export const PUBLIC_TOKEN_PARAMS_PROPS_ORDER = [
  "token_id",
  "name",
  "symbol",
  "decimals",
];

import { Token as DbToken, OnchainToken, fieldToText } from "shared/web3";

export type Token = DbToken;

export function mapToken(
  token: OnchainToken | undefined | null
): Token | undefined {
  if (!token) {
    return undefined;
  }

  return {
    name: fieldToText(token.name),
    symbol: fieldToText(token.symbol),
    id: token.id.toFixed(),
    decimals: token.decimals,
  };
}

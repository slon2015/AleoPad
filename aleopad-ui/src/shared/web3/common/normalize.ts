import BigNumber from "bignumber.js";
import { Field, Scalar, U128 } from "./parser";

function normalize(value: string | BigNumber | number, type: string): string {
  if (BigNumber.isBigNumber(value) || typeof value === "number") {
    return `${value.toFixed()}${type}`;
  }
  if (value.endsWith(type)) {
    return value;
  }
  return `${value}${type}`;
}

export function normalizeField(id: string | Field): string {
  return normalize(id, "field");
}

export function normalizeU128(id: string | U128): string {
  return normalize(id, "u128");
}

export function normalizeU32(id: string | number): string {
  return normalize(id, "u32");
}

export function normalizeU8(id: string | number): string {
  return normalize(id, "u8");
}

export function normalizeScalar(id: string | Scalar): string {
  return normalize(id, "scalar");
}

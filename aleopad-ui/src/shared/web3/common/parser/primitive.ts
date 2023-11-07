import { cleanupVisibilityModifier } from "./cleanup";
import { Field, Group, I128, I64, Scalar, U128, U64 } from "./types";

const primitiveInlineTypes: Array<string> = [
  "i8",
  "i16",
  "i32",
  "i64",
  "i128",
  "u8",
  "u16",
  "u32",
  "u64",
  "u128",
  "field",
  "group",
  "scalar",
];

function checkInlineType(value: string): string | null {
  for (let index = 0; index < primitiveInlineTypes.length; index++) {
    const inlineType = primitiveInlineTypes[index];
    if (value.endsWith(inlineType)) {
      return inlineType;
    }
  }
  return null;
}

function checkIsAddress(value: string): boolean {
  return value.startsWith("aleo1");
}

function checkIsSignature(value: string): boolean {
  return value.startsWith("sign");
}

function checkIsBool(value: string): boolean {
  return value === "true" || value === "false";
}

export function parsePrimitiveType(
  value: string
):
  | string
  | number
  | boolean
  | Field
  | Group
  | Scalar
  | I64
  | I128
  | U64
  | U128 {
  value = cleanupVisibilityModifier(value.trim());

  const inlineType = checkInlineType(value);
  value = inlineType
    ? value.substring(0, value.length - inlineType.length)
    : value;

  switch (inlineType) {
    case "field":
      return new Field(value);
    case "scalar":
      return new Scalar(value);
    case "group":
      return new Group(value);
    case "u64":
      return new U64(value);
    case "u128":
      return new U128(value);
    case "i64":
      return new I64(value);
    case "i128":
      return new I128(value);
    case "i8":
    case "i16":
    case "i32":
    case "u8":
    case "u16":
    case "u32":
      return Number.parseInt(value);
  }

  if (checkIsBool(value)) {
    return value === "true";
  }

  if (checkIsAddress(value)) {
    return value;
  }

  if (checkIsSignature(value)) {
    return value;
  }

  return value;
}

import BigNumber from "bignumber.js";
import { Field } from "./parser";

export function normalizeFieldId(id: string | BigNumber | Field): string {
  if (BigNumber.isBigNumber(id)) {
    return `${id.toFixed()}field`;
  }
  if (id.endsWith("field")) {
    return id;
  }
  return `${id}field`;
}

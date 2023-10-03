import { Field } from "./types";

export function fieldToText(field: Field): string {
  return Buffer.from(field.toString(16)).toString("utf-8");
}

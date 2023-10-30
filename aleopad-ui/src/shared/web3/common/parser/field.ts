import { Field } from "./types";
import { Buffer } from "buffer";

export function fieldToText(field: Field): string {
  return Buffer.from(field.toString(16), "hex").toString("utf-8");
}

export function textToField(text: string): Field {
  return new Field("0x" + Buffer.from(text, "utf-8").toString("hex"));
}

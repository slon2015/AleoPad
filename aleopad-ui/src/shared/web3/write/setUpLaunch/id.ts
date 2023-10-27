import { Field, normalizeField } from "../../common";
import { Buffer } from "buffer";

export function newId(): string {
  return normalizeField(new Field(randomBytes(16)));
}

export function randomBytes(size: number): string {
  return (
    "0x" +
    Buffer.from(window.crypto.getRandomValues(new Uint8Array(size))).toString(
      "hex"
    )
  );
}

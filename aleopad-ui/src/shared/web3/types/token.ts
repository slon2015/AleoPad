import { Field } from "../common";

export interface OnchainToken {
  id: Field;
  name: Field;
  symbol: Field;
  decimals: number;
}

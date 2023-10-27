import Repository from "../repository";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
}

export const tokens = new Repository<Token>("tokens");

import BigNumber from "bignumber.js";
import { ConnectedWalletContextState, OnchainCreditRecord } from "../types";
import { getPropgramMapping } from "../read";
import { U64, parsePrimitiveType } from "../common";

type Arg = Pick<ConnectedWalletContextState, "requestRecords" | "publicKey">;

export type CreditsRecord = {
  id: string;
  amount: BigNumber;
  onchainRecord: OnchainCreditRecord;
};

export type CreditAmounts = {
  publicAmount: BigNumber;
  privateRecords: Array<CreditsRecord>;
};

export async function getCredits(wallet: Arg): Promise<CreditAmounts> {
  const [publicBalance, records]: [string | null, Array<OnchainCreditRecord>] =
    await Promise.all([
      getPropgramMapping("credits.aleo", "account", wallet.publicKey),
      wallet.requestRecords("credits.aleo"),
    ]);

  return {
    publicAmount: publicBalance
      ? (parsePrimitiveType(publicBalance) as U64)
      : BigNumber(0),
    privateRecords: records
      .filter((record) => record.type === "credits")
      .filter((record) => record.data.microcredits !== "0u64.private")
      .filter((record) => !record.spent)
      .map((record) => ({
        id: record.id,
        amount: parsePrimitiveType(record.data.microcredits) as U64,
        onchainRecord: record,
      })),
  };
}

import {
  Transaction,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { ValidatedContext } from "./types";
import { ParsedLaunch } from "../../types";
import { normalizeField, normalizeU128 } from "../../common";
import { BUY_TICKET_FEE_AMOUNT } from "./constants";

export function buildTransaction(
  ctx: ValidatedContext,
  publicKey: string,
  launch: ParsedLaunch
): Transaction {
  switch (ctx.type) {
    case "private-without-cap":
      return Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        process.env.REACT_APP_CORE_PROGRAMM_ID!,
        "buy_private_without_cap",
        [
          ctx.paymentRecord.onchainRecord,
          normalizeField(ctx.requiredCredits.toString(10)),
          normalizeField(launch.id),
          normalizeU128(launch.numerator),
          normalizeU128(launch.denominator),
          launch.adminAddress,
        ],
        BUY_TICKET_FEE_AMOUNT,
        true
      );
    case "private-with-cap":
      return Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        process.env.REACT_APP_CORE_PROGRAMM_ID!,
        "buy_private_with_cap",
        [
          ctx.paymentRecord.onchainRecord,
          ctx.capRecord.onchainRecord,
          normalizeField(ctx.requiredCredits.toString(10)),
          normalizeField(launch.id),
          normalizeU128(launch.numerator),
          normalizeU128(launch.denominator),
          launch.adminAddress,
        ],
        BUY_TICKET_FEE_AMOUNT,
        true
      );
    case "public-without-cap":
      return Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        process.env.REACT_APP_CORE_PROGRAMM_ID!,
        "buy_public_without_cap",
        [
          normalizeField(ctx.requiredCredits.toString(10)),
          normalizeField(launch.id),
          normalizeU128(launch.numerator),
          normalizeU128(launch.denominator),
          launch.adminAddress,
        ],
        BUY_TICKET_FEE_AMOUNT,
        false
      );
    case "public-with-cap":
      return Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        process.env.REACT_APP_CORE_PROGRAMM_ID!,
        "buy_public_with_cap",
        [
          ctx.capRecord.onchainRecord,
          normalizeField(ctx.requiredCredits.toString(10)),
          normalizeU128(launch.numerator),
          normalizeU128(launch.denominator),
          normalizeField(launch.id),
          launch.adminAddress,
        ],
        BUY_TICKET_FEE_AMOUNT,
        false
      );
  }
}

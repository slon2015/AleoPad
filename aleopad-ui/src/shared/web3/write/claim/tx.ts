import {
  Transaction,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { ValidatedClaimContext } from "./types";
import { normalizeField } from "shared/web3/common";

export function buildTransaction(
  context: ValidatedClaimContext,
  publicKey: string
): Transaction {
  switch (context.type) {
    case "private-claim":
      return Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        process.env.REACT_APP_TOKENS_PROGRAMM_ID!,
        "claim_private",
        [normalizeField(context.tokenId), context.ticket.onchainRecord],
        context.requiredCredits.toNumber(),
        true
      );
    case "public-claim":
      return Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        process.env.REACT_APP_TOKENS_PROGRAMM_ID!,
        "claim_public",
        [normalizeField(context.tokenId), context.ticket.onchainRecord],
        context.requiredCredits.toNumber(),
        false
      );
  }
}

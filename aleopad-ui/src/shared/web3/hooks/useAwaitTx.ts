import { useCallback, useEffect, useState } from "react";
import { useWallet } from "./useWallet";

export function useAwaitTx(): Partial<{
  status: string;
  transactionId: string;
  txFinished: boolean;
}> & {
  setTransactionId(txId: string): void;
  cleanUpTx(): void;
} {
  let [transactionId, setTransactionId] = useState<string | undefined>();
  let [status, setStatus] = useState<string | undefined>();

  const wallet = useWallet();

  const getTransactionStatus = useCallback(
    async (txId: string) => {
      if (wallet.connected) {
        const status = await wallet.transactionStatus(txId);
        setStatus(status);
      }
    },
    [wallet]
  );

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (transactionId) {
      intervalId = setInterval(() => {
        getTransactionStatus(transactionId!);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [transactionId, getTransactionStatus]);

  const cleanUpTx = useCallback(() => {
    setTransactionId(undefined);
    setStatus(undefined);
  }, [setTransactionId]);

  return {
    setTransactionId,
    cleanUpTx,
    status,
    txFinished: status === "Completed" || status === "Failed",
    transactionId,
  };
}

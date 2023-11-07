import { useCallback, useEffect, useState } from "react";
import { useWallet } from "./useWallet";

export function useAwaitTx(): Partial<{
  status: string;
  transactionId: string;
}> & {
  setTransactionId(txId: string): void;
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

  useEffect(() => {
    if (status === "Completed" || status === "Failed") {
      setTimeout(() => {
        setStatus(undefined);
        setTransactionId(undefined);
      }, 3000);
    }
  }, [status, setTransactionId]);

  return {
    setTransactionId,
    status,
    transactionId,
  };
}

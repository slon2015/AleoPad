import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAwaitTx } from "shared/web3";
import { AwaitTransactionModal } from "./modal";

type TxMetadata = {
  txTitle: string;
  txDescription?: string;
};

interface AwaitTxModalContext {
  setTransaction(txId: string, txTitle: string, txDescription?: string): void;
}

export const AwaitTxContext = createContext<AwaitTxModalContext>({
  setTransaction() {},
});

export function AwaitTxModalProvider({ children }: React.PropsWithChildren) {
  const { status, setTransactionId, transactionId } = useAwaitTx();
  const [metadata, setMetadata] = useState<TxMetadata | undefined>();

  const setTransaction: AwaitTxModalContext["setTransaction"] = useCallback(
    (txId, txTitle, txDescription) => {
      if (!transactionId) {
        setTransactionId(txId);
        setMetadata({
          txTitle,
          txDescription,
        });
      }
    },
    [transactionId, setTransactionId]
  );

  useEffect(() => {
    if (!transactionId && metadata) {
      setMetadata(undefined);
    }
  }, [transactionId, metadata, setMetadata]);

  const value = useMemo<AwaitTxModalContext>(
    () => ({
      setTransaction,
    }),
    [setTransaction]
  );

  return (
    <AwaitTxContext.Provider value={value}>
      <AwaitTransactionModal
        txStatus={status}
        txTitle={metadata?.txTitle}
        txDescription={metadata?.txDescription}
      />
      {children}
    </AwaitTxContext.Provider>
  );
}

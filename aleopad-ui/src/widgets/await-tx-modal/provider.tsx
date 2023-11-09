import { createContext, useCallback, useMemo, useState } from "react";
import { useAwaitTx } from "shared/web3";
import { AwaitTransactionModal } from "./modal";

type TxMetadata = {
  txTitle: string;
  txDescription?: string;
  onSuccess?: () => React.ReactNode;
};

type TxModalRequest = {
  txId: string;
  txTitle: string;
} & Partial<{
  txDescription: string;
  onSuccess: () => React.ReactNode;
}>;

interface AwaitTxModalContext {
  setTransaction(request: TxModalRequest): void;
}

export const AwaitTxContext = createContext<AwaitTxModalContext>({
  setTransaction() {},
});

export function AwaitTxModalProvider({ children }: React.PropsWithChildren) {
  const { status, setTransactionId, transactionId, txFinished, cleanUpTx } =
    useAwaitTx();
  const [metadata, setMetadata] = useState<TxMetadata | undefined>();

  const setTransaction: AwaitTxModalContext["setTransaction"] = useCallback(
    ({ txId, txTitle, txDescription, onSuccess }) => {
      if (!transactionId) {
        setTransactionId(txId);
        setMetadata({
          txTitle,
          txDescription,
          onSuccess,
        });
      }
    },
    [transactionId, setTransactionId]
  );

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
        onSuccess={metadata?.onSuccess}
        txId={transactionId}
        isFinished={txFinished}
        onClose={cleanUpTx}
      />
      {children}
    </AwaitTxContext.Provider>
  );
}

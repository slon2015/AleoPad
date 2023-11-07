import React from "react";
import { AwaitTxModalProvider } from "widgets/await-tx-modal";

export const withAwaitModal = (component: () => React.ReactNode) => () =>
  <AwaitTxModalProvider>{component()}</AwaitTxModalProvider>;

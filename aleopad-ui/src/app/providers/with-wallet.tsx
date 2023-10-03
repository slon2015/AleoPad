import { WalletProvider } from "shared/web3";

export const withWallet = (component: () => React.ReactNode) => () =>
  <WalletProvider>{component()}</WalletProvider>;

import { WalletProvider as AleoWalletAdatapter } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { PropsWithChildren, useMemo } from "react";

const WalletProvider = ({ children }: PropsWithChildren) => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "AleoPad DApp",
      }),
    ],
    []
  );

  return (
    <AleoWalletAdatapter
      wallets={wallets}
      decryptPermission={DecryptPermission.AutoDecrypt}
      network={WalletAdapterNetwork.Testnet}
      autoConnect
    >
      <WalletModalProvider>{children}</WalletModalProvider>
    </AleoWalletAdatapter>
  );
};

export default WalletProvider;

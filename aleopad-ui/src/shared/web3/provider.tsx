import { WalletProvider as AleoWalletAdatapter } from "@demox-labs/aleo-wallet-adapter-react";
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
      {children}
    </AleoWalletAdatapter>
  );
};

export default WalletProvider;

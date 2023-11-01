import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { Card, List } from "antd";
import { LaunchRow, mapLaunch } from "entities/launch";
import { useState } from "react";
import { useLaunchesList } from "shared/web3";
import { BuyModal } from "widgets/buy-modal";

type Launch = Omit<
  Parameters<typeof LaunchRow>[0],
  "isConnected" | "onBuyClick"
>;

const LaunchesListPage = () => {
  const launches = useLaunchesList();
  const [selectedLaunch, setSelectedLaunch] = useState<
    Launch["launch"] | undefined
  >();

  const wallet = useWallet();
  return (
    <Card title="Launches">
      {selectedLaunch && (
        <BuyModal
          launch={selectedLaunch}
          onModalClose={() => setSelectedLaunch(undefined)}
        />
      )}
      <List
        bordered
        dataSource={launches.data || []}
        renderItem={(l) => (
          <List.Item>
            <LaunchRow
              launch={l!}
              isConnected={wallet.connected}
              onBuyClick={() => setSelectedLaunch(l)}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LaunchesListPage;

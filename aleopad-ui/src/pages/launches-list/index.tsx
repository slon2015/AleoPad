import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { Card, List } from "antd";
import { LaunchRow } from "entities/launch";
import { useState } from "react";
import { BuyModal } from "widgets/buy-modal";

type Launch = Omit<
  Parameters<typeof LaunchRow>[0],
  "isConnected" | "onBuyClick"
>;

const launches: Array<Launch> = [
  {
    launch: {
      id: "1",
      numerator: "1e4",
      denominator: "1",
      stage: "sales",
      privacy: "mixed",
      token: {
        id: "1",
        name: "AleoPad token",
        symbol: "ALPDT",
        decimals: 8,
      },
    },
  },
  {
    launch: {
      id: "2",
      numerator: "15e12",
      denominator: "1",
      stage: "pending",
      privacy: "private",
      token: {
        id: "2",
        name: "Some token",
        symbol: "SMTN",
        decimals: 18,
      },
    },
  },

  {
    launch: {
      id: "3",
      numerator: "2e6",
      denominator: "1",
      stage: "claims",
      privacy: "public",
      token: {
        id: "3",
        name: "Some token 2",
        symbol: "SMTN2",
        decimals: 18,
      },
    },
  },
];

const LaunchesListPage = () => {
  const [selectedLaunch, setSelectedLaunch] = useState<
    Launch["launch"] | undefined
  >();

  const wallet = useWallet();
  return (
    <Card title="Launches">
      <BuyModal
        launch={selectedLaunch}
        onModalClose={() => setSelectedLaunch(undefined)}
      />
      <List
        bordered
        dataSource={launches}
        renderItem={(l) => (
          <List.Item>
            <LaunchRow
              {...l}
              isConnected={wallet.connected}
              onBuyClick={() => setSelectedLaunch(l.launch)}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LaunchesListPage;

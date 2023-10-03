import { Card, List } from "antd";
import { LaunchRow } from "entities/launch";

const launches: Array<Parameters<typeof LaunchRow>[0]> = [
  {
    launch: {
      id: "1",
      ratio: "1e4",
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
      ratio: "15e12",
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
      ratio: "2e6",
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
  return (
    <Card title="Launches">
      <List
        bordered
        dataSource={launches}
        renderItem={(l) => (
          <List.Item>
            <LaunchRow {...l} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LaunchesListPage;

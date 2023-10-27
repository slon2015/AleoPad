import { Card, List } from "antd";
import { TokenRow } from "entities/token";

const launches: Array<Parameters<typeof TokenRow>[0]> = [
  {
    token: {
      id: "1",
      name: "AleoPad token",
      symbol: "ALPDT",
      decimals: 8,
    },
  },
  {
    token: {
      id: "2",
      name: "Some token",
      symbol: "SMTN",
      decimals: 18,
    },
  },
  {
    token: {
      id: "3",
      name: "Some token 2",
      symbol: "SMTN2",
      decimals: 18,
    },
  },
];

const TokensListPage = () => {
  return (
    <Card title="Tokens">
      <List
        bordered
        dataSource={launches}
        renderItem={(t) => (
          <List.Item>
            <TokenRow {...t} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TokensListPage;

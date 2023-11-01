import { Card, List } from "antd";
import { TokenRow } from "entities/token";
import { mapToken } from "entities/token/model";
import { useTokensList } from "shared/web3";

const TokensListPage = () => {
  const tokens = useTokensList();
  return (
    <Card title="Tokens">
      <List
        bordered
        dataSource={tokens.data || []}
        renderItem={(t) => (
          <List.Item>
            <TokenRow token={mapToken(t)!} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TokensListPage;

import { Card, Skeleton, Space } from "antd";
import { TokenBalances, TokenInfo } from "entities/token";
import { Field, useToken } from "shared/web3";

type TokenCardProps = {
  id: string | Field | undefined;
};

export function TokenCard({ id }: TokenCardProps) {
  const token = useToken(id);

  if (!token.data) {
    return (
      <Card>
        <Skeleton />
      </Card>
    );
  }

  return (
    <Card>
      <Space direction="vertical">
        <TokenInfo token={token.data} />
        <TokenBalances token={token.data} />
      </Space>
    </Card>
  );
}

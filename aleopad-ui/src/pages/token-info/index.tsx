import { Card } from "antd";
import { TokenInfo } from "entities/token";
import { useParams } from "react-router";

const TokenPage = () => {
  const { id } = useParams();
  return (
    <Card>
      <TokenInfo tokenId={id!!} />
    </Card>
  );
};

export default TokenPage;

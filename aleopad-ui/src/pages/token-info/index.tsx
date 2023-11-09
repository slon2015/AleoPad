import { useParams } from "react-router";
import { TokenCard } from "widgets/token-card";

const TokenPage = () => {
  const { id } = useParams();
  return <TokenCard id={id} />;
};

export default TokenPage;

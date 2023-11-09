import { Row } from "antd";
import { Link } from "react-router-dom";
import { Field, ParsedLaunch, normalizeField } from "shared/web3";

export function TxResult(tokenId: string | Field) {
  return (
    <Row>
      <Link to={`/tokens/${normalizeField(tokenId)}`}>
        See your token balance
      </Link>
    </Row>
  );
}

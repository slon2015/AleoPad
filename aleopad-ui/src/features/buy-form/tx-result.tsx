import { Row } from "antd";
import { Link } from "react-router-dom";
import { ParsedLaunch, normalizeField } from "shared/web3";

export function TxResult(launch: ParsedLaunch) {
  return (
    <Row>
      <Link to={`/tickets/${normalizeField(launch.id)}`}>See your tickets</Link>
    </Row>
  );
}

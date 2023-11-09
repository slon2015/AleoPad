import { Row, Space } from "antd";
import { Link } from "react-router-dom";
import { normalizeField } from "shared/web3";
import { SetUpContext } from "shared/web3/write/setup-launch/types";

export function TxResult({
  publicLaunchParams,
  publicTokenParams,
}: SetUpContext) {
  return (
    <Space direction="vertical">
      <Row>
        <Link to={`/launches/${normalizeField(publicLaunchParams.launch_id)}`}>
          See your launch
        </Link>
      </Row>
      <Row>
        <Link to={`/tokens/${normalizeField(publicTokenParams.token_id)}`}>
          See your token
        </Link>
      </Row>
    </Space>
  );
}

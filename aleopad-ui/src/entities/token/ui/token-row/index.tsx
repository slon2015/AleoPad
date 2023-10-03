import { useNavigate } from "react-router";
import { useCallback } from "react";

import { Token } from "../../model";

import styles from "./style.module.scss";
import { Col, Row, Typography } from "antd";

type TokenRowProps = {
  token: Token;
};

export default function TokenRow({ token }: TokenRowProps) {
  const navigate = useNavigate();

  const onLaunchClick = useCallback(() => {
    navigate(`/tokens/${token.id}`);
  }, [token.id, navigate]);

  return (
    <Row className={styles.row}>
      <Col span={20}>
        <Typography.Link onClick={onLaunchClick}>{token.name}</Typography.Link>
      </Col>
      <Col span={4}>
        <Typography.Text>{token.decimals}</Typography.Text>
      </Col>
    </Row>
  );
}

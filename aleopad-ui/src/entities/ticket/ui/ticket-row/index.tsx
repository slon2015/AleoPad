import React from "react";
import { Button, Col, Row, Typography } from "antd";
import BigNumber from "bignumber.js";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

interface TicketRowProps {
  launchId: string;
  amount: BigNumber.Value;
  tokenName: string;
  tokenSymbol: string;
  isClaimable: boolean;
}

export const TicketRow = ({
  tokenName,
  tokenSymbol,
  launchId,
  amount,
  isClaimable,
}: TicketRowProps) => {
  const name = tokenName || `Coin-${launchId}`;

  const claimed = amount === 0;

  return (
    <Row className={styles.row} align="middle">
      <Col span={10}>
        <Typography.Text>{name}</Typography.Text>
      </Col>
      <Col span={6}>
        <Typography.Text>
          {amount.toString()} {tokenSymbol}
        </Typography.Text>
      </Col>
      <Col span={3}>
        <Link to={`/launches/${launchId}`}>Launch</Link>
      </Col>
      <Col span={5}>
        {isClaimable && !claimed && <Button type="primary">Claim</Button>}
      </Col>
    </Row>
  );
};

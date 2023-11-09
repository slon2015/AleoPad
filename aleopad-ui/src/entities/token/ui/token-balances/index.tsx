import { Card, Col, Row, Skeleton, Typography } from "antd";
import { Token, isMappedToken, mapToken } from "entities/token/model";
import { useMemo } from "react";
import { Amount } from "shared/ui";
import { OnchainToken, normalizeField, useTokenBalances } from "shared/web3";
import cn from "classnames";

import styles from "./style.module.scss";

type TokenBalancesProps = {
  token: OnchainToken | Token;
};

export default function TokenBalances({ token }: TokenBalancesProps) {
  const balances = useTokenBalances(normalizeField(token.id));
  const parsedToken = useMemo(
    () => (isMappedToken(token) ? token : mapToken(token)),
    [token]
  );

  const isDataReady = balances.data && parsedToken;

  return (
    <Card size="small" bodyStyle={{ padding: "3px" }}>
      <Row>
        <Col
          span={12}
          className={cn(
            styles.cell,
            styles["first-cell"],
            styles["cell-row-0"]
          )}
        >
          <Typography.Text>Public balance</Typography.Text>
        </Col>
        <Col span={12} className={cn(styles.cell, styles["cell-row-0"])}>
          <Typography.Text>Private balance</Typography.Text>
        </Col>
        <Col span={12} className={cn(styles.cell, styles["first-cell"])}>
          {isDataReady ? (
            <Amount
              amount={balances.data.publicBalance}
              decimals={parsedToken.decimals}
              symbol={parsedToken.symbol}
            />
          ) : (
            <Skeleton.Input />
          )}
        </Col>
        <Col span={12} className={cn(styles.cell)}>
          {isDataReady ? (
            <Amount
              amount={balances.data.privateBalance}
              decimals={parsedToken.decimals}
              symbol={parsedToken.symbol}
            />
          ) : (
            <Skeleton.Input />
          )}
        </Col>
      </Row>
    </Card>
  );
}

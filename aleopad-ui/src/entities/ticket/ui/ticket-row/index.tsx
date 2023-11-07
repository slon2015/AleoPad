import React from "react";
import { Button, Col, Row, Typography } from "antd";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import {
  TicketItem,
  divideToDecimals,
  fieldToText,
  normalizeField,
  useTokenForLaunch,
} from "shared/web3";
import { Ticket } from "entities/ticket/model";
import { Amount } from "shared/ui";

type TicketRowProps = TicketItem & { currentBlockHeight: number };

function mapFromProps(
  props: TicketRowProps
): Omit<Ticket, "tokenName" | "tokenSymbol" | "tokenDecimals"> {
  return {
    launchId: normalizeField(props.launch.id),
    amount: props.amount,
    isClaimable:
      props.launch.claimStartBlock <= props.currentBlockHeight &&
      (props.launch.claimBlockDuration === 0 ||
        props.launch.claimStartBlock + props.launch.claimBlockDuration >
          props.currentBlockHeight),
  };
}

function mapToken(
  input: ReturnType<typeof useTokenForLaunch>,
  launchId: string
): Pick<Ticket, "tokenName" | "tokenDecimals" | "tokenSymbol"> {
  if (input.isSuccess && input.data) {
    return {
      tokenDecimals: input.data.decimals,
      tokenName: fieldToText(input.data.name),
      tokenSymbol: fieldToText(input.data.symbol),
    };
  }

  return {
    tokenName: `Coin-${launchId}`,
    tokenDecimals: 6,
    tokenSymbol: "TKN",
  };
}

export const TicketRow = (props: TicketRowProps) => {
  const { launchId, amount, isClaimable } = mapFromProps(props);

  const token = useTokenForLaunch(launchId);

  const { tokenName, tokenSymbol, tokenDecimals } = mapToken(token, launchId);

  const claimed = amount === 0;

  return (
    <Row className={styles.row} align="middle">
      <Col span={10}>
        <Typography.Text>{tokenName}</Typography.Text>
      </Col>
      <Col span={6}>
        <Amount amount={amount} decimals={tokenDecimals} symbol={tokenSymbol} />
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

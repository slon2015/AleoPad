import { Button, Col, Row, Skeleton, Typography } from "antd";
import { useNavigate } from "react-router";
import { useCallback, useMemo } from "react";

import { mapLaunch } from "../../model";

import styles from "./style.module.scss";
import { Ratio } from "shared/ui";
import {
  ParsedLaunch,
  normalizeField,
  useBlockHeight,
  useTokenForLaunch,
} from "shared/web3";

type LaunchRowProps = {
  launch: ParsedLaunch;
  isConnected: boolean;
  onBuyClick(): void;
};

export default function LaunchRow({
  launch,
  isConnected,
  onBuyClick,
}: LaunchRowProps) {
  const tokenRequest = useTokenForLaunch(launch.id);
  const { blockHeight } = useBlockHeight();

  const model = useMemo(
    () => mapLaunch(launch, blockHeight, tokenRequest.data),
    [launch, blockHeight, tokenRequest.data]
  );

  const launchName = model?.token?.name || "Token";
  const launchSymbol = model?.token?.symbol?.toUpperCase() || "TKN";
  const launchDecimals = model?.token?.decimals || 6;

  const navigate = useNavigate();

  const onLaunchClick = useCallback(() => {
    navigate(`/launches/${normalizeField(launch.id)}`);
  }, [launch.id, navigate]);

  if (!model) {
    return (
      <Row className={styles.row} align="middle">
        <Col span={4}>
          <Skeleton.Input />
        </Col>
        <Col span={4}>
          <Skeleton.Input />
        </Col>
        <Col span={4}>
          <Skeleton.Input />
        </Col>
        <Col span={8}>
          <Skeleton.Input />
        </Col>
        <Col span={4}>
          <Skeleton.Button />
        </Col>
      </Row>
    );
  }

  return (
    <Row className={styles.row} align="middle">
      <Col span={4}>
        <Typography.Link onClick={onLaunchClick}>{launchName}</Typography.Link>
      </Col>
      <Col span={4}>
        <Typography.Text>{model.stage.toUpperCase()}</Typography.Text>
      </Col>
      <Col span={4}>
        <Typography.Text>{model.privacy}</Typography.Text>
      </Col>
      <Col span={8}>
        <Ratio
          rightSymbol="ALEO"
          rightDecimals={6}
          leftSymbol={launchSymbol}
          leftDecimals={launchDecimals}
          ratioData={{
            numerator: launch.numerator,
            denominator: launch.denominator,
          }}
        />
      </Col>
      <Col span={4}>
        {isConnected && model.stage === "sales" && (
          <Button type="primary" onClick={onBuyClick}>
            Buy
          </Button>
        )}
      </Col>
    </Row>
  );
}

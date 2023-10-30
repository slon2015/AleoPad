import { Button, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router";
import { useCallback } from "react";

import { Launch } from "../../model";

import styles from "./style.module.scss";
import { Ratio } from "shared/ui";

type LaunchRowProps = {
  launch: Pick<
    Launch,
    "token" | "stage" | "numerator" | "denominator" | "id" | "privacy"
  >;
  isConnected: boolean;
  onBuyClick(): void;
};

export default function LaunchRow({
  launch,
  isConnected,
  onBuyClick,
}: LaunchRowProps) {
  const launchName = launch?.token?.name || "Token";
  const launchSymbol = launch?.token?.symbol?.toUpperCase() || "TKN";
  const launchDecimals = launch?.token?.decimals || 6;

  const navigate = useNavigate();

  const onLaunchClick = useCallback(() => {
    navigate(`/launches/${launch.id}`);
  }, [launch.id, navigate]);

  return (
    <Row className={styles.row} align="middle">
      <Col span={4}>
        <Typography.Link onClick={onLaunchClick}>{launchName}</Typography.Link>
      </Col>
      <Col span={4}>
        <Typography.Text>{launch.stage.toUpperCase()}</Typography.Text>
      </Col>
      <Col span={4}>
        <Typography.Text>{launch.privacy}</Typography.Text>
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
        {isConnected && launch.stage === "sales" && (
          <Button type="primary" onClick={onBuyClick}>
            Buy
          </Button>
        )}
      </Col>
    </Row>
  );
}

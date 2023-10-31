import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { Card, Row, Space, Typography, notification } from "antd";

import { useLaunch, LaunchInfo, LaunchTimings } from "entities/launch";
import BuyForm from "features/buy-form";
import { useEffect } from "react";

interface LaunchCardProps {
  launchId: string;
}

export function LaunchCard({ launchId }: LaunchCardProps) {
  const { launch, blockHeight, error: launchError } = useLaunch(launchId);
  const wallet = useWallet();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (launchError) {
      api.error({
        message: "Launch loading error",
        description: launchError,
      });
    }
  }, [launchError]);

  return (
    <Card title="Launch">
      {contextHolder}
      <Space direction="vertical">
        <Row>
          <LaunchInfo {...launch} />
        </Row>
        <Row justify="center">
          <Typography.Title>Schedule</Typography.Title>
        </Row>
        <Row>
          <LaunchTimings blockHeight={blockHeight} {...launch} />
        </Row>
        <Row justify="center">
          {launch && launch.stage === "sales" && wallet.connected && (
            <BuyForm launchId={launchId} privacy={launch.privacy} />
          )}
        </Row>
      </Space>
    </Card>
  );
}

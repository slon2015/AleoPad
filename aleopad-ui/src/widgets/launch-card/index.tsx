import { Card, Row, Typography, notification } from "antd";

import { useLaunch, LaunchInfo, LaunchTimings } from "entities/launch";
import { useEffect } from "react";

interface LaunchCardProps {
  launchId: string;
}

export function LaunchCard({ launchId }: LaunchCardProps) {
  const { launch, blockHeight, error: launchError } = useLaunch(launchId);

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
      <Row>
        <LaunchInfo {...launch} />
      </Row>
      <Row justify="center">
        <Typography.Title>Schedule</Typography.Title>
      </Row>
      <LaunchTimings blockHeight={blockHeight} {...launch} />
    </Card>
  );
}

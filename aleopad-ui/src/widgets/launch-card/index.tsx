import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { Card, Row, Space, Typography, notification } from "antd";

import { useLaunch, LaunchInfo, LaunchTimings } from "entities/launch";
import { TokenInfo } from "entities/token";
import BuyForm from "features/buy-form";
import { GrantCapForm } from "features/grant-cap-form";
import { useEffect } from "react";
import { useLaunchAdministartion } from "shared/web3";

interface LaunchCardProps {
  launchId: string;
}

export function LaunchCard({ launchId }: LaunchCardProps) {
  const { launch, blockHeight, error: launchError } = useLaunch(launchId);
  const administration = useLaunchAdministartion(launch?.id);
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
        {launch?.token?.id && (
          <Row justify="center">
            <TokenInfo token={launch.token} />
          </Row>
        )}
        {administration.data && launch?.token && launch?.cap && (
          <Space direction="vertical">
            <Row justify="center">
              <Typography.Title level={4}>Grant cap</Typography.Title>
            </Row>
            <Row justify="center">
              <GrantCapForm
                administration={administration.data}
                tokenDecimals={launch.token.decimals}
              />
            </Row>
          </Space>
        )}
        <Row justify="center">
          <Typography.Title level={4}>Schedule</Typography.Title>
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

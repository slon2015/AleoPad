import { useEffect } from "react";
import {
  Descriptions,
  DescriptionsProps,
  notification,
  Typography,
  Skeleton,
} from "antd";

import { useToken } from "shared/hooks";

type TokenCardProps = {
  tokenId: string;
};

export default function TokenInfo({ tokenId }: TokenCardProps) {
  const { token, error } = useToken(tokenId);
  const [api, contextHolder] = notification.useNotification();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: token ? (
        <Typography.Text>{token.name}</Typography.Text>
      ) : (
        <Skeleton.Input />
      ),
    },
    {
      key: "2",
      label: "Symbol",
      children: token ? (
        <Typography.Text>{token.symbol.toUpperCase()}</Typography.Text>
      ) : (
        <Skeleton.Input />
      ),
    },
    {
      key: "3",
      label: "Decimals",
      children: token ? (
        <Typography.Text>{token.decimals}</Typography.Text>
      ) : (
        <Skeleton.Input />
      ),
    },
  ];

  useEffect(() => {
    if (error) {
      api.error({
        message: "Token loading error",
        description: error,
      });
    }
  }, [error]);

  return (
    <>
      {contextHolder}
      <Descriptions title="Token" items={items} layout="vertical" />
    </>
  );
}

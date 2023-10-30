import { useEffect, useMemo } from "react";
import {
  Descriptions,
  DescriptionsProps,
  notification,
  Typography,
  Skeleton,
} from "antd";

import { useToken } from "shared/web3";
import { mapToken } from "entities/token/model";

type TokenCardProps = {
  tokenId: string;
};

export default function TokenInfo({ tokenId }: TokenCardProps) {
  const { data: token, error } = useToken(tokenId);
  const parsedToken = useMemo(() => mapToken(token), [token]);
  const [api, contextHolder] = notification.useNotification();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: token ? (
        <Typography.Text>{parsedToken!.name}</Typography.Text>
      ) : (
        <Skeleton.Input />
      ),
    },
    {
      key: "2",
      label: "Symbol",
      children: token ? (
        <Typography.Text>{parsedToken!.symbol.toUpperCase()}</Typography.Text>
      ) : (
        <Skeleton.Input />
      ),
    },
    {
      key: "3",
      label: "Decimals",
      children: token ? (
        <Typography.Text>{parsedToken!.decimals}</Typography.Text>
      ) : (
        <Skeleton.Input />
      ),
    },
  ];

  useEffect(() => {
    if (error) {
      api.error({
        message: "Token loading error",
        description: String(error),
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

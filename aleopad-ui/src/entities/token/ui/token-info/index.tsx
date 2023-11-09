import { useMemo } from "react";
import { Descriptions, DescriptionsProps, Typography, Skeleton } from "antd";

import { OnchainToken } from "shared/web3";
import { Token, isMappedToken, mapToken } from "entities/token/model";

type TokenCardProps = {
  token: OnchainToken | Token;
};

export default function TokenInfo({ token }: TokenCardProps) {
  const parsedToken = useMemo(
    () => (isMappedToken(token) ? token : mapToken(token)),
    [token]
  );

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

  return <Descriptions title="Token" items={items} layout="vertical" />;
}

import { useMemo } from "react";
import { Descriptions, DescriptionsProps, Typography, Skeleton } from "antd";

import { OnchainToken, normalizeField } from "shared/web3";
import { Token, isMappedToken, mapToken } from "entities/token/model";
import { Link } from "react-router-dom";

type TokenCardProps = {
  token: OnchainToken | Token;
  link?: boolean;
};

export default function TokenInfo({ token, link }: TokenCardProps) {
  const parsedToken = useMemo(
    () => (isMappedToken(token) ? token : mapToken(token)),
    [token]
  );

  const nameEntry = parsedToken ? (
    link ? (
      <Link to={`/tokens/${normalizeField(parsedToken.id)}`}>
        {parsedToken.name}
      </Link>
    ) : (
      <Typography.Text>{parsedToken!.name}</Typography.Text>
    )
  ) : (
    <Skeleton.Input />
  );

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: nameEntry,
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

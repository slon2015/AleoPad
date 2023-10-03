import React from "react";
import { Descriptions, DescriptionsProps, Skeleton, Typography } from "antd";

import { Launch } from "../../model";
import { Ratio } from "shared/ui";

type LaunchCardProps = Partial<Launch>;

export default function LaunchInfo(props: LaunchCardProps) {
  const { cap, privacy, ratio, stage, token } = props;

  const tokenSymbol = token ? token.symbol : "COIN";
  const tokenDecimals = token ? token.decimals : 6;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Privacy",
      children: privacy ? (
        <Typography.Text>{privacy}</Typography.Text>
      ) : (
        <Skeleton.Input />
      ),
    },
    {
      key: "2",
      label: "Cap",
      children: cap ? (
        <Typography.Text>{cap ? "enabled" : "disabled"}</Typography.Text>
      ) : (
        <Skeleton.Input />
      ),
    },
    {
      key: "3",
      label: "Ratio",
      children: ratio ? (
        <Typography.Text>
          <Ratio
            rightSymbol="ALEO"
            rightDecimals={6}
            leftSymbol={tokenSymbol}
            leftDecimals={tokenDecimals}
            ratioData={{ value: ratio }}
          />
        </Typography.Text>
      ) : (
        <Skeleton.Input />
      ),
    },
    {
      key: "4",
      label: "Stage",
      children: stage ? (
        <Typography.Text>{stage}</Typography.Text>
      ) : (
        <Skeleton.Input />
      ),
    },
  ];

  return (
    <>
      <Descriptions title="Launch summary" items={items} layout="vertical" />
    </>
  );
}

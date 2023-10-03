import { Space, Typography } from "antd";
import cn from "classnames";
import moment from "moment";

import styles from "./styles.module.scss";

interface BlockTimingProps {
  dontShowBlocksCount?: boolean;
  currentBlockHeight: number;
  targetBlockHeight: number;
  meanBlockTimeInSeconds?: number;
}

function timingText(
  blockGap: number,
  meanBlockTimeInSeconds: number,
  isPassed: boolean
) {
  const postfix = isPassed ? " ago" : "";
  return (
    moment
      .duration(Math.abs(blockGap) * meanBlockTimeInSeconds, "seconds")
      .humanize() + postfix
  );
}

export default function BlockTiming({
  currentBlockHeight,
  targetBlockHeight,
  meanBlockTimeInSeconds,
  dontShowBlocksCount,
}: BlockTimingProps) {
  const showTimingInSeconds = Boolean(meanBlockTimeInSeconds);

  const blockGap = targetBlockHeight - currentBlockHeight;
  const isPassed = blockGap <= 0;

  const timing =
    showTimingInSeconds && meanBlockTimeInSeconds && blockGap !== 0
      ? "~ " + timingText(blockGap, meanBlockTimeInSeconds, isPassed)
      : "";

  const blockGapText = dontShowBlocksCount
    ? ""
    : `${Math.abs(blockGap)} Blocks `;
  return (
    <Space>
      <Typography.Text className={cn({ [styles.passed]: isPassed })}>
        {blockGapText}
        {timing}
      </Typography.Text>
    </Space>
  );
}

import { Row, Skeleton, Space, Typography } from "antd";
import { BlockTiming } from "shared/ui";

type LaunchTimingProps = Partial<{
  blockHeight: number;
  sellStartBlock: number;
  sellBlockDuration: number;
  claimStartBlock: number;
  claimBlockDuration: number;
}>;

export default function LaunchTimings({
  blockHeight,
  sellStartBlock,
  sellBlockDuration,
  claimStartBlock,
  claimBlockDuration,
}: LaunchTimingProps) {
  return (
    <Space direction="vertical">
      <Row>
        <Space>
          <Typography.Text>Sales start</Typography.Text>
          {blockHeight != null && sellStartBlock != null ? (
            <BlockTiming
              currentBlockHeight={blockHeight!}
              targetBlockHeight={sellStartBlock!}
            />
          ) : (
            <Skeleton.Input />
          )}
        </Space>
      </Row>
      <Row>
        <Space>
          <Typography.Text>Sales end</Typography.Text>
          {blockHeight != null &&
          sellStartBlock != null &&
          sellBlockDuration != null ? (
            <BlockTiming
              currentBlockHeight={blockHeight!}
              targetBlockHeight={sellStartBlock! + sellBlockDuration!}
            />
          ) : (
            <Skeleton.Input />
          )}
        </Space>
      </Row>
      <Row>
        <Space>
          <Typography.Text>Claim start</Typography.Text>
          {blockHeight != null && claimStartBlock != null ? (
            <BlockTiming
              currentBlockHeight={blockHeight!}
              targetBlockHeight={claimStartBlock!}
            />
          ) : (
            <Skeleton.Input />
          )}
        </Space>
      </Row>
      {claimBlockDuration != null && claimBlockDuration > 0 && (
        <Row>
          <Space>
            <Typography.Text>Claim end</Typography.Text>
            {blockHeight != null && claimStartBlock != null ? (
              <BlockTiming
                currentBlockHeight={blockHeight}
                targetBlockHeight={claimStartBlock + claimBlockDuration}
              />
            ) : (
              <Skeleton.Input />
            )}
          </Space>
        </Row>
      )}
    </Space>
  );
}

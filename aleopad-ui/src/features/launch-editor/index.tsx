import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  notification,
} from "antd";
import BigNumber from "bignumber.js";
import { useCallback, useEffect, useMemo, useState } from "react";

import { BlockTiming, Ratio } from "shared/ui";
import { useBlockHeight, useMeanBlockTime, useSetUpLaunch } from "shared/web3";
import { setUpLaunch } from "shared/web3";

function valueToFlags(
  privacy: "mixed" | "public" | "private"
): Pick<
  setUpLaunch.NewLaunch["flags"],
  "isPrivateSellsEnabled" | "isPublicSellsEnabled"
> {
  if (privacy === "mixed") {
    return {
      isPrivateSellsEnabled: true,
      isPublicSellsEnabled: true,
    };
  } else if (privacy === "private") {
    return {
      isPrivateSellsEnabled: true,
      isPublicSellsEnabled: false,
    };
  } else {
    return {
      isPrivateSellsEnabled: false,
      isPublicSellsEnabled: true,
    };
  }
}

function flagsToValue(
  flags: Pick<
    setUpLaunch.NewLaunch["flags"],
    "isPrivateSellsEnabled" | "isPublicSellsEnabled"
  >
): "mixed" | "public" | "private" {
  if (flags.isPrivateSellsEnabled && flags.isPublicSellsEnabled) {
    return "mixed";
  } else if (flags.isPrivateSellsEnabled) {
    return "private";
  } else {
    return "public";
  }
}

const defaultLaunch = (currentBlockNumber: number): setUpLaunch.NewLaunch => ({
  token: {
    name: "My new token",
    symbol: "TKN",
    decimals: 18,
  },
  sellBlockStart: currentBlockNumber + 20,
  sellDurationInBlocks: 200,

  claimBlockStart: currentBlockNumber + 300,
  claimDurationInBlocks: false,
  ratio: BigNumber(1000000),
  flags: {
    isCapEnabled: false,
    isPublicSellsEnabled: true,
    isPrivateSellsEnabled: true,
  },
});

const INPUT_SPAN = 6;

export default function LaunchEditor() {
  const heightResponse = useBlockHeight();
  const blockTimeResponse = useMeanBlockTime();
  const [api, contextHolder] = notification.useNotification();

  const setUp = useSetUpLaunch();

  useEffect(() => {
    if (heightResponse.error || blockTimeResponse.error) {
      api.error({
        message: "Block height fetch error",
        description: heightResponse.error || blockTimeResponse.error,
      });
    }
  }, [heightResponse.error, blockTimeResponse.error]);

  useEffect(() => {
    if (setUp.enabled && setUp.mutation.isError) {
      notification.error({
        message: "Error during launch setup",
        description: String(setUp.mutation.error),
      });
      setUp.mutation.reset();
    }
  }, [setUp]);

  const [launch, setLaunch] = useState(defaultLaunch(1000000));

  const onCurrentBlockClick = useCallback(() => {
    if (heightResponse.blockHeight) {
      setLaunch({
        ...launch,
        sellBlockStart: heightResponse.blockHeight,
      });
    }
  }, [heightResponse.blockHeight, launch]);

  const [enabled, blocker]: [boolean, string | undefined] = useMemo(() => {
    if (setUp.enabled) {
      return [!setUp.mutation.isLoading, setUp.getBlocker(launch)];
    }

    return [false, undefined];
  }, [setUp, launch]);

  const onSetUpClick = useCallback(() => {
    if (setUp.enabled) {
      if (!blocker) {
        setUp.mutation.mutate(launch);
      } else {
        api.warning({
          message: "Unable to set up launch",
          description: blocker,
        });
      }
    }
  }, [setUp, launch, blocker]);

  return (
    <>
      {contextHolder}
      <Card title="Launchpad editor">
        <Form labelCol={{ span: 7 }}>
          <Form.Item label="Token name">
            <Input
              value={launch.token.name}
              onChange={(e) =>
                setLaunch((l) => {
                  const updated = {
                    ...l,
                  };

                  updated.token.name = e.target.value;
                  return updated;
                })
              }
            />
          </Form.Item>
          <Form.Item label="Token symbol">
            <Input
              value={launch.token.symbol}
              onChange={(e) =>
                setLaunch((l) => {
                  const updated = {
                    ...l,
                  };

                  updated.token.symbol = e.target.value;
                  return updated;
                })
              }
            />
          </Form.Item>
          <Form.Item label="Token decimals">
            <Row>
              <Col span={INPUT_SPAN}>
                <InputNumber
                  min={0}
                  value={launch.token.decimals}
                  onChange={(e) =>
                    setLaunch((l) => {
                      const updated = {
                        ...l,
                      };

                      updated.token.decimals = e || 0;
                      return updated;
                    })
                  }
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Sales start block">
            <Row align="middle">
              <Col span={INPUT_SPAN}>
                <InputNumber
                  value={launch.sellBlockStart}
                  min={0}
                  onChange={(e) =>
                    setLaunch((l) => {
                      const updated = {
                        ...l,
                      };

                      updated.sellBlockStart = e || 0;
                      return updated;
                    })
                  }
                />
              </Col>
              <Col span={12} offset={4}>
                {heightResponse.blockHeight &&
                  blockTimeResponse.meanBlockTimeInSeconds && (
                    <BlockTiming
                      currentBlockHeight={heightResponse.blockHeight}
                      targetBlockHeight={launch.sellBlockStart}
                      meanBlockTimeInSeconds={
                        blockTimeResponse.meanBlockTimeInSeconds
                      }
                      dontShowBlocksCount
                    />
                  )}
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col span={INPUT_SPAN}>
                <Button type="text" onClick={onCurrentBlockClick}>
                  Current block
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Sales duration in blocks">
            <Row align="middle">
              <Col span={INPUT_SPAN}>
                <InputNumber
                  value={launch.sellDurationInBlocks}
                  min={1}
                  onChange={(e) =>
                    setLaunch((l) => {
                      const updated = {
                        ...l,
                      };

                      updated.sellDurationInBlocks = e || 0;
                      return updated;
                    })
                  }
                />
              </Col>
              <Col offset={4} span={12}>
                {blockTimeResponse.meanBlockTimeInSeconds && (
                  <BlockTiming
                    currentBlockHeight={launch.sellBlockStart}
                    targetBlockHeight={
                      launch.sellBlockStart + launch.sellDurationInBlocks
                    }
                    meanBlockTimeInSeconds={
                      blockTimeResponse.meanBlockTimeInSeconds
                    }
                    dontShowBlocksCount
                  />
                )}
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Claims start block">
            <Row>
              <Col span={INPUT_SPAN}>
                <InputNumber
                  value={launch.claimBlockStart}
                  min={0}
                  onChange={(e) =>
                    setLaunch((l) => {
                      const updated = {
                        ...l,
                      };

                      updated.claimBlockStart = e || 0;
                      return updated;
                    })
                  }
                />
              </Col>
              <Col offset={4} span={12}>
                {heightResponse.blockHeight &&
                  blockTimeResponse.meanBlockTimeInSeconds && (
                    <BlockTiming
                      currentBlockHeight={heightResponse.blockHeight}
                      targetBlockHeight={launch.claimBlockStart}
                      meanBlockTimeInSeconds={
                        blockTimeResponse.meanBlockTimeInSeconds
                      }
                      dontShowBlocksCount
                    />
                  )}
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Claims duration in blocks">
            <Row>
              <Col span={INPUT_SPAN}>
                <InputNumber
                  value={launch.claimDurationInBlocks || 0}
                  min={0}
                  onChange={(e) =>
                    setLaunch((l) => {
                      const updated = {
                        ...l,
                      };

                      updated.claimDurationInBlocks = e || 0;
                      return updated;
                    })
                  }
                />
              </Col>
              <Col offset={4} span={12}>
                {blockTimeResponse.meanBlockTimeInSeconds &&
                  launch.claimDurationInBlocks &&
                  launch.claimDurationInBlocks !== 0 && (
                    <BlockTiming
                      currentBlockHeight={launch.claimBlockStart}
                      targetBlockHeight={
                        launch.claimBlockStart + launch.claimDurationInBlocks
                      }
                      meanBlockTimeInSeconds={
                        blockTimeResponse.meanBlockTimeInSeconds
                      }
                      dontShowBlocksCount
                    />
                  )}
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Aleo credits ratio">
            <Row align="middle">
              <Col span={INPUT_SPAN}>
                <InputNumber
                  value={launch.ratio.toNumber()}
                  min={0}
                  onChange={(e) =>
                    setLaunch((l) => {
                      const updated = {
                        ...l,
                      };

                      updated.ratio = BigNumber(e || 1);
                      return updated;
                    })
                  }
                />
              </Col>
              <Col span={12} offset={4}>
                <Ratio
                  rightSymbol="ALEO"
                  rightDecimals={6}
                  leftSymbol={launch.token.symbol}
                  leftDecimals={launch.token.decimals}
                  ratioData={{ value: launch.ratio }}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Cap enabled">
            <Checkbox
              value={launch.flags.isCapEnabled}
              onChange={(e) =>
                setLaunch((l) => {
                  const updated = {
                    ...l,
                  };

                  updated.flags.isCapEnabled = e.target.checked;
                  return updated;
                })
              }
            />
          </Form.Item>
          <Form.Item label="Privacy">
            <Select
              value={flagsToValue(launch.flags)}
              onChange={(e) =>
                setLaunch((l) => {
                  const updated = {
                    ...l,
                  };

                  const updatedFlags = valueToFlags(e);

                  updated.flags.isPrivateSellsEnabled =
                    updatedFlags.isPrivateSellsEnabled;
                  updated.flags.isPublicSellsEnabled =
                    updatedFlags.isPublicSellsEnabled;
                  return updated;
                })
              }
            >
              <Select.Option value="mixed">Mixed</Select.Option>
              <Select.Option value="private">Private</Select.Option>
              <Select.Option value="public">Public</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Row justify="center">
              <Button type="primary" onClick={onSetUpClick} disabled={!enabled}>
                Setup
              </Button>
            </Row>
            {blocker && (
              <Row>
                <Typography.Text type="danger">{blocker}</Typography.Text>
              </Row>
            )}
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

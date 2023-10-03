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
  notification,
} from "antd";
import BigNumber from "bignumber.js";
import { useCallback, useEffect, useState } from "react";

import { BlockTiming, Ratio } from "shared/ui";
import { useMeanBlockTime } from "shared/web3";

interface NewLaunch {
  token: {
    name: string;
    symbol: string;
    decimals: number;
  };
  sellBlockStart: number;
  sellDurationInBlocks: number;
  claimBlockStart: number;
  claimDurationInBlocks: false | number;
  ratio: BigNumber;
  flags: {
    isCapEnabled: boolean;
    isPublicSellsEnabled: boolean;
    isPrivateSellsEnabled: boolean;
  };
}

function valueToFlags(
  privacy: "mixed" | "public" | "private"
): Pick<NewLaunch["flags"], "isPrivateSellsEnabled" | "isPublicSellsEnabled"> {
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
    NewLaunch["flags"],
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

const defaultLaunch = (currentBlockNumber: number): NewLaunch => ({
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
  const { blockHeight, meanBlockTimeInSeconds, error } = useMeanBlockTime();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (error) {
      api.error({
        message: "Block height fetch error",
        description: error,
      });
    }
  }, [error]);

  const [launch, setLaunch] = useState(defaultLaunch(blockHeight || 1000000));

  const onCurrentBlockClick = useCallback(() => {
    if (blockHeight) {
      setLaunch({
        ...launch,
        sellBlockStart: blockHeight,
      });
    }
  }, [blockHeight, launch]);

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
                {blockHeight && meanBlockTimeInSeconds && (
                  <BlockTiming
                    currentBlockHeight={blockHeight}
                    targetBlockHeight={launch.sellBlockStart}
                    meanBlockTimeInSeconds={meanBlockTimeInSeconds}
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
                {meanBlockTimeInSeconds && (
                  <BlockTiming
                    currentBlockHeight={launch.sellBlockStart}
                    targetBlockHeight={
                      launch.sellBlockStart + launch.sellDurationInBlocks
                    }
                    meanBlockTimeInSeconds={meanBlockTimeInSeconds}
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
                {blockHeight && meanBlockTimeInSeconds && (
                  <BlockTiming
                    currentBlockHeight={blockHeight}
                    targetBlockHeight={launch.claimBlockStart}
                    meanBlockTimeInSeconds={meanBlockTimeInSeconds}
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
                {meanBlockTimeInSeconds &&
                  launch.claimDurationInBlocks &&
                  launch.claimDurationInBlocks !== 0 && (
                    <BlockTiming
                      currentBlockHeight={launch.claimBlockStart}
                      targetBlockHeight={
                        launch.claimBlockStart + launch.claimDurationInBlocks
                      }
                      meanBlockTimeInSeconds={meanBlockTimeInSeconds}
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
            <Button type="primary">Setup</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

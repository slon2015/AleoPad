import React from "react";
import { Button, Row, Space } from "antd";

type ModeOptions = "public" | "private";

interface BuyModeProps {
  currentMode: ModeOptions;
  selectMode(mode: ModeOptions): void;
}

export default function BuyMode({ selectMode, currentMode }: BuyModeProps) {
  function onSelectMode(mode: ModeOptions) {
    selectMode(mode);
  }

  return (
    <Row justify="center">
      <Space.Compact>
        <Button
          type={currentMode === "public" ? "primary" : "default"}
          onClick={() => onSelectMode("public")}
        >
          Public
        </Button>
        <Button
          type={currentMode === "private" ? "primary" : "default"}
          onClick={() => onSelectMode("private")}
        >
          Private
        </Button>
      </Space.Compact>
    </Row>
  );
}

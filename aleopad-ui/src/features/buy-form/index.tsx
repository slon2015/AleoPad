import { Field, useBuyTickets } from "shared/web3";

import { BuyPublicForm } from "./buy-public";
import { BuyPrivateForm } from "./buy-private";
import { Row, Skeleton, Space } from "antd";
import { useState } from "react";
import BuyMode from "./buy-mode";

interface BuyFormProps {
  privacy: "private" | "public" | "mixed";
  launchId: string | Field;
}

export default function BuyForm({ privacy, launchId }: BuyFormProps) {
  const [mode, selectMode] = useState<"public" | "private">("public");
  const buy = useBuyTickets(launchId);

  const isBothModesEnabled = privacy === "mixed";

  if (buy.loading || !buy.enabled) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  const onModeChange = (mode: "public" | "private") => {
    selectMode(mode);
    if (mode === "public") {
      buy.setSelectedPayment("public");
    }
  };

  return (
    <>
      <Space direction="vertical">
        {isBothModesEnabled && (
          <BuyMode selectMode={onModeChange} currentMode={mode} />
        )}
        <Row justify="center">
          {mode === "public" ? (
            <BuyPublicForm
              amount={buy.creditsAmount}
              setAmount={buy.setCreditsAmount}
              buy={buy.mutation.mutate}
              enabled={!buy.mutation.isLoading}
              blocker={buy.getBlocker()}
              publicBalance={buy.amounts.publicAmount}
              showTitle={!isBothModesEnabled}
            />
          ) : (
            <BuyPrivateForm
              amount={buy.creditsAmount}
              setAmount={buy.setCreditsAmount}
              buy={buy.mutation.mutate}
              enabled={!buy.mutation.isLoading}
              blocker={buy.getBlocker()}
              selectedRecord={
                typeof buy.selectedPayment === "object"
                  ? buy.selectedPayment
                  : undefined
              }
              selectRecord={buy.setSelectedPayment}
              records={buy.amounts.privateRecords}
              showTitle={!isBothModesEnabled}
            />
          )}
        </Row>
      </Space>
    </>
  );
}

import { divideToDecimals, fieldToText, useClaimTicket } from "shared/web3";

import { Button, Form, Row, Skeleton, Space, Typography } from "antd";
import { TicketRecordsList } from "./ticket-records-list";

interface ClaimFormProps {
  launchId: string;
  tokenId: string;
}

export default function BuyForm({ launchId, tokenId }: ClaimFormProps) {
  const claim = useClaimTicket(launchId, tokenId);

  if (claim.loading || !claim.enabled) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <>
      <Space direction="vertical">
        <Form title="Claim token" layout="vertical">
          <Form.Item>
            <Typography.Text
              onClick={() => claim.selectTicket("public")}
              mark={claim.selectedTicket === "public"}
            >
              Public ticket amount:{" "}
              {divideToDecimals(claim.publicTicketAmount, claim.token.decimals)
                .dp(2)
                .toString()}{" "}
              {fieldToText(claim.token.symbol)}
            </Typography.Text>
          </Form.Item>
          <Form.Item>
            <TicketRecordsList
              records={claim.records}
              onRecordClick={(r) => claim.selectTicket(r)}
              selectedRecord={
                typeof claim.selectedTicket === "object"
                  ? claim.selectedTicket
                  : undefined
              }
              symbol={fieldToText(claim.token.symbol)}
            />
          </Form.Item>
          <Form.Item>
            <Row justify="center">
              <Button
                type="primary"
                disabled={
                  !claim.enabled && !claim.blocker && !claim.mutation.isLoading
                }
                onClick={() => claim.mutation.mutate()}
              >
                Claim
              </Button>
            </Row>
            {claim.blocker && (
              <Row>
                <Typography.Text type="danger">{claim.blocker}</Typography.Text>
              </Row>
            )}
          </Form.Item>
        </Form>
      </Space>
    </>
  );
}

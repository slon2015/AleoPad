import { fieldToText, useClaimTicket } from "shared/web3";

import { Button, Form, Row, Skeleton, Space, Typography } from "antd";
import { TicketRecordsList } from "./ticket-records-list";
import ClaimMode from "./claim-mode";

interface ClaimFormProps {
  launchId: string;
  tokenId: string;
}

export function ClaimFromListForm({ launchId, tokenId }: ClaimFormProps) {
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
            <ClaimMode
              currentMode={claim.privacy}
              selectMode={(m) => claim.setPrivacy(m)}
            />
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

import {
  TicketRecord,
  fieldToText,
  useClaimTicketForTicketsList,
  useToken,
} from "shared/web3";

import { Button, Form, Row, Skeleton, Space, Typography } from "antd";
import ClaimMode from "./claim-mode";
import { Amount } from "shared/ui";
import { TxResult } from "./tx-result";

interface ClaimFormProps {
  ticket: TicketRecord;
  tokenId: string;
}

export function ClaimSelectedTicketForm({ ticket, tokenId }: ClaimFormProps) {
  const claim = useClaimTicketForTicketsList(
    tokenId,
    TxResult.bind(null, tokenId),
    ticket
  );
  const token = useToken(tokenId);

  if (claim.loading || !claim.enabled || !token.data) {
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
            <Typography.Text>
              You will receive{" "}
              <Amount
                amount={ticket.amount}
                decimals={token.data!.decimals}
                symbol={fieldToText(token.data!.symbol)}
              />
            </Typography.Text>
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

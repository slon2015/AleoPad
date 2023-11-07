import { Card, List } from "antd";
import { TicketRow } from "entities/ticket";
import { useState } from "react";
import { TicketRecord, useBlockHeight, useTicketsList } from "shared/web3";
import { ClaimModal } from "widgets/claim-modal";

type Ticket = Parameters<typeof TicketRow>[0];

const TicketsListPage = () => {
  const tickets = useTicketsList();
  const blockHeight = useBlockHeight();

  const [selectedTicket, setSelectedTicket] = useState<
    (TicketRecord & { tokenId: string }) | undefined
  >();

  const list: Array<Ticket> =
    !tickets.loading && typeof blockHeight.blockHeight === "number"
      ? tickets.items.map((i) => ({
          ...i,
          currentBlockHeight: blockHeight.blockHeight!,
          onClaimClick: (tokenId: string) => {
            setSelectedTicket({ ...i, tokenId });
          },
        }))
      : [];

  return (
    <Card title="Tickets">
      {selectedTicket && (
        <ClaimModal
          ticket={selectedTicket}
          tokenId={selectedTicket.tokenId}
          onModalClose={() => setSelectedTicket(undefined)}
        />
      )}
      <List
        bordered
        dataSource={list}
        renderItem={(t) => (
          <List.Item>
            <TicketRow {...t} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TicketsListPage;

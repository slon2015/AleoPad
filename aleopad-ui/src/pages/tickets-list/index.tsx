import { Card, List } from "antd";
import { TicketRow } from "entities/ticket";
import { useBlockHeight, useTicketsList } from "shared/web3";

const TicketsListPage = () => {
  const tickets = useTicketsList();
  const blockHeight = useBlockHeight();

  const list: Array<Parameters<typeof TicketRow>[0]> =
    !tickets.loading && typeof blockHeight.blockHeight === "number"
      ? tickets.items.map((i) => ({
          ...i,
          currentBlockHeight: blockHeight.blockHeight!,
        }))
      : [];

  return (
    <Card title="Tickets">
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

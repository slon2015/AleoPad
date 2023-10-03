import { Card, List } from "antd";
import { TicketRow } from "entities/ticket";

const tickets: Array<Parameters<typeof TicketRow>[0]> = [
  {
    amount: "10000",
    isClaimable: false,
    launchId: "1",
    tokenName: "AleoPad Token",
    tokenSymbol: "ALPDT",
  },
  {
    amount: "35000",
    isClaimable: false,
    launchId: "1",
    tokenName: "AleoPad Token",
    tokenSymbol: "ALPDT",
  },
  {
    amount: "0",
    isClaimable: false,
    launchId: "1",
    tokenName: "AleoPad Token",
    tokenSymbol: "ALPDT",
  },
  {
    amount: "5000",
    isClaimable: true,
    launchId: "3",
    tokenName: "Some token 2",
    tokenSymbol: "SMTN2",
  },
];

const TicketsListPage = () => {
  return (
    <Card title="Tickets">
      <List
        bordered
        dataSource={tickets}
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

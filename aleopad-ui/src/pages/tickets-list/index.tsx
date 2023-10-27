import { Card, List } from "antd";
import { TicketRow } from "entities/ticket";

const tickets: Array<Parameters<typeof TicketRow>[0]> = [
  {
    amount: "1e12",
    isClaimable: false,
    launchId: "1",
    tokenName: "AleoPad Token",
    tokenSymbol: "ALPDT",
    tokenDecimals: 8,
  },
  {
    amount: "3.5e10",
    isClaimable: false,
    launchId: "1",
    tokenName: "AleoPad Token",
    tokenSymbol: "ALPDT",
    tokenDecimals: 8,
  },
  {
    amount: "0",
    isClaimable: false,
    launchId: "1",
    tokenName: "AleoPad Token",
    tokenSymbol: "ALPDT",
    tokenDecimals: 8,
  },
  {
    amount: "5e20",
    isClaimable: true,
    launchId: "3",
    tokenName: "Some token 2",
    tokenSymbol: "SMTN2",
    tokenDecimals: 18,
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

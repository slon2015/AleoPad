import { List, Typography } from "antd";
import { divideToDecimals, TicketRecord } from "shared/web3";

export interface CreditRecordsListProps {
  records: Array<TicketRecord>;
  onRecordClick: (record: TicketRecord) => void;
  selectedRecord?: TicketRecord;
  symbol: string;
}

export const TicketRecordsList = ({
  records,
  onRecordClick,
  selectedRecord,
  symbol,
}: CreditRecordsListProps) => {
  return (
    <List
      bordered
      header={
        <Typography.Title level={3}>Private ticket records</Typography.Title>
      }
      dataSource={records}
      renderItem={(record) => (
        <List.Item onClick={() => onRecordClick(record)}>
          <Typography.Text type="secondary" mark={selectedRecord === record}>
            {divideToDecimals(record.amount, 6).dp(2).toString()} {symbol}
          </Typography.Text>
        </List.Item>
      )}
    />
  );
};

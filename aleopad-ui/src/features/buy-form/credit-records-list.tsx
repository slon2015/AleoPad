import { List, Typography } from "antd";
import { divideToDecimals, CreditsRecord } from "shared/web3";

export interface CreditRecordsListProps {
  records: Array<CreditsRecord>;
  onRecordClick: (record: CreditsRecord) => void;
  selectedRecord?: CreditsRecord;
}

export const CreditRecordsList = ({
  records,
  onRecordClick,
  selectedRecord,
}: CreditRecordsListProps) => {
  return (
    <List
      bordered
      header={
        <Typography.Title level={3}>Credit private records</Typography.Title>
      }
      dataSource={records}
      renderItem={(record) => (
        <List.Item onClick={() => onRecordClick(record)}>
          <Typography.Text type="secondary" mark={selectedRecord === record}>
            {divideToDecimals(record.amount, 6).dp(2).toString()} CREDITs
          </Typography.Text>
        </List.Item>
      )}
    />
  );
};

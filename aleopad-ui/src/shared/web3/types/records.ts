export type OnchainRecord<T extends object> = {
  id: string;
  program_id: string;
  microcredits: string;
  spent: boolean;
  type: string;
  data: T;
};

export type OnchainCreditRecord = OnchainRecord<{
  owner: string;
  microcredits: string;
}>;

export type OnchainTicketRecord = OnchainRecord<{
  owner: string;
  launch_id: string;
  amount: string;
}>;

export type OnchainAleopadLaunchAdministartionRecord = OnchainRecord<{
  owner: string;
  launch_id: string;
  cap_commit_rand: string;
}>;

export type OnchainCapRecord = OnchainRecord<{
  owner: string;
  launch_id: string;
  amount_to_buy: string;
}>;

import { U128, U64 } from "shared/web3/common";
import { OnchainAleopadLaunchAdministartionRecord } from "shared/web3/types";

export type GrantCapContext = {
  grantee: string;
  amount: U128;
  record: OnchainAleopadLaunchAdministartionRecord;
  feeCredits: U64;
};

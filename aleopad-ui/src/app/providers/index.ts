import compose from "compose-function";
import { withRouter } from "./with-router";
import { withWallet } from "./with-wallet";
import { withQuery } from "./with-query";
import { withAwaitModal } from "./with-await-modal";

export const withProviders = compose(
  withRouter,
  withQuery,
  withWallet,
  withAwaitModal
);

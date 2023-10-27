import compose from "compose-function";
import { withRouter } from "./with-router";
import { withWallet } from "./with-wallet";
import { withQuery } from "./with-query";

export const withProviders = compose(withRouter, withQuery, withWallet);

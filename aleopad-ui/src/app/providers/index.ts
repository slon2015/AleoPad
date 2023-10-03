import compose from "compose-function";
import { withRouter } from "./with-router";
import { withWallet } from "./with-wallet";

export const withProviders = compose(withRouter, withWallet);

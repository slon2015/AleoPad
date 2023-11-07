import { Loader } from "app/loader";
import { Suspense } from "react";
import { HashRouter } from "react-router-dom";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <HashRouter>
      <Suspense fallback={<Loader />}>{component()}</Suspense>
    </HashRouter>
  );

import React from "react";

import { Routing } from "pages";
import { Layout } from "antd";

import { withProviders } from "./providers";
import "./index.scss";
import AppHeader from "./header";
import { AppContent } from "./content";

function App() {
  return (
    <Layout>
      <AppHeader />
      <AppContent>
        <Routing />
      </AppContent>
    </Layout>
  );
}

export default withProviders(App);

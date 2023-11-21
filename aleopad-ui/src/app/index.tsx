import React from "react";

import { Routing } from "pages";
import { Layout } from "antd";

import { withProviders } from "./providers";
import "./index.scss";
import AppHeader from "./header";
import { AppContent } from "./content";
import AppFooter from "./footer";

function App() {
  return (
    <Layout>
      <AppHeader />
      <AppContent>
        <Routing />
      </AppContent>
      <AppFooter />
    </Layout>
  );
}

export default withProviders(App);

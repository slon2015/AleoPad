import { Layout, Spin } from "antd";
import { AppContent } from "app/content";

export function Loader() {
  return (
    <Layout>
      <AppContent>
        <Spin tip="Loading..." size="large" />
      </AppContent>
    </Layout>
  );
}

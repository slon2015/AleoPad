import { GithubOutlined, TwitterOutlined } from "@ant-design/icons";
import { Layout, Row, Space, Typography } from "antd";

const { Footer } = Layout;

function AppFooter() {
  return (
    <Footer>
      <Row>
        <Typography.Title level={4}>Contacts</Typography.Title>
      </Row>
      <Row>
        <Space direction="vertical">
          <Typography.Link
            type="secondary"
            href="https://github.com/slon2015/AleoPad"
          >
            <GithubOutlined size={32} /> Github
          </Typography.Link>
          <Typography.Link
            type="secondary"
            href="https://twitter.com/aleopad_com"
          >
            <TwitterOutlined size={32} /> Twitter
          </Typography.Link>
        </Space>
      </Row>
    </Footer>
  );
}

export default AppFooter;

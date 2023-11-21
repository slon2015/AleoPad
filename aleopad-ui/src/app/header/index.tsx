import { Button, Col, Layout, Row, Space } from "antd";
import { useNavigate } from "react-router";
import { useWallet } from "shared/web3";
import ConnectButton from "widgets/connect-button";

const { Header } = Layout;

function AppHeader() {
  const navigate = useNavigate();
  const wallet = useWallet();

  return (
    <Header>
      <Row>
        <Col span={22}>
          <Space>
            <Button type="link" onClick={() => navigate("/")}>
              Launches
            </Button>
            <Button type="link" onClick={() => navigate("/tokens")}>
              Tokens
            </Button>
            {wallet.connected && (
              <>
                <Button type="link" onClick={() => navigate("/tickets")}>
                  Tickets
                </Button>
                <Button type="link" onClick={() => navigate("/manage")}>
                  Create launch
                </Button>
              </>
            )}
          </Space>
        </Col>
        <Col span={2}>
          <Space>
            <ConnectButton />
          </Space>
        </Col>
      </Row>
    </Header>
  );
}

export default AppHeader;

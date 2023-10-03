import { Layout, Card } from "antd";
import { PropsWithChildren } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

const { Content } = Layout;

export function AppContent({ children }: PropsWithChildren) {
  return (
    <Content className={cn("App", styles.AppRoot)}>
      <Card className={cn(styles.AppCard)}>{children}</Card>
    </Content>
  );
}

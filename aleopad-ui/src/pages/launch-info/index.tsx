import { useParams } from "react-router";
import { LaunchCard } from "widgets/launch-card";

const LaunchPage = () => {
  const { id } = useParams();
  return <LaunchCard launchId={id!} />;
};

export default LaunchPage;

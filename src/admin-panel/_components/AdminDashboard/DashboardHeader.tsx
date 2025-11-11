import { PanelHeader } from "../AdminLayout";

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  return <PanelHeader title={title} description={description} />;
};

export default DashboardHeader;

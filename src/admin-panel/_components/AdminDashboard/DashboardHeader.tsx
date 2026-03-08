import { RefreshCw } from "lucide-react";
import { PanelHeader } from "../AdminLayout";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  title: string;
  description: string;
  onRefresh?: () => void;
  loading?: boolean;
}

const DashboardHeader = ({
  title,
  description,
  onRefresh,
  loading,
}: DashboardHeaderProps) => {
  return (
    <PanelHeader
      title={title}
      description={description}
      action={
        onRefresh ? (
          <Button
            variant="outline"
            size="icon"
            onClick={onRefresh}
            disabled={loading}
            title="Odśwież dashboard"
          >
            <RefreshCw
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
          </Button>
        ) : undefined
      }
    />
  );
};

export default DashboardHeader;

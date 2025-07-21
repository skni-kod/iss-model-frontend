import { Satellite, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type ConnectionStatus = "connected" | "disconnected" | "error";

function Header() {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("disconnected");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate fetching data
  const fetchData = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Satellite className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold">
              ISS Tracker Dashboard
            </h1>
            <p className="text-blue-200">
              Śledzenie Międzynarodowej Stacji Kosmicznej
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge
            variant={
              connectionStatus === "connected" ? "default" : "destructive"
            }
            className={connectionStatus === "connected" ? "bg-green-600" : ""}
          >
            {connectionStatus === "connected" ? "Połączono" : "Błąd połączenia"}
          </Badge>

          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Odśwież
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;

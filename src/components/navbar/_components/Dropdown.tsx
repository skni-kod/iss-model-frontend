import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Activity, ChevronDown, RefreshCw } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  CONNECTION_STATUS_CONFIG,
  type ConnectionStatus,
} from "../types/types";

interface InneDropdownProps {
  connectionStatus: ConnectionStatus;
  isLoading: boolean;
  onRefresh: () => void;
}

export const InneDropdown = ({
  connectionStatus,
  isLoading,
  onRefresh,
}: InneDropdownProps) => {
  const location = useLocation();
  const isActive = location.pathname === "/other";
  const statusConfig = CONNECTION_STATUS_CONFIG[connectionStatus];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`
              relative px-4 py-3 transition-all duration-300 group
              ${
                isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
              }
              focus:outline-none focus:text-gray-900 flex items-center gap-2
            `}
        >
          <div className="flex items-center gap-2">
            <Activity
              className={`h-4 w-4 transition-all duration-300 ${
                isActive
                  ? "text-gray-900"
                  : "text-gray-500 group-hover:text-gray-700"
              }`}
            />
            <span className="font-medium text-sm">Inne</span>
            <ChevronDown
              className={`h-3 w-3 transition-all duration-300 ${
                isActive
                  ? "text-gray-900"
                  : "text-gray-500 group-hover:text-gray-700"
              }`}
            />
          </div>

          {/* Underline animation */}
          <div
            className={`
                absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all duration-300
                ${
                  isActive
                    ? "w-full opacity-100"
                    : "w-0 group-hover:w-full opacity-100"
                }
              `}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link
            to="/other"
            className="grid grid-cols-[20px_1fr_auto] gap-2 items-center w-full"
          >
            <Activity className="h-4 w-4 justify-self-center" />
            <span>Inne opcje</span>
            <div></div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="grid grid-cols-[20px_1fr_auto] gap-2 items-center">
          <div
            className={`
                  w-2 h-2 rounded-full transition-colors duration-300 flex-shrink-0 justify-self-center
                  ${statusConfig.dotColor}
                `}
          />
          <span className="text-sm">Status połączenia</span>
          <Badge
            variant={statusConfig.variant}
            className={`
                ${statusConfig.badgeClass} 
                border font-medium text-xs px-2 py-1
              `}
          >
            {statusConfig.text}
          </Badge>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onRefresh}
          disabled={isLoading}
          className={`grid grid-cols-[20px_1fr_auto] gap-2 items-center ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <RefreshCw
            className={`h-4 w-4 transition-transform duration-500 justify-self-center ${
              isLoading ? "animate-spin" : ""
            }`}
          />
          <span>Odśwież dane</span>
          <div></div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

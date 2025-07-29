import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Activity, ChevronDown, RefreshCw } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  CONNECTION_STATUS_CONFIG,
  type ConnectionStatus,
} from "../types/types";
import { OptionsCollapsible } from "./OptionsCollapsible";

// Animation and style constants
const ANIMATION_CONFIG = {
  DURATION: 300,
  ICON_TRANSITION: 300,
  UNDERLINE_TRANSITION: 300,
  REFRESH_SPIN: 500,
} as const;

const DROPDOWN_STYLES = {
  trigger:
    "relative px-4 py-3 transition-all group block w-full lg:w-auto focus:outline-none focus:text-gray-900 flex items-center gap-2",
  triggerActive: "text-gray-900",
  triggerInactive: "text-gray-600 hover:text-gray-900",
  underline: "absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all",
  underlineActive: "w-full opacity-100",
  underlineInactive: "w-0 group-hover:w-full opacity-100",
  statusGrid: "grid grid-cols-[20px_1fr_auto] gap-2 items-center",
  refreshGrid: "grid grid-cols-[20px_1fr_auto] gap-2 items-center",
} as const;

interface OptionsDropdownProps {
  connectionStatus: ConnectionStatus;
  isLoading: boolean;
  onRefresh: () => void;
}

export const OptionsDropdown = ({
  connectionStatus,
  isLoading,
  onRefresh,
}: OptionsDropdownProps) => {
  const location = useLocation();
  const isActive =
    location.pathname === "/other" || location.pathname === "/knowledge-base";
  const statusConfig = CONNECTION_STATUS_CONFIG[connectionStatus];

  const getTriggerClasses = () => {
    return `${DROPDOWN_STYLES.trigger} ${
      isActive ? DROPDOWN_STYLES.triggerActive : DROPDOWN_STYLES.triggerInactive
    }`;
  };

  const getIconClasses = () => {
    return `h-4 w-4 transition-all ${
      isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"
    }`;
  };

  const getChevronClasses = () => {
    return `h-3 w-3 transition-all ${
      isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"
    }`;
  };

  const getUnderlineClasses = () => {
    return `${DROPDOWN_STYLES.underline} ${
      isActive
        ? DROPDOWN_STYLES.underlineActive
        : DROPDOWN_STYLES.underlineInactive
    }`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={getTriggerClasses()}
          style={{ transitionDuration: `${ANIMATION_CONFIG.DURATION}ms` }}
        >
          <div className="flex items-center gap-2">
            <Activity
              className={getIconClasses()}
              style={{
                transitionDuration: `${ANIMATION_CONFIG.ICON_TRANSITION}ms`,
              }}
            />
            <span className="font-medium text-sm">Inne</span>
            <ChevronDown
              className={getChevronClasses()}
              style={{
                transitionDuration: `${ANIMATION_CONFIG.ICON_TRANSITION}ms`,
              }}
            />
          </div>

          {/* Underline animation */}
          <div
            className={getUnderlineClasses()}
            style={{
              transitionDuration: `${ANIMATION_CONFIG.UNDERLINE_TRANSITION}ms`,
            }}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="p-1">
          <OptionsCollapsible variant="desktop" />
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem className={DROPDOWN_STYLES.statusGrid}>
          <div
            className={`w-2 h-2 rounded-full transition-colors flex-shrink-0 justify-self-center ${statusConfig.dotColor}`}
            style={{ transitionDuration: `${ANIMATION_CONFIG.DURATION}ms` }}
          />
          <span className="text-sm">Status połączenia</span>
          <Badge
            variant={statusConfig.variant}
            className={`${statusConfig.badgeClass} border font-medium text-xs px-2 py-1`}
          >
            {statusConfig.text}
          </Badge>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onRefresh}
          disabled={isLoading}
          className={`${DROPDOWN_STYLES.refreshGrid} ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <RefreshCw
            className={`h-4 w-4 justify-self-center ${
              isLoading ? "animate-spin" : ""
            }`}
            style={{
              transitionDuration: `${ANIMATION_CONFIG.REFRESH_SPIN}ms`,
              transitionProperty: "transform",
            }}
          />
          <span>Odśwież dane</span>
          <div></div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Activity, RefreshCw, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  CONNECTION_STATUS_CONFIG,
  type ConnectionStatus,
} from "../types/types";
import { OptionsCollapsible } from "./OptionsCollapsible";

// Constants for styles and animations
const ANIMATION_DURATION = {
  DEFAULT: 200,
  ICON_ROTATION: 200,
  STATUS_DOT: 300,
  REFRESH_SPIN: 300,
} as const;

const MOBILE_STYLES = {
  container: "pt-2",
  trigger:
    "relative px-4 py-3 transition-all group block w-full text-left rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50",
  content:
    "pl-4 space-y-2 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up",
  statusContainer: "flex items-center gap-3 px-4 py-3 rounded-lg",
  refreshButton:
    "flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-all",
  refreshButtonEnabled: "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
  refreshButtonDisabled: "opacity-50 cursor-not-allowed",
} as const;

interface MobileOptionsMenuProps {
  connectionStatus: ConnectionStatus;
  isLoading: boolean;
  onRefresh: () => void;
  onClose: () => void;
}

export const MobileOptionsMenu = ({
  connectionStatus,
  isLoading,
  onRefresh,
  onClose,
}: MobileOptionsMenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusConfig = CONNECTION_STATUS_CONFIG[connectionStatus];

  const handleToggle = (open: boolean) => {
    setIsExpanded(open);
  };

  const getRefreshButtonStyles = () => {
    return `${MOBILE_STYLES.refreshButton} ${
      isLoading
        ? MOBILE_STYLES.refreshButtonDisabled
        : MOBILE_STYLES.refreshButtonEnabled
    }`;
  };

  return (
    <div className={MOBILE_STYLES.container}>
      {/* Options collapsible menu */}
      <Collapsible open={isExpanded} onOpenChange={handleToggle}>
        <CollapsibleTrigger asChild>
          <button
            className={MOBILE_STYLES.trigger}
            style={{ transitionDuration: `${ANIMATION_DURATION.DEFAULT}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity
                  className="h-4 w-4 text-gray-500 group-hover:text-gray-700"
                  style={{
                    transitionDuration: `${ANIMATION_DURATION.DEFAULT}ms`,
                    transitionProperty: "all",
                  }}
                />
                <span className="font-medium text-sm">Options</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
                style={{
                  transitionDuration: `${ANIMATION_DURATION.ICON_ROTATION}ms`,
                }}
              />
            </div>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className={MOBILE_STYLES.content}>
          <OptionsCollapsible variant="mobile" onLinkClick={onClose} />

          {/* Connection status */}
          <div className={MOBILE_STYLES.statusContainer}>
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${statusConfig.dotColor}`}
              style={{
                transitionDuration: `${ANIMATION_DURATION.STATUS_DOT}ms`,
              }}
            />
            <span className="text-sm text-gray-600 flex-1">
              Connection Status
            </span>
            <Badge
              variant={statusConfig.variant}
              className={`${statusConfig.badgeClass} border font-medium text-xs px-2 py-1`}
            >
              {statusConfig.text}
            </Badge>
          </div>

          {/* Refresh data */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className={getRefreshButtonStyles()}
            style={{ transitionDuration: `${ANIMATION_DURATION.DEFAULT}ms` }}
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              style={{
                transitionDuration: `${ANIMATION_DURATION.REFRESH_SPIN}ms`,
                transitionProperty: "transform",
              }}
            />
            <span className="text-sm">Refresh Data</span>
          </button>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

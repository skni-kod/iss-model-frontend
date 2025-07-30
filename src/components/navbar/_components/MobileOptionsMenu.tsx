import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Activity, ChevronDown, Book } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Contants for styles and animations
const ANIMATION_DURATION = {
  DEFAULT: 200,
  ICON_ROTATION: 200,
} as const;

const MOBILE_STYLES = {
  container: "pt-2",
  trigger:
    "relative px-4 py-3 transition-all group block w-full text-left rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50",
  content:
    "pl-4 space-y-2 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up",
  menuItem:
    "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200",
} as const;

interface MobileOptionsMenuProps {
  onClose: () => void;
}

export const MobileOptionsMenu = ({ onClose }: MobileOptionsMenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (open: boolean) => {
    setIsExpanded(open);
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
                <span className="font-medium text-sm">Inne</span>
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
          {/* Knowledge Base Link */}
          <Link
            to="/knowledge-base"
            onClick={onClose}
            className={MOBILE_STYLES.menuItem}
          >
            <Book className="h-4 w-4" />
            <span className="text-sm">Baza wiedzy</span>
          </Link>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

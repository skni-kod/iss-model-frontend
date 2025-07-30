import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Activity, ChevronDown, Book } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
  menuItem:
    "flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-100 cursor-pointer",
} as const;

export const OptionsDropdown = () => {
  const location = useLocation();
  const isActive =
    location.pathname === "/other" || location.pathname === "/knowledge-base";

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
        <DropdownMenuItem asChild>
          <Link to="/knowledge-base" className={DROPDOWN_STYLES.menuItem}>
            <Book className="h-4 w-4" />
            <span>Baza wiedzy</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "../types/types";

// Animation and style constants
const ANIMATION_CONFIG = {
  DURATION: 300,
  ICON_TRANSITION: 300,
  UNDERLINE_TRANSITION: 300,
} as const;

const NAV_BUTTON_STYLES = {
  container:
    "relative px-4 py-3 transition-all group block w-full lg:w-auto rounded-lg focus:outline-none focus:text-gray-900 focus:bg-gray-50",
  containerActive: "text-gray-900 bg-gray-50",
  containerInactive: "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
  content: "flex items-center gap-2",
  icon: "h-4 w-4 transition-all",
  iconActive: "text-gray-900",
  iconInactive: "text-gray-500 group-hover:text-gray-700",
  label: "font-medium text-sm",
  underline: "absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all",
  underlineActive: "w-full opacity-100",
  underlineInactive: "w-0 group-hover:w-full opacity-100",
} as const;

interface NavButtonProps extends NavItem {
  onClick?: () => void;
}

export const NavButton = ({
  label,
  href,
  icon: Icon,
  onClick,
}: NavButtonProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  const getContainerClasses = () => {
    return `${NAV_BUTTON_STYLES.container} ${
      isActive
        ? NAV_BUTTON_STYLES.containerActive
        : NAV_BUTTON_STYLES.containerInactive
    }`;
  };

  const getIconClasses = () => {
    return `${NAV_BUTTON_STYLES.icon} ${
      isActive ? NAV_BUTTON_STYLES.iconActive : NAV_BUTTON_STYLES.iconInactive
    }`;
  };

  const getUnderlineClasses = () => {
    return `${NAV_BUTTON_STYLES.underline} ${
      isActive
        ? NAV_BUTTON_STYLES.underlineActive
        : NAV_BUTTON_STYLES.underlineInactive
    }`;
  };

  return (
    <Link
      to={href}
      onClick={onClick}
      className={getContainerClasses()}
      style={{ transitionDuration: `${ANIMATION_CONFIG.DURATION}ms` }}
    >
      <div className={NAV_BUTTON_STYLES.content}>
        <Icon
          className={getIconClasses()}
          style={{
            transitionDuration: `${ANIMATION_CONFIG.ICON_TRANSITION}ms`,
          }}
        />
        <span className={NAV_BUTTON_STYLES.label}>{label}</span>
      </div>

      {/* Underline animation */}
      <div
        className={getUnderlineClasses()}
        style={{
          transitionDuration: `${ANIMATION_CONFIG.UNDERLINE_TRANSITION}ms`,
        }}
      />
    </Link>
  );
};

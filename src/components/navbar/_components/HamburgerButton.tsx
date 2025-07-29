import { Menu, X } from "lucide-react";

// Animation and style constants
const ANIMATION_CONFIG = {
  BUTTON_DURATION: 200,
  ICON_DURATION: 300,
  TIMING_FUNCTION: "cubic-bezier(0.4, 0.0, 0.2, 1)",
} as const;

const HAMBURGER_STYLES = {
  button:
    "lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all hover:scale-105 active:scale-95",
  iconContainer: "relative w-6 h-6",
  icon: "h-6 w-6 absolute transition-all transform",
  menuIconOpen: "rotate-180 opacity-0 scale-75",
  menuIconClosed: "rotate-0 opacity-100 scale-100",
  xIconOpen: "rotate-0 opacity-100 scale-100",
  xIconClosed: "rotate-180 opacity-0 scale-75",
} as const;

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => {
  const getMenuIconClasses = () => {
    return `${HAMBURGER_STYLES.icon} ${
      isOpen ? HAMBURGER_STYLES.menuIconOpen : HAMBURGER_STYLES.menuIconClosed
    }`;
  };

  const getXIconClasses = () => {
    return `${HAMBURGER_STYLES.icon} ${
      isOpen ? HAMBURGER_STYLES.xIconOpen : HAMBURGER_STYLES.xIconClosed
    }`;
  };

  const iconStyle = {
    transitionDuration: `${ANIMATION_CONFIG.ICON_DURATION}ms`,
    transitionTimingFunction: ANIMATION_CONFIG.TIMING_FUNCTION,
  };

  return (
    <button
      className={HAMBURGER_STYLES.button}
      onClick={onClick}
      style={{ transitionDuration: `${ANIMATION_CONFIG.BUTTON_DURATION}ms` }}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className={HAMBURGER_STYLES.iconContainer}>
        <Menu className={getMenuIconClasses()} style={iconStyle} />
        <X className={getXIconClasses()} style={iconStyle} />
      </div>
    </button>
  );
};

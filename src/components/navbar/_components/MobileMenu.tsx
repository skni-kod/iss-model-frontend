import { type NavItem } from "../types/types";
import { MobileNavItem } from "./MobileNavItem";

// Animation configuration
const ANIMATION_CONFIG = {
  MENU_DURATION: 300,
  ITEM_STAGGER_DELAY: 50,
  BASE_DELAY: 50,
  TIMING_FUNCTION: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  BOUNCE_TIMING: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

const MENU_STYLES = {
  container: "lg:hidden overflow-hidden transition-all ease-out",
  containerOpen: "max-h-[32rem] opacity-100",
  containerClosed: "max-h-0 opacity-0",
  content: "mt-4 pt-4 border-t border-gray-100 transition-all transform",
  contentOpen: "translate-y-0",
  contentClosed: "-translate-y-4",
  itemsContainer: "space-y-2",
} as const;

interface MobileMenuProps {
  isOpen: boolean;
  leftNavItems: NavItem[];
  rightNavItems: NavItem[];
  onClose: () => void;
}

export const MobileMenu = ({
  isOpen,
  leftNavItems,
  rightNavItems,
  onClose,
}: MobileMenuProps) => {
  const getContainerClasses = () => {
    return `${MENU_STYLES.container} ${
      isOpen ? MENU_STYLES.containerOpen : MENU_STYLES.containerClosed
    }`;
  };

  const getContentClasses = () => {
    return `${MENU_STYLES.content} ${
      isOpen ? MENU_STYLES.contentOpen : MENU_STYLES.contentClosed
    }`;
  };

  const getItemAnimationStyle = (index: number) => ({
    transitionDelay: isOpen
      ? `${
          index * ANIMATION_CONFIG.ITEM_STAGGER_DELAY +
          ANIMATION_CONFIG.BASE_DELAY
        }ms`
      : "0ms",
    transitionTimingFunction: ANIMATION_CONFIG.BOUNCE_TIMING,
    transitionDuration: `${ANIMATION_CONFIG.MENU_DURATION}ms`,
  });

  const getItemClasses = () => {
    return `transition-all transform ${
      isOpen
        ? "opacity-100 translate-x-0 scale-100"
        : "opacity-0 -translate-x-8 scale-95"
    }`;
  };

  return (
    <div
      className={getContainerClasses()}
      style={{
        transitionTimingFunction: ANIMATION_CONFIG.TIMING_FUNCTION,
        transitionDuration: `${ANIMATION_CONFIG.MENU_DURATION}ms`,
      }}
    >
      <div
        className={getContentClasses()}
        style={{
          transitionTimingFunction: ANIMATION_CONFIG.BOUNCE_TIMING,
          transitionDuration: `${ANIMATION_CONFIG.MENU_DURATION}ms`,
        }}
      >
        <div className={MENU_STYLES.itemsContainer}>
          {/* Mobile Left Navigation Items */}
          {leftNavItems.map((item, index) => (
            <div
              key={item.label}
              className={getItemClasses()}
              style={getItemAnimationStyle(index)}
            >
              <MobileNavItem item={item} onClose={onClose} />
            </div>
          ))}

          {/* Mobile Right Navigation Items */}
          {rightNavItems.map((item, index) => (
            <div
              key={item.label}
              className={getItemClasses()}
              style={getItemAnimationStyle(leftNavItems.length + index)}
            >
              <MobileNavItem item={item} onClose={onClose} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

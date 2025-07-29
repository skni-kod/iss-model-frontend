import { Activity, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Style variants configuration
const VARIANT_STYLES = {
  mobile: {
    trigger:
      "flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200",
    content: "pl-8 space-y-2",
    link: "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200",
    iconGap: "gap-3",
    textSize: "text-sm",
  },
  desktop: {
    trigger:
      "flex items-center justify-between w-full px-2 py-2 text-sm rounded-sm hover:bg-gray-100 transition-colors duration-150",
    content: "pl-6 space-y-1",
    link: "flex items-center gap-2 px-2 py-2 text-sm rounded-sm hover:bg-gray-100 transition-colors duration-150",
    iconGap: "gap-2",
    textSize: "text-sm",
  },
} as const;

const ANIMATION_CONFIG = {
  TRANSITION_DURATION: 200,
  CHEVRON_DURATION: 200,
  MAX_HEIGHT: {
    expanded: "max-h-20 opacity-100",
    collapsed: "max-h-0 opacity-0",
  },
} as const;

interface OptionsCollapsibleProps {
  onLinkClick?: () => void;
  variant?: "mobile" | "desktop";
  knowledgeBaseUrl?: string;
}

export const OptionsCollapsible = ({
  onLinkClick,
  variant = "desktop",
  knowledgeBaseUrl = "/knowledge-base",
}: OptionsCollapsibleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const styles = VARIANT_STYLES[variant];

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const getContentClasses = () => {
    const baseClasses = `${styles.content} overflow-hidden transition-all ease-out`;
    const animationClasses = isExpanded
      ? ANIMATION_CONFIG.MAX_HEIGHT.expanded
      : ANIMATION_CONFIG.MAX_HEIGHT.collapsed;

    return `${baseClasses} ${animationClasses}`;
  };

  return (
    <div>
      <button
        className={styles.trigger}
        onClick={handleToggle}
        style={{
          transitionDuration: `${ANIMATION_CONFIG.TRANSITION_DURATION}ms`,
        }}
      >
        <div className={`flex items-center ${styles.iconGap}`}>
          <Activity className="h-4 w-4" />
          <span className={styles.textSize}>Inne opcje</span>
        </div>
        <ChevronDown
          className={`h-3 w-3 text-gray-500 transition-transform ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
          style={{
            transitionDuration: `${ANIMATION_CONFIG.CHEVRON_DURATION}ms`,
          }}
        />
      </button>

      <div
        className={getContentClasses()}
        style={{
          transitionDuration: `${ANIMATION_CONFIG.TRANSITION_DURATION}ms`,
          transitionProperty: "max-height, opacity",
        }}
      >
        <Link
          to={knowledgeBaseUrl}
          onClick={onLinkClick}
          className={styles.link}
        >
          <div className="w-2 h-2 rounded-full bg-gray-400" />
          <span className={styles.textSize}>Baza wiedzy</span>
        </Link>
      </div>
    </div>
  );
};

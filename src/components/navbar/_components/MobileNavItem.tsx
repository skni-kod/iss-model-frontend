import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { type NavItem } from "../types/types";
import { isAuthenticated } from "@/lib/auth";

interface MobileNavItemProps {
  item: NavItem;
  onClose: () => void;
}

export function MobileNavItem({ item, onClose }: MobileNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const filteredSubItems = item.subItems?.filter(
    (subItem) => !subItem.requiresAuth || isAuthenticated()
  );

  if (!filteredSubItems || filteredSubItems.length === 0) {
    // Simple nav item without dropdown
    return (
      <Link
        to={item.href || "#"}
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <item.icon className="h-5 w-5" />
        <span className="font-medium">{item.label}</span>
      </Link>
    );
  }

  // Nav item with dropdown
  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-5 w-5" />
          <span className="font-medium">{item.label}</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {isExpanded && (
        <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-4">
          {filteredSubItems.map((subItem) => (
            <Link
              key={subItem.label}
              to={subItem.href}
              onClick={onClose}
              className="flex items-start gap-3 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {subItem.icon && (
                <subItem.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <div className="font-medium">{subItem.label}</div>
                {subItem.description && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {subItem.description}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


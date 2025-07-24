import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "../types/types";

export const NavButton = ({ label, href, icon: Icon }: NavItem) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  return (
    <Link
      to={href}
      className={`
          relative px-4 py-3 transition-all duration-300 group
          ${isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}
          focus:outline-none focus:text-gray-900
        `}
    >
      <div className="flex items-center gap-2">
        <Icon
          className={`h-4 w-4 transition-all duration-300 ${
            isActive
              ? "text-gray-900"
              : "text-gray-500 group-hover:text-gray-700"
          }`}
        />
        <span className="font-medium text-sm">{label}</span>
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
    </Link>
  );
};

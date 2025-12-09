import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import type { NavItem } from "./types";

interface AdminMobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  onClose: () => void;
}

const AdminMobileMenu = ({
  isOpen,
  navItems,
  onClose,
}: AdminMobileMenuProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-black transition-opacity duration-300 ${
          isOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto flex flex-col">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">
              Panel Administracyjny
            </h1>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Return to Home Button - at the bottom */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-3 flex-shrink-0" />
              Powrót do strony głównej
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMobileMenu;

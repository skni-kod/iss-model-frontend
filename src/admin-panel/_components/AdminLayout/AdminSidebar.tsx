import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Menu } from "lucide-react";
import type { NavItem } from "./types";

interface AdminSidebarProps {
  navItems: NavItem[];
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

const AdminSidebar = ({
  navItems,
  onToggleMobileMenu,
  isMobileMenuOpen,
}: AdminSidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={onToggleMobileMenu}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
            aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link
            to="/admin"
            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Panel Administracyjny
          </Link>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white shadow-sm fixed left-0 top-0 h-screen">
        <nav className="px-6 flex flex-col h-full">
          {/* Panel Title */}
          <div className="pt-6 pb-4 border-b border-gray-200">
            <Link
              to="/admin"
              className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors block"
            >
              Panel Administracyjny
            </Link>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto pt-6 px-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
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
          </div>

          {/* Return to Home Button */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0 px-6">
            <Link
              to="/"
              className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-3 flex-shrink-0" />
              Powrót do strony głównej
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;

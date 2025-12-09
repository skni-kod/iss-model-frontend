import { User, Menu, X } from "lucide-react";

interface AdminHeaderProps {
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

const AdminHeader = ({
  isMobileMenuOpen,
  onToggleMobileMenu,
}: AdminHeaderProps) => {
  return (
    <header className="bg-gray-50 border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Hamburger Menu Button - visible on mobile */}
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
              aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <span className="text-xs sm:text-sm text-gray-700">
              Administrator
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

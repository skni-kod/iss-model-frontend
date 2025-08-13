import { Satellite } from "lucide-react";
import { Link } from "react-router-dom";

import { useState } from "react";

import { HamburgerButton } from "./_components/HamburgerButton";
import { MobileMenu } from "./_components/MobileMenu";
import { NavigationMenuDropdown } from "./_components/NavigationMenuDropdown";
import { NAV_CONFIG } from "./config/navConfig";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Overlay for dropdown */}
      {isDropdownOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in-0 duration-200" />
      )}

      <nav className="fixed top-0 left-0 right-0 z-50">
        <div
          className={`bg-white/95 backdrop-blur-lg border-b border-gray-100 transition-all duration-300 ${
            isMobileMenuOpen ? "shadow-lg" : "shadow-sm"
          }`}
        >
          <div className="container mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Desktop Left Navigation */}
              <div className="hidden lg:flex items-center gap-4">
                <NavigationMenuDropdown
                  items={NAV_CONFIG.leftItems}
                  onOpenChange={setIsDropdownOpen}
                />
              </div>

              {/* Center Logo */}
              <Link
                to="/"
                className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="relative">
                  <div className="p-3 bg-gray-900 rounded-2xl">
                    <Satellite className="h-6 w-6 lg:h-8 lg:w-8 text-white transform rotate-12" />
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-gray-900 text-xl lg:text-2xl font-semibold tracking-tight">
                    SKNI Space Tracker
                  </h1>
                  <p className="text-gray-600 text-xs lg:text-sm">
                    Śledzenie stacji kosmicznej
                  </p>
                </div>
              </Link>

              {/* Desktop Right Navigation */}
              <div className="hidden lg:flex items-center gap-4">
                <NavigationMenuDropdown
                  items={NAV_CONFIG.rightItems}
                  onOpenChange={setIsDropdownOpen}
                />
              </div>

              {/* Mobile Hamburger Button */}
              <HamburgerButton
                isOpen={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              />
            </div>

            {/* Mobile Menu */}
            <MobileMenu
              isOpen={isMobileMenuOpen}
              leftNavItems={NAV_CONFIG.leftItems}
              rightNavItems={NAV_CONFIG.rightItems}
              onClose={closeMobileMenu}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

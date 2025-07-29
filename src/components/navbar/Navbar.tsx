import { Satellite, Globe, Activity, Users } from "lucide-react";

import { useState } from "react";

import { type ConnectionStatus, type NavItem } from "./types/types";
import { NavButton } from "./_components/NavButton";
import { OptionsDropdown } from "./_components/OptionsDropdown";
import { HamburgerButton } from "./_components/HamburgerButton";
import { MobileMenu } from "./_components/MobileMenu";

// Navigation configuration
const NAV_CONFIG = {
  leftItems: [
    { label: "Przegląd", href: "/", icon: Globe },
    { label: "Telemetria", href: "/telemetry", icon: Activity },
  ] as NavItem[],
  rightItems: [
    { label: "Astronauci", href: "/astronauts", icon: Users },
  ] as NavItem[],
} as const;

// Simulation constants
const LOADING_SIMULATION_DURATION = 1500;

function Navbar() {
  const [connectionStatus] = useState<ConnectionStatus>("disconnected");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulate data fetching
  const handleRefreshData = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, LOADING_SIMULATION_DURATION);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="sticky top-0 z-50 mb-8">
      <div
        className={`bg-white/95 backdrop-blur-lg border-b border-gray-100 transition-all duration-300 ${
          isMobileMenuOpen ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Desktop Left Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_CONFIG.leftItems.map((item) => (
                <NavButton
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                />
              ))}
            </div>

            {/* Center Logo */}
            <div className="flex items-center gap-4">
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
            </div>

            {/* Desktop Right Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_CONFIG.rightItems.map((item) => (
                <NavButton
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                />
              ))}
              <OptionsDropdown
                connectionStatus={connectionStatus}
                isLoading={isLoading}
                onRefresh={handleRefreshData}
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
            connectionStatus={connectionStatus}
            isLoading={isLoading}
            onRefresh={handleRefreshData}
            onClose={closeMobileMenu}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

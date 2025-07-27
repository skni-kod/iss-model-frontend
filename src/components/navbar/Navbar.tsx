import { Satellite, Globe, Activity, Users } from "lucide-react";

import { useState } from "react";

import { type ConnectionStatus, type NavItem } from "./types/types";
import { NavButton } from "./_components/NavButton";
import { InneDropdown } from "./_components/Dropdown";

function Navbar() {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("disconnected");
  const [isLoading, setIsLoading] = useState(false);

  const leftNavItems: NavItem[] = [
    { label: "Przeglad", href: "/", icon: Globe },
    { label: "Telemetria", href: "/telemetry", icon: Activity },
  ];

  const rightNavItems: NavItem[] = [
    { label: "Astronauci", href: "/astronauts", icon: Users },
  ];

  // Simulate fetching data
  const fetchData = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <nav className="sticky top-0 z-50 mb-8">
      <div className="bg-white/95 backdrop-blur-lg border-b border-gray-100">
        <div className="container mx-auto max-w-7xl py-4">
          <div className="flex items-center justify-between">
            {/* Left Navigation */}
            <div className="flex items-center gap-8">
              {leftNavItems.map((item) => (
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
                  <Satellite className="h-8 w-8 text-white transform rotate-12" />
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-gray-900 text-2xl font-semibold tracking-tight">
                  ISS Tracker
                </h1>
                <p className="text-gray-600 text-sm">
                  Śledzenie stacji kosmicznej
                </p>
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-8">
              {rightNavItems.map((item) => (
                <NavButton
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                />
              ))}
              <InneDropdown
                connectionStatus={connectionStatus}
                isLoading={isLoading}
                onRefresh={handleRefresh}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import {
  Satellite,
  RefreshCw,
  Globe,
  Activity,
  Users,
  type LucideIcon,
} from "lucide-react";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "./ui/badge";

type ConnectionStatus = "connected" | "disconnected" | "error";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const CONNECTION_STATUS_CONFIG = {
  connected: {
    dotColor: "bg-green-500",
    badgeClass: "bg-green-100 text-green-800 border-green-200",
    variant: "default" as const,
    text: "Online",
  },
  disconnected: {
    dotColor: "bg-red-500",
    badgeClass: "bg-red-100 text-red-800 border-red-200",
    variant: "destructive" as const,
    text: "Offline",
  },
  error: {
    dotColor: "bg-red-500",
    badgeClass: "bg-red-100 text-red-800 border-red-200",
    variant: "destructive" as const,
    text: "Error",
  },
} as const;

function Navbar() {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("disconnected");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const statusConfig = CONNECTION_STATUS_CONFIG[connectionStatus];

  const leftNavItems: NavItem[] = [
    { label: "Przeglad", href: "/", icon: Globe },
    { label: "Telemetria", href: "/telemetry", icon: Activity },
  ];

  const rightNavItems: NavItem[] = [
    { label: "Astronauci", href: "/astronauts", icon: Users },
    { label: "Inne", href: "/other", icon: Activity },
  ];

  const NavButton = ({ label, href, icon: Icon }: NavItem) => {
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
            </div>

            {/* Status and Controls */}
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
              <div className="flex items-center gap-2">
                <div
                  className={`
                    w-2 h-2 rounded-full transition-colors duration-300
                    ${statusConfig.dotColor}
                  `}
                />
                <Badge
                  variant={statusConfig.variant}
                  className={`
                      ${statusConfig.badgeClass} 
                      border font-medium text-xs px-2 py-1
                    `}
                >
                  {statusConfig.text}
                </Badge>
              </div>

              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className={`
                    relative px-3 py-2 text-gray-600 hover:text-gray-900 
                    transition-all duration-300 group focus:outline-none
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                  `}
              >
                <div className="flex items-center gap-2">
                  <RefreshCw
                    className={`h-4 w-4 transition-transform duration-500 ${
                      isLoading ? "animate-spin" : ""
                    }`}
                  />
                  <span className="text-xs font-medium">Odśwież</span>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 bg-gray-900 w-0 group-hover:w-full transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

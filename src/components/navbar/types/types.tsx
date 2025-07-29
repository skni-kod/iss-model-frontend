import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export type ConnectionStatus = "connected" | "disconnected" | "error";

// Connection status configuration with improved naming
export const CONNECTION_STATUS_CONFIG = {
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

// Animation and timing constants
export const NAVBAR_ANIMATION_CONFIG = {
  DURATION: {
    DEFAULT: 300,
    FAST: 200,
    SLOW: 500,
  },
  TIMING_FUNCTIONS: {
    EASE_OUT: "cubic-bezier(0.4, 0.0, 0.2, 1)",
    BOUNCE: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

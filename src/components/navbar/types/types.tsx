import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export type ConnectionStatus = "connected" | "disconnected" | "error";

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

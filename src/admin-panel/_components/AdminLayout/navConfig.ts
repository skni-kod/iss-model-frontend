import { LayoutDashboard, FileText, Plus } from "lucide-react";
import type { NavItem } from "./types";

export const navItems: NavItem[] = [
  { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/posts", icon: FileText, label: "Posty" },
  { path: "/admin/posts/new", icon: Plus, label: "Nowy post" },
];

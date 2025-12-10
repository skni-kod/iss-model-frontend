import {
  Globe,
  Activity,
  Users,
  BookOpen,
  Map,
  MoreHorizontal,
  Settings,
} from "lucide-react";
import { type NavItem } from "../types/types";

// Navigation configuration
export const NAV_CONFIG = {
  leftItems: [
    {
      label: "Przegląd",
      href: "/",
      icon: Globe,
      subItems: [
        {
          label: "Strona główna",
          href: "/",
          icon: Activity,
          description: "Przejdź do strony głównej",
        },
      ],
    },
    {
      label: "Telemetria",
      href: "/telemetry",
      icon: Activity,
      subItems: [
        {
          label: "Mapa ISS",
          href: "/telemetry",
          icon: Map,
          description: "Aktualna pozycja stacji kosmicznej",
        },
        {
          label: "Dane na żywo",
          href: "/telemetry",
          icon: Activity,
          description: "Aktualne dane telemetryczne ISS",
        },
      ],
    },
  ] as NavItem[],
  rightItems: [
    {
      label: "Załoga",
      href: "/astronauts",
      icon: Users,
      subItems: [
        {
          label: "Aktualnie na ISS",
          href: "/astronauts",
          icon: Users,
          description: "Lista astronautów na stacji",
        },
      ],
    },
    {
      label: "Inne",
      icon: MoreHorizontal,
      subItems: [
        {
          label: "Baza wiedzy",
          href: "/knowledge-base",
          icon: BookOpen,
          description: "Edukacyjne artykuły o kosmosie",
        },
        {
          label: "FAQ",
          href: "/faq",
          icon: BookOpen,
          description: "Najczęściej zadawane pytania",
        },
        {
          label: "Panel Admina",
          href: "/admin",
          icon: Settings,
          description: "Zarządzanie treścią",
          requiresAuth: true,
        },
      ],
    },
  ] as NavItem[],
} as const;

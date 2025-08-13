import {
  Globe,
  Activity,
  Users,
  BookOpen,
  Map,
  Telescope,
  MoreHorizontal,
  Zap,
  Settings,
  BarChart3,
  Wifi,
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
        {
          label: "Lorem Ipsum",
          href: "/lorem1",
          icon: Zap,
          description: "Lorem ipsum dolor sit amet consectetur",
        },
        {
          label: "Placeholder Item",
          href: "/placeholder1",
          icon: Settings,
          description: "Sed do eiusmod tempor incididunt ut labore",
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
        {
          label: "cos kiedys tu bedzie",
          href: "/aasdasdasda",
          icon: BarChart3,
          description: "Lorem ipsum dolor sit amet consectetur adipiscing",
        },
        {
          label: "tu tez",
          href: "/tutez",
          icon: Wifi,
          description: "Ut enim ad minim veniam quis nostrud",
        },
      ],
    },
  ] as NavItem[],
  rightItems: [
    {
      label: "Astronauci",
      href: "/astronauts",
      icon: Users,
      subItems: [
        {
          label: "Aktualnie na ISS",
          href: "/astronauts",
          icon: Users,
          description: "Lista astronautów na stacji",
        },
        {
          label: "Historia misji",
          href: "/astronauts/history",
          icon: Telescope,
          description: "Poprzednie załogi ISS",
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
          href: "/knowledge-base/faq",
          icon: BookOpen,
          description: "Najczęściej zadawane pytania",
        },
      ],
    },
  ] as NavItem[],
} as const;

import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { type NavItem } from "../types/types";

interface NavigationMenuDropdownProps {
  items: NavItem[];
  onOpenChange?: (open: boolean) => void;
}

export function NavigationMenuDropdown({
  items,
  onOpenChange,
}: NavigationMenuDropdownProps) {
  return (
    <NavigationMenu onValueChange={(value) => onOpenChange?.(!!value)}>
      <NavigationMenuList className="gap-2">
        {items.map((item) => (
          <NavigationMenuItem key={item.label}>
            {item.subItems && item.subItems.length > 0 ? (
              <>
                <NavigationMenuTrigger className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium bg-transparent hover:bg-gray-100 data-[state=open]:bg-gray-100">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-screen left-1/2 transform -translate-x-1/2">
                  <div className="bg-white/95 backdrop-blur-lg py-8 w-full">
                    <div className="px-4 sm:px-6 lg:px-8 max-w-none w-full">
                      <ul className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl ml-0">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.label}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={subItem.href}
                                className="block select-none leading-none no-underline outline-none transition-all hover:bg-gray-100 focus:bg-gray-100 text-left bg-gray-50/50 h-32 p-4"
                              >
                                <div className="flex flex-col items-start gap-3 h-full">
                                  {subItem.icon && (
                                    <subItem.icon className="!h-8 !w-8 text-muted-foreground flex-shrink-0" />
                                  )}
                                  <div className="space-y-2 flex-1">
                                    <div className="text-base font-medium leading-none">
                                      {subItem.label}
                                    </div>
                                    {subItem.description && (
                                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        {subItem.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  to={item.href || "#"}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

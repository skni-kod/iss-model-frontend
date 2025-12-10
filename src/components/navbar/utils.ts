import { isAuthenticated } from "@/lib/auth";
import type { NavItem, NavSubItem } from "./types/types";

export function filterNavItemsByAuth(items: NavItem[]): NavItem[] {
    const authenticated = isAuthenticated();
    
    return items.map((item) => ({
        ...item,
        subItems: item.subItems?.filter(
            (subItem: NavSubItem) => !subItem.requiresAuth || authenticated
        ),
    }));
}

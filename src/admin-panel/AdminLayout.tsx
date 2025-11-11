import { Outlet } from "react-router-dom";
import { useState } from "react";
import {
  AdminSidebar,
  AdminMobileMenu,
  navItems,
} from "./_components/AdminLayout";

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden flex flex-col lg:flex-row">
      <AdminSidebar
        navItems={navItems}
        onToggleMobileMenu={handleToggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <AdminMobileMenu
        isOpen={isMobileMenuOpen}
        navItems={navItems}
        onClose={handleCloseMobileMenu}
      />

      <main className="flex-1 overflow-y-auto mt-16 lg:mt-0 lg:ml-64 px-4 sm:px-6 lg:px-8 pt-6 pb-4 sm:pb-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

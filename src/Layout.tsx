import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
  const location = useLocation();
  const isOverviewPage = location.pathname === "/" || location.pathname === "/overview";

  return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <Navbar />
          {isOverviewPage ? (
              //Pełna szerokość dla strony z mapą
              <main>
                <Outlet />
              </main>
          ) : (
              //Ograniczona szerokość dla innych stron
              <div className="container mx-auto max-w-7xl">
                <main className="mt-4">
                  <Outlet />
                </main>
              </div>
          )}
        </div>
      </>
  );
}

export default Layout;

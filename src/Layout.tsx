import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";

function Layout() {
  const location = useLocation();
  const isTelemetryPage =
    location.pathname === "/" || location.pathname === "/telemetry";
  const isHomePage = location.pathname === "/home-page";

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Navbar />
        {isTelemetryPage || isHomePage ? (
          //Pełna szerokość dla strony z mapą i home page
          <main>
            <Outlet />
          </main>
        ) : (
          //Ograniczona szerokość dla innych stron
          <div className="container mx-auto max-w-7xl">
            <main className="pt-25">
              <Outlet />
            </main>
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}

export default Layout;

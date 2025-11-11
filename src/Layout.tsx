import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";

function Layout() {
  const location = useLocation();
  const isFullWidthPage =
    location.pathname === "/" ||
    location.pathname === "/telemetry" ||
    location.pathname === "/faq";
  const isHomePage = location.pathname === "/home-page";

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Navbar />
        {isFullWidthPage || isHomePage ? (
          //Pełna szerokość dla strony z mapą, home page i FAQ
          <main>
            <Outlet />
          </main>
        ) : (
          //Marginesy dla innych stron
          <div className="container mx-auto max-w-7xl">
            <main className="pt-24">
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

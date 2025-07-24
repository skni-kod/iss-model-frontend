import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function Layout() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Navbar />
        <div className="container mx-auto max-w-7xl">
          <main className="mt-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;

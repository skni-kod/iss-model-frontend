import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function Layout() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
        <div className="container mx-auto max-w-7xl">
          <Header />
          <main className="mt-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;

import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Telemetry from "./pages/Telemetry";
import Astronauts from "./pages/Astronauts";
import KnowledgeBase from "./pages/KnowledgeBase";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { FAQPage } from "./components/faq";

// Admin Panel Components
import AdminLayout from "./admin-panel/AdminLayout";
import AdminDashboard from "./admin-panel/AdminDashboard";
import AdminPostsList from "./admin-panel/AdminPostsList";
import AdminPostForm from "./admin-panel/AdminPostForm";

function App() {
  return (
    <Routes>
      {/* Auth Pages - standalone without navbar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="telemetry" element={<Telemetry />} />
        <Route path="astronauts" element={<Astronauts />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="knowledge-base" element={<KnowledgeBase />} />
        <Route path="knowledge-base/:postId" element={<KnowledgeBase />} />
      </Route>

      {/* Admin Panel Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="posts" element={<AdminPostsList />} />
        <Route path="posts/new" element={<AdminPostForm />} />
        <Route path="posts/:postId/edit" element={<AdminPostForm />} />
      </Route>
    </Routes>
  );
}

export default App;

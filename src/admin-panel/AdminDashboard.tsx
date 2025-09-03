import { DashboardHeader, StatsGrid, RecentPosts } from "./_components";
import { useDashboardStats } from "./hooks/useDashboardStats";

const AdminDashboard = () => {
  const { stats, recentPosts } = useDashboardStats();

  return (
    <div>
      <DashboardHeader
        title="Dashboard"
        description="Przegląd aktywności panelu administracyjnego"
      />

      <StatsGrid stats={stats} />

      <RecentPosts posts={recentPosts} />
    </div>
  );
};

export default AdminDashboard;

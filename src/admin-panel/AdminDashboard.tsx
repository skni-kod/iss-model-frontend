import {
  DashboardHeader,
  StatsGrid,
  RecentPosts,
  useDashboardStats,
} from "./_components";

const AdminDashboard = () => {
  const { stats, recentPosts, loading, error, refetch } = useDashboardStats();

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-destructive">
          <p className="text-lg font-medium mb-2">Wystąpił błąd</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader
        title="Dashboard"
        description="Przegląd aktywności panelu administracyjnego"
        onRefresh={refetch}
        loading={loading}
      />

      {loading && stats.every((s) => s.value === 0) ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Ładowanie danych...</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          <StatsGrid stats={stats} />
          <RecentPosts posts={recentPosts} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;


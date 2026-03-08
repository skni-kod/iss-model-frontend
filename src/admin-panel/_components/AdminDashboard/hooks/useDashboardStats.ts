import { useState, useMemo, useEffect, useCallback } from "react";
import { FileText, Users, Eye, TrendingUp } from "lucide-react";
import { getBlogPosts, type BlogPost } from "../../../../lib/api/blog";

export const useDashboardStats = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } catch (err) {
      console.error("Błąd podczas pobierania postów:", err);
      setError("Nie udało się pobrać danych do dashboardu");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const stats = useMemo(
    () => [
      {
        title: "Wszystkie posty",
        value: posts.length,
        icon: FileText,
        color: "bg-blue-500",
        link: "/admin/posts",
      },
      {
        title: "Opublikowane",
        value: posts.length,
        icon: Eye,
        color: "bg-green-500",
        link: "/admin/posts",
      },
      {
        title: "Kategorie",
        value: new Set(posts.flatMap((post) => post.tags)).size,
        icon: TrendingUp,
        color: "bg-purple-500",
        link: "/admin/posts",
      },
      {
        title: "Autorzy",
        value: new Set(posts.map((post) => post.author)).size,
        icon: Users,
        color: "bg-orange-500",
        link: "/admin/posts",
      },
    ],
    [posts]
  );

  const recentPosts = useMemo(
    () =>
      [...posts]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 5),
    [posts]
  );

  return {
    stats,
    recentPosts,
    loading,
    error,
    refetch: fetchPosts,
  };
};

import { useMemo } from "react";
import { FileText, Users, Eye, TrendingUp } from "lucide-react";
import { samplePosts } from "../../components/knowledge-base/data/posts";

export const useDashboardStats = () => {
  const stats = useMemo(
    () => [
      {
        title: "Wszystkie posty",
        value: samplePosts.length,
        icon: FileText,
        color: "bg-blue-500",
        link: "/admin/posts",
      },
      {
        title: "Opublikowane",
        value: samplePosts.length,
        icon: Eye,
        color: "bg-green-500",
        link: "/admin/posts",
      },
      {
        title: "Kategorie",
        value: new Set(samplePosts.flatMap((post) => post.tags)).size,
        icon: TrendingUp,
        color: "bg-purple-500",
        link: "/admin/posts",
      },
      {
        title: "Autorzy",
        value: new Set(samplePosts.map((post) => post.author)).size,
        icon: Users,
        color: "bg-orange-500",
        link: "/admin/posts",
      },
    ],
    []
  );

  const recentPosts = useMemo(() => samplePosts.slice(0, 5), []);

  return {
    stats,
    recentPosts,
  };
};

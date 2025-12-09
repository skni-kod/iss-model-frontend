import { Link } from "react-router-dom";
import type { Post } from "../../../components/knowledge-base/types";

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts = ({ posts }: RecentPostsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">
            Ostatnie posty
          </h3>
          <Link
            to="/admin/posts"
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 whitespace-nowrap"
          >
            Zobacz wszystkie
          </Link>
        </div>
      </div>
      <div className="divide-y">
        {posts.map((post) => (
          <div
            key={post.id}
            className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {post.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Autor: {post.author} • {post.publishDate}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
                <Link
                  to={`/admin/posts/${post.id}/edit`}
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 whitespace-nowrap"
                >
                  Edytuj
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;

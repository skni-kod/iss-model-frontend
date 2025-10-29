import { Link } from "react-router-dom";
import type { Post } from "../../../components/knowledge-base/types";

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts = ({ posts }: RecentPostsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Ostatnie posty</h3>
          <Link
            to="/admin/posts"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Zobacz wszystkie
          </Link>
        </div>
      </div>
      <div className="divide-y">
        {posts.map((post) => (
          <div key={post.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Autor: {post.author} • {post.publishDate}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
                <Link
                  to={`/admin/posts/${post.id}/edit`}
                  className="text-sm text-blue-600 hover:text-blue-800 ml-4"
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

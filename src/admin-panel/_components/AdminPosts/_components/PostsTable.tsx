import { Link } from "react-router-dom";
import { Edit, Trash2, Eye } from "lucide-react";
import type { Post } from "../../../../components/knowledge-base/types";
import PostsTableHeader from "./PostsTableHeader";
import PostTableRow from "./PostTableRow";

interface PostsTableProps {
  posts: Post[];
  onDeletePost: (postId: number) => void;
}

const PostsTable = ({ posts, onDeletePost }: PostsTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Desktop view - table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <PostsTableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <PostTableRow key={post.id} post={post} onDelete={onDeletePost} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view - cards */}
      <div className="lg:hidden divide-y divide-gray-200">
        {posts.map((post) => (
          <div key={post.id} className="p-4 hover:bg-gray-50">
            <div className="flex gap-3">
              <img
                className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                src={post.image}
                alt={post.title}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.publishDate}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <Link
                    to={`/knowledge-base/${post.slug}`}
                    className="text-gray-600 hover:text-gray-900 text-xs"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/admin/posts/${post.id}/edit`}
                    className="text-blue-600 hover:text-blue-900 text-xs"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => onDeletePost(post.id)}
                    className="text-red-600 hover:text-red-900 text-xs"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Nie znaleziono postów spełniających kryteria wyszukiwania.
          </p>
        </div>
      )}
    </div>
  );
};

export default PostsTable;

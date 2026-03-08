import { Link } from "react-router-dom";
import { Edit, Trash2, Eye, Calendar } from "lucide-react";
import type { BlogPost } from "../../../../lib/api/blog";

interface PostTableRowProps {
  post: BlogPost;
  onDelete: (postId: number) => void;
}

const PostTableRow = ({ post, onDelete }: PostTableRowProps) => {
  return (
    <tr key={post.id} className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12">
            <img
              className="h-12 w-12 rounded-lg object-cover"
              src={post.image}
              alt={post.title}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {post.title}
            </div>
            <div className="text-sm text-gray-500 line-clamp-1">
              {post.excerpt}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{post.author}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          {post.publishDate}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{post.tags.length - 2}
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-2">
          <Link
            to={`/knowledge-base/${post.slug || post.id}`}
            className="text-gray-600 hover:text-gray-900"
            title="Zobacz post"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            to={`/admin/posts/${post.id}/edit`}
            className="text-blue-600 hover:text-blue-900"
            title="Edytuj post"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(post.id)}
            className="text-red-600 hover:text-red-900"
            title="Usuń post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PostTableRow;

import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const PostsListHeader = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Zarządzanie postami
        </h2>
        <p className="text-gray-600">
          Zarządzaj wszystkimi postami w swoim blogu
        </p>
      </div>
      <Link
        to="/admin/posts/new"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Nowy post
      </Link>
    </div>
  );
};

export default PostsListHeader;

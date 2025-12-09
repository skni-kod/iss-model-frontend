import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { PanelHeader } from "../../AdminLayout";

const PostsListHeader = () => {
  return (
    <PanelHeader
      title="Zarządzanie postami"
      description="Zarządzaj wszystkimi postami w swoim blogu"
      action={
        <Link
          to="/admin/posts/new"
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nowy post
        </Link>
      }
    />
  );
};

export default PostsListHeader;

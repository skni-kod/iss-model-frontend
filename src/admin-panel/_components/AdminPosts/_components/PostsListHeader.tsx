import { Link } from "react-router-dom";
import { Plus, RefreshCw } from "lucide-react";
import { PanelHeader } from "../../AdminLayout";
import { Button } from "@/components/ui/button";

interface PostsListHeaderProps {
  onRefresh: () => void;
  loading?: boolean;
}

const PostsListHeader = ({ onRefresh, loading }: PostsListHeaderProps) => {
  return (
    <PanelHeader
      title="Zarządzanie postami"
      description="Zarządzaj wszystkimi postami w swoim blogu"
      action={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onRefresh}
            disabled={loading}
            title="Odśwież listę"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Link
            to="/admin/posts/new"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nowy post
          </Link>
        </div>
      }
    />
  );
};

export default PostsListHeader;

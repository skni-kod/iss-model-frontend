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
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <PostsTableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <PostTableRow key={post.id} post={post} onDelete={onDeletePost} />
            ))}
          </tbody>
        </table>
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

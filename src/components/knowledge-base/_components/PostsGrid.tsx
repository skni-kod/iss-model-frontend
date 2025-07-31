import type { Post } from "../types";
import PostCard from "./PostCard";

interface PostsGridProps {
  posts: Post[];
  onPostSelect: (post: Post) => void;
}

function PostsGrid({ posts, onPostSelect }: PostsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onClick={() => onPostSelect(post)}
        />
      ))}
    </div>
  );
}

export default PostsGrid;

import type { Post } from "../types";
import { Badge } from "../../ui/badge";

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

function PostCard({ post, onClick }: PostCardProps) {
  return (
    <article
      className="bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.publishDate}</span>
          </div>
          <span className="font-medium">{post.readTime}</span>
        </div>
      </div>
    </article>
  );
}

export default PostCard;

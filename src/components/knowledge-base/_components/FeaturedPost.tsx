import type { Post } from "../types";
import { Button } from "../../ui/button";

interface FeaturedPostProps {
  post: Post;
  onPostSelect: (post: Post) => void;
}

function FeaturedPost({ post, onPostSelect }: FeaturedPostProps) {
  return (
    <div className="mt-12 border-t pt-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Wyróżniony artykuł
      </h2>
      <div className="bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                Wyróżniony
              </span>
              <span className="text-sm text-muted-foreground">
                {post.readTime}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">
              {post.title}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {post.author} • {post.publishDate}
              </div>
              <Button
                onClick={() => onPostSelect(post)}
                variant="link"
                className="text-primary hover:text-primary/80 font-medium text-sm transition-colors p-0"
              >
                Czytaj więcej →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;

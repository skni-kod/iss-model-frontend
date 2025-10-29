import type { Post } from "../types";
import { Link } from "react-router-dom";

interface FeaturedPostProps {
  post: Post;
}

function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="mt-12 border-t pt-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Wyróżniony artykuł
      </h2>
      <div className="bg-card border rounded-lg overflow-hidden shadow-sm">
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
            <Link
              to={`/knowledge-base/${post.slug}`}
              className="text-xl font-bold mb-3 text-foreground hover:text-primary transition-colors block"
            >
              {post.title}
            </Link>
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {post.author} • {post.publishDate}
              </div>
              <Link
                to={`/knowledge-base/${post.slug}`}
                className="text-primary hover:text-primary/80 font-medium text-sm transition-colors hover:underline"
              >
                Czytaj więcej →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;

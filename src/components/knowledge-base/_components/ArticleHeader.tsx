import type { Post } from "../types";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import { Button } from "../../ui/button";

interface ArticleHeaderProps {
  post: Post;
  onBack: () => void;
}

function ArticleHeader({ post, onBack }: ArticleHeaderProps) {
  return (
    <header className="mb-8">
      {/* Back button */}
      <Button
        onClick={onBack}
        variant="ghost"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group p-0"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Powrót do listy artykułów
      </Button>

      {/* Title and Share button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
          {post.title}
        </h1>
        <Button
          className="flex items-center gap-1 hover:text-foreground transition-colors shrink-0"
          variant="ghost"
          size="lg"
        >
          <Share2 className="w-4 h-4" />
          <span>Udostępnij</span>
        </Button>
      </div>

      {/* Meta information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{post.publishDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Hero image */}
      <div className="aspect-video overflow-hidden rounded-lg mb-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
}

export default ArticleHeader;

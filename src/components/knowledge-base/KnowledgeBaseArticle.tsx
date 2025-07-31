import type { Post } from "./types";
import ArticleHeader from "./_components/ArticleHeader";
import ArticleContent from "./_components/ArticleContent";
import ArticleFooter from "./_components/ArticleFooter";

interface KnowledgeBaseArticleProps {
  post: Post;
  onBack: () => void;
}

function KnowledgeBaseArticle({ post, onBack }: KnowledgeBaseArticleProps) {
  return (
    <div className="px-6 py-8">
      <ArticleHeader post={post} onBack={onBack} />
      <ArticleContent post={post} />
      <ArticleFooter />
    </div>
  );
}

export default KnowledgeBaseArticle;

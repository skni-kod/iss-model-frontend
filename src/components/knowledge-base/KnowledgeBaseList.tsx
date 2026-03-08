import type { Post } from "./types";
import KnowledgeBaseHeader from "./_components/KnowledgeBaseHeader";
import TagsFilterSection from "./_components/TagsFilterSection";
import PostsGrid from "./_components/PostsGrid";
import FeaturedPost from "./_components/FeaturedPost";

interface KnowledgeBaseListProps {
  posts: Post[];
  totalPostsCount: number;
  allTags: string[];
  searchQuery: string;
  selectedTags: string[];
  onPostSelect: (post: Post) => void;
  onSearchChange: (query: string) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
  hasFilters: boolean;
}

function KnowledgeBaseList({
  posts,
  totalPostsCount,
  allTags,
  searchQuery,
  selectedTags,
  onPostSelect,
  onSearchChange,
  onTagToggle,
  onClearFilters,
  hasFilters,
}: KnowledgeBaseListProps) {
  return (
    <div className="px-6 py-8">
      <KnowledgeBaseHeader />

      <TagsFilterSection
        postsCount={posts.length}
        totalPostsCount={totalPostsCount}
        searchQuery={searchQuery}
        selectedTags={selectedTags}
        allTags={allTags}
        onSearchChange={onSearchChange}
        onTagToggle={onTagToggle}
        onClearFilters={onClearFilters}
        hasFilters={hasFilters}
      />

      <PostsGrid posts={posts} onPostSelect={onPostSelect} />

      {posts.length > 0 && <FeaturedPost post={posts[0]} />}
    </div>
  );
}

export default KnowledgeBaseList;


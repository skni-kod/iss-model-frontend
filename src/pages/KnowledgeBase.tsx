import {
  KnowledgeBaseList,
  KnowledgeBaseArticle,
  useKnowledgeBase,
} from "../components/knowledge-base";

function KnowledgeBase() {
  const {
    selectedPost,
    posts,
    allTags,
    searchQuery,
    selectedTags,
    hasFilters,
    handlePostSelect,
    handleBackToList,
    setSearchQuery,
    handleTagToggle,
    clearFilters,
  } = useKnowledgeBase();

  return (
    <div className="min-h-screen">
      {selectedPost ? (
        <KnowledgeBaseArticle post={selectedPost} onBack={handleBackToList} />
      ) : (
        <KnowledgeBaseList
          posts={posts}
          allTags={allTags}
          searchQuery={searchQuery}
          selectedTags={selectedTags}
          onPostSelect={handlePostSelect}
          onSearchChange={setSearchQuery}
          onTagToggle={handleTagToggle}
          onClearFilters={clearFilters}
          hasFilters={hasFilters}
        />
      )}
    </div>
  );
}

export default KnowledgeBase;

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
    loading,
    error,
    totalPostsCount,
    handlePostSelect,
    handleBackToList,
    setSearchQuery,
    handleTagToggle,
    clearFilters,
  } = useKnowledgeBase();

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Ładowanie artykułów...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center text-destructive">
          <p className="text-lg font-medium mb-2">Wystąpił błąd</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {selectedPost ? (
        <KnowledgeBaseArticle post={selectedPost} onBack={handleBackToList} />
      ) : (
        <KnowledgeBaseList
          posts={posts}
          totalPostsCount={totalPostsCount}
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


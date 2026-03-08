import {
  PostsListHeader,
  PostsFilters,
  PostsTable,
  PostsSummary,
  usePostsManagement,
} from "./_components";

const AdminPostsList = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedTag,
    setSelectedTag,
    posts,
    allTags,
    filteredPosts,
    handleDeletePost,
    loading,
    error,
    refetchPosts,
  } = usePostsManagement();

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-destructive">
          <p className="text-lg font-medium mb-2">Wystąpił błąd</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <PostsListHeader onRefresh={refetchPosts} loading={loading} />
        <PostsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          allTags={allTags}
        />
      </div>

      {loading && posts.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Ładowanie postów...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="relative">
            {loading && posts.length > 0 && (
              <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            <PostsTable posts={filteredPosts} onDeletePost={handleDeletePost} />
          </div>

          <PostsSummary
            filteredCount={filteredPosts.length}
            totalCount={posts.length}
          />
        </>
      )}
    </div>
  );
};

export default AdminPostsList;

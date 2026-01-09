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
  } = usePostsManagement();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Ładowanie postów...</p>
        </div>
      </div>
    );
  }

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
        <PostsListHeader />
        <PostsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          allTags={allTags}
        />
      </div>

      <PostsTable posts={filteredPosts} onDeletePost={handleDeletePost} />

      <PostsSummary
        filteredCount={filteredPosts.length}
        totalCount={posts.length}
      />
    </div>
  );
};

export default AdminPostsList;

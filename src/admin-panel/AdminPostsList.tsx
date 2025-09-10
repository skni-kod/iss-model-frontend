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
  } = usePostsManagement();

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

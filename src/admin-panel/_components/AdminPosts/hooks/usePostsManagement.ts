import { useState, useMemo } from "react";
import { samplePosts } from "../../../../components/knowledge-base/data/posts";
import type { Post } from "../../../../components/knowledge-base/types";

export const usePostsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [posts, setPosts] = useState<Post[]>(samplePosts);

  const allTags = useMemo(() => {
    return Array.from(new Set(posts.flatMap((post) => post.tags)));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchTerm, selectedTag]);

  const handleDeletePost = (postId: number) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten post?")) {
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedTag,
    setSelectedTag,
    posts,
    setPosts,
    allTags,
    filteredPosts,
    handleDeletePost,
  };
};

import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Post } from "../types";
import { samplePosts } from "../data/posts";

export function useKnowledgeBase() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filtered posts based on search and tags
  const filteredPosts = useMemo(() => {
    return samplePosts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  // All available tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    samplePosts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Effect for handling routing
  useEffect(() => {
    if (postId) {
      const post = samplePosts.find((p) => p.slug === postId);
      setSelectedPost(post || null);
    } else {
      setSelectedPost(null);
    }
  }, [postId]);

  const handlePostSelect = (post: Post): void => {
    navigate(`/knowledge-base/${post.slug}`);
  };

  const handleBackToList = (): void => {
    navigate("/knowledge-base");
  };

  const handleTagToggle = (tag: string): void => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = (): void => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  return {
    // State
    selectedPost,
    searchQuery,
    selectedTags,

    // Data
    posts: filteredPosts,
    allPosts: samplePosts,
    allTags,

    // Actions
    handlePostSelect,
    handleBackToList,
    setSearchQuery,
    handleTagToggle,
    clearFilters,

    // Helpers
    hasFilters: searchQuery !== "" || selectedTags.length > 0,
    postsCount: filteredPosts.length,
    totalPostsCount: samplePosts.length,
  };
}

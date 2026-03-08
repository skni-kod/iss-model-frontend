import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Post } from "../types";
import { getBlogPosts } from "../../../lib/api/blog";

export function useKnowledgeBase() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from API
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBlogPosts();
      setAllPosts(data);
    } catch (err) {
      console.error("Błąd podczas pobierania postów:", err);
      setError("Nie udało się pobrać artykułów");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Filtered posts based on search and tags
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
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
  }, [allPosts, searchQuery, selectedTags]);

  // All available tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allPosts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allPosts]);

  // Effect for handling routing - find post by slug or id
  useEffect(() => {
    if (postId && allPosts.length > 0) {
      const post =
        allPosts.find((p) => p.slug === postId) ||
        allPosts.find((p) => String(p.id) === postId);
      setSelectedPost(post || null);
    } else {
      setSelectedPost(null);
    }
  }, [postId, allPosts]);

  const handlePostSelect = (post: Post): void => {
    navigate(`/knowledge-base/${post.slug || post.id}`);
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
    loading,
    error,

    // Data
    posts: filteredPosts,
    allPosts,
    allTags,

    // Actions
    handlePostSelect,
    handleBackToList,
    setSearchQuery,
    handleTagToggle,
    clearFilters,
    refetch: fetchPosts,

    // Helpers
    hasFilters: searchQuery !== "" || selectedTags.length > 0,
    postsCount: filteredPosts.length,
    totalPostsCount: allPosts.length,
  };
}


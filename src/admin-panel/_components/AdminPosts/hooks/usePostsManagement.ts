import { useState, useMemo, useEffect } from "react";
import { getBlogPosts, deleteBlogPost, type BlogPost } from "../../../../lib/api/blog";

export const usePostsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (err) {
        console.error("Błąd podczas pobierania postów:", err);
        setError("Nie udało się pobrać postów");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

  const handleDeletePost = async (postId: number) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten post?")) {
      setDeleting(postId);
      try {
        await deleteBlogPost(postId);
        setPosts(posts.filter((post) => post.id !== postId));
      } catch (err) {
        console.error("Błąd podczas usuwania posta:", err);
        setError("Nie udało się usunąć posta");
      } finally {
        setDeleting(null);
      }
    }
  };

  const refetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } catch (err) {
      console.error("Błąd podczas pobierania postów:", err);
      setError("Nie udało się pobrać postów");
    } finally {
      setLoading(false);
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
    loading,
    error,
    refetchPosts,
    deleting,
  };
};

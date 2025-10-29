import { useState, useCallback } from "react";
import type { Post } from "../../components/knowledge-base/types";
import { samplePosts } from "../../components/knowledge-base/data/posts";

export const useAdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = useCallback(async (postData: Omit<Post, "id">) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newPost: Post = {
        ...postData,
        id: Date.now(),
      };

      setPosts((prevPosts) => [newPost, ...prevPosts]);
      return newPost;
    } catch (err) {
      setError("Błąd podczas tworzenia posta");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePost = useCallback(
    async (postId: number, postData: Partial<Post>) => {
      setLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, ...postData } : post
          )
        );
      } catch (err) {
        setError("Błąd podczas aktualizacji posta");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deletePost = useCallback(async (postId: number) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (err) {
      setError("Błąd podczas usuwania posta");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPost = useCallback(
    (postId: number) => {
      return posts.find((post) => post.id === postId);
    },
    [posts]
  );

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    getPost,
  };
};

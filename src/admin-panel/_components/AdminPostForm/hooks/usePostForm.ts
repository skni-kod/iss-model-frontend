import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, type PostFormData } from "../schema";
import { createBlogPost, updateBlogPost, getBlogPosts, type BlogPost } from "../../../../lib/api/blog";

export type { PostFormData };

export const usePostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!postId;

  const [newTag, setNewTag] = useState("");
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(isEdit);

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      tags: [],
      publishDate: new Date().toISOString().split("T")[0],
      author: "Administrator",
      readTime: "5 min",
    },
  });

  const watchedValues = form.watch();

  // Fetch post data for editing
  useEffect(() => {
    const fetchPost = async () => {
      if (isEdit && postId) {
        setLoading(true);
        try {
          const posts = await getBlogPosts();
          const post = posts.find((p) => p.id === parseInt(postId));
          if (post) {
            setEditPost(post);
            form.reset({
              title: post.title,
              excerpt: post.excerpt,
              content: post.content,
              author: post.author,
              publishDate: post.publishDate,
              readTime: post.readTime,
              image: post.image,
              tags: post.tags,
            });
          }
        } catch (error) {
          console.error("Błąd podczas pobierania posta:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [isEdit, postId, form]);

  const addTag = () => {
    if (newTag.trim() && !watchedValues.tags?.includes(newTag.trim())) {
      const currentTags = watchedValues.tags || [];
      form.setValue("tags", [...currentTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = watchedValues.tags || [];
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const onSubmit = async (data: PostFormData) => {
    try {
      const requestData = {
        author: data.author,
        content: data.content,
        excerpt: data.excerpt,
        image: data.image,
        images: [],
        publishDate: data.publishDate,
        readTime: data.readTime,
        tags: data.tags,
        title: data.title,
      };

      if (isEdit && postId) {
        await updateBlogPost(parseInt(postId), requestData);
      } else {
        await createBlogPost(requestData);
      }

      navigate("/admin/posts");
    } catch (error) {
      console.error("[usePostForm] Błąd podczas zapisywania posta:", error);
    }
  };

  return {
    form,
    watchedValues,
    isEdit,
    newTag,
    setNewTag,
    addTag,
    removeTag,
    onSubmit,
    loading,
    editPost,
  };
};

import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { samplePosts } from "../../../../components/knowledge-base/data/posts";
import type { Post } from "../../../../components/knowledge-base/types";
import { postSchema, type PostFormData } from "../schema";
import { generateSlug } from "../../../../lib/utils";

export type { PostFormData };

export const usePostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!postId;

  const [newTag, setNewTag] = useState("");

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

  const editPost = useMemo(() => {
    if (isEdit && postId) {
      return samplePosts.find((p) => p.id === parseInt(postId));
    }
    return null;
  }, [isEdit, postId]);

  useEffect(() => {
    if (editPost) {
      form.reset({
        title: editPost.title,
        excerpt: editPost.excerpt,
        content: editPost.content,
        author: editPost.author,
        publishDate: editPost.publishDate,
        readTime: editPost.readTime,
        image: editPost.image,
        tags: editPost.tags,
      });
    }
  }, [editPost, form.reset]);

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
      const slug = generateSlug(data.title);

      const postData: Post = {
        id: isEdit ? parseInt(postId!) : Date.now(),
        slug,
        ...data,
      };

      console.log("Zapisuję post:", postData);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/admin/posts");
    } catch (error) {
      console.error("Błąd podczas zapisywania posta:", error);
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
  };
};

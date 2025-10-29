import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(1, "Tytuł jest wymagany")
    .max(200, "Tytuł nie może być dłuższy niż 200 znaków"),
  excerpt: z
    .string()
    .min(1, "Excerpt jest wymagany")
    .max(500, "Excerpt nie może być dłuższy niż 500 znaków"),
  content: z.string().min(1, "Treść jest wymagana"),
  author: z.string().min(1, "Autor jest wymagany"),
  publishDate: z.string().min(1, "Data publikacji jest wymagana"),
  readTime: z.string().min(1, "Czas czytania jest wymagany"),
  image: z.string().url("Podaj prawidłowy URL obrazu"),
  tags: z.array(z.string()).min(1, "Dodaj przynajmniej jeden tag"),
});

export type PostFormData = z.infer<typeof postSchema>;

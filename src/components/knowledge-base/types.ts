export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  tags: string[];
  readTime: string;
  image: string;
}

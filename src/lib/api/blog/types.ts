/**
 * Request body for creating a blog post
 */
export interface CreateBlogPostRequest {
    author: string;
    content: string;
    excerpt: string;
    image: string;
    images: string[];
    publishDate: string;
    readTime: string;
    tags: string[];
    title: string;
}

/**
 * Blog post response type (used for both create response and GET list)
 */
export interface BlogPost {
    author: string;
    content: string;
    created_at: string;
    excerpt: string;
    id: number;
    image: string;
    images: string[];
    publishDate: string;
    readTime: string;
    slug?: string;
    tags: string[];
    title: string;
    updated_at: string;
}

/**
 * Response from creating a blog post
 */
export type CreateBlogPostResponse = BlogPost;

/**
 * Request body for updating a blog post
 */
export type UpdateBlogPostRequest = CreateBlogPostRequest;

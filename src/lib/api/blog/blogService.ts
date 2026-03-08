import { adminApiClient, apiClient } from '../client';
import type { CreateBlogPostRequest, CreateBlogPostResponse, BlogPost, UpdateBlogPostRequest } from './types';

export type { BlogPost };

/**
 * Get all blog posts (public endpoint)
 * GET /blog/posts
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
    const response = await apiClient.get<BlogPost[]>('/blog/posts');
    return response.data;
}

/**
 * Create a new blog post (admin endpoint)
 * POST /admin/blog/posts
 */
export async function createBlogPost(data: CreateBlogPostRequest): Promise<CreateBlogPostResponse> {
    const response = await adminApiClient.post<CreateBlogPostResponse>('/blog/posts', data);
    return response.data;
}

/**
 * Update an existing blog post (admin endpoint)
 * PUT /admin/blog/posts/{id}
 */
export async function updateBlogPost(id: number, data: UpdateBlogPostRequest): Promise<BlogPost> {
    const response = await adminApiClient.put<BlogPost>(`/blog/posts/${id}`, data);
    return response.data;
}

/**
 * Delete a blog post (admin endpoint)
 * DELETE /admin/blog/posts/{id}
 */
export async function deleteBlogPost(id: number): Promise<void> {
    await adminApiClient.delete(`/blog/posts/${id}`);
}

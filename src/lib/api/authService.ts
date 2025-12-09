import { adminApiClient } from './client';

export interface RegisterRequest {
    email: string;
    password: string;
    username: string;
}

export interface RegisterResponse {
    message: string;
}

export interface ApiError {
    message: string;
    status?: number;
}

/**
 * Register a new user
 * POST /admin/register
 */
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await adminApiClient.post<RegisterResponse>('/register', data);
    return response.data;
}

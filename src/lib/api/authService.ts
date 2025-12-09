import { adminApiClient } from './client';

// Register types
export interface RegisterRequest {
    email: string;
    password: string;
    username: string;
}

export interface RegisterResponse {
    message: string;
}

// Login types
export interface LoginRequest {
    password: string;
    username: string;
}

export interface LoginResponse {
    token: string;
}

// Common error type
export interface ApiError {
    error: string;
    message: string;
}

/**
 * Register a new user
 * POST /admin/register
 */
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await adminApiClient.post<RegisterResponse>('/register', data);
    return response.data;
}

/**
 * Login user
 * POST /admin/login
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
    const response = await adminApiClient.post<LoginResponse>('/login', data);
    return response.data;
}

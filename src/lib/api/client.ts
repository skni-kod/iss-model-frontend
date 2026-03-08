import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '');

if (!API_BASE_URL) {
  throw new Error("Missing required environment variable");
}

/**
 * Regular API client for public endpoints
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Admin API client for /admin/* endpoints
 */
export const adminApiClient = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for admin client - adds auth token
adminApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
const handleResponseError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("API Error:", error.response?.data || error.message);
  }
  return Promise.reject(error);
};

apiClient.interceptors.response.use(
  (response) => response,
  handleResponseError,
);

// Admin client: auto-logout on 401 (expired/invalid token)
adminApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return handleResponseError(error);
  },
);

export default apiClient;

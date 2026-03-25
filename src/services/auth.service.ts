import { apiClient } from "@/lib/api/client";
import { AuthTokenResponse, User } from "@/lib/types/api.types";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Auth endpoints return tokens wrapped in { data: AuthTokenResponse }.
export const authService = {
  login: async (data: LoginRequest): Promise<AuthTokenResponse> => {
    const response = await apiClient.post<{ data: AuthTokenResponse }>("/auth/login", data);
    return response.data.data;
  },

  register: async (data: RegisterRequest): Promise<AuthTokenResponse> => {
    const response = await apiClient.post<{ data: AuthTokenResponse }>("/auth/register", data);
    return response.data.data;
  },

  // No body — the refresh token is sent automatically as an HttpOnly cookie.
  refresh: async (): Promise<AuthTokenResponse> => {
    const response = await apiClient.post<{ data: AuthTokenResponse }>("/auth/refresh");
    return response.data.data;
  },

  // No body — the server clears the HttpOnly cookie server-side.
  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get<{ data: User }>("/users/me");
    return response.data.data;
  },
};

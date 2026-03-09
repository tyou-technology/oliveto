import { apiClient } from "@/lib/api/client";
import { TokenPair, User } from "@/lib/types/api.types";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<TokenPair> => {
    const response = await apiClient.post<{ data: TokenPair }>("/auth/login", data);
    return response.data.data;
  },

  register: async (data: RegisterRequest): Promise<TokenPair> => {
    const response = await apiClient.post<{ data: TokenPair }>("/auth/register", data);
    return response.data.data;
  },

  logout: async (refreshToken: string): Promise<void> => {
    await apiClient.post("/auth/logout", { refreshToken });
  },

  refresh: async (refreshToken: string): Promise<TokenPair> => {
    const response = await apiClient.post<{ data: TokenPair }>("/auth/refresh", { refreshToken });
    return response.data.data;
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get<{ data: User }>("/users/me");
    return response.data.data;
  },
};

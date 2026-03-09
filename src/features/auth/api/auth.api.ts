import { api } from "@/lib/api-client";
import {
  LoginRequest,
  LoginResponse,
  UserProfile,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "../types/auth.types";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<{ data: LoginResponse }>("/auth/login", data);
    return response.data.data;
  },
  logout: async (refreshToken: string): Promise<void> => {
    await api.post("/auth/logout", { refreshToken });
  },
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<{ data: RegisterResponse }>("/auth/register", data);
    return response.data.data;
  },
  refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    const response = await api.post<{ data: RefreshTokenResponse }>("/auth/refresh", data);
    return response.data.data;
  },
  validateToken: async (): Promise<UserProfile | null> => {
    try {
      const response = await api.get<{ data: UserProfile }>("/users/me");
      return response.data.data;
    } catch (error) {
      return null;
    }
  },
};

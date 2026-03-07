import { api } from "@/lib/api-client";
import {
  ConfirmRegistrationRequest,
  ConfirmRegistrationResponse,
  LoginRequest,
  LoginResponse,
  TokenValidationResponse,
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
  validateToken: async (): Promise<TokenValidationResponse> => {
    try {
      const response = await api.get<{
        id: string;
        name: string;
        email: string;
        role: string;
        avatarUrl?: string;
      }>("/users/me");
      
      const { id, name, email, role, avatarUrl } = response.data;
      
      return {
        valid: true,
        userId: id,
        name,
        email,
        role,
        avatarUrl
      };
    } catch (error) {
      return {
        valid: false,
        userId: "",
        name: "",
        email: "",
        role: "",
      };
    }
  },
  confirmRegistration: async (
    data: ConfirmRegistrationRequest
  ): Promise<ConfirmRegistrationResponse> => {
    const response = await api.post<ConfirmRegistrationResponse>(
      "/auth/confirm-register",
      data
    );
    const { type, email, userId } = response.data;
    return { type, email, userId };
  },
};

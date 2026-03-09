import { z } from "zod";

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=\S+$).{8,100}$/;

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .min(1, "Email é obrigatório")
    .max(255, "O email deve ter no máximo 255 caracteres"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres")
    .regex(
      PASSWORD_REGEX,
      "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
    ),
});

export type LoginRequest = z.infer<typeof LoginSchema>;

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const RegisterSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(255),
  email: z.string().email("Email inválido").max(255),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres")
    .regex(
      PASSWORD_REGEX,
      "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
    ),
});

export type RegisterRequest = z.infer<typeof RegisterSchema>;

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

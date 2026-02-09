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
  token: string;
  type: string;
  email: string;
  userId: string;
  firmId?: string;
  role?: string;
}

export interface TokenValidationResponse {
  valid: boolean;
  name: string;
  email: string;
  userId: string;
  firmId?: string;
  role?: string;
  message: string;
}

export interface ConfirmRegistrationRequest {
  verificationToken: string;
}

export interface ConfirmRegistrationResponse {
  token: string;
  type: string;
  email: string;
  userId: string;
}

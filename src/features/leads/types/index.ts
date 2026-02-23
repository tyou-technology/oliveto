import { z } from "zod";

export enum LeadOrigin {
  NEWSLETTER = "NEWSLETTER",
  CONTACT = "CONTACT",
  RICH_MATERIAL = "RICH_MATERIAL",
  OTHER = "OTHER",
}

export interface LeadResponseDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  origin: LeadOrigin;
  isRead: boolean;
  createdAt: string; // ISO string
}

export interface UnreadLeadsCountDTO {
  count: number;
}

export interface LeadFilters {
  isRead?: boolean | null;
  page?: number;
  size?: number;
}

export interface LeadQueryParams {
  page: number;
  size: number;
  sort: string;
  isRead?: boolean;
}

export interface CreateLeadDTO {
  name: string;
  email: string;
  phone: string;
  message?: string;
  origin: LeadOrigin;
}

export const NewsletterSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório").max(100),
  email: z.string().email("Email inválido").max(100),
  phone: z.string().max(20).optional(),
});

export type NewsletterFormValues = z.infer<typeof NewsletterSchema>;

export const UpdateLeadSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório").max(100),
  email: z.string().email("Email inválido").max(100),
  phone: z.string().max(20).optional(),
});

export type UpdateLeadDTO = z.infer<typeof UpdateLeadSchema>;

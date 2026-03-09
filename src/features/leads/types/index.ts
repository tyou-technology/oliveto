import { z } from "zod";

export enum LeadOrigin {
  CONTACT_FORM = "CONTACT_FORM",
  NEWSLETTER = "NEWSLETTER",
  REFERRAL = "REFERRAL",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  GOOGLE_ADS = "GOOGLE_ADS",
  ORGANIC_SEARCH = "ORGANIC_SEARCH",
}

export enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  QUALIFIED = "QUALIFIED",
  LOST = "LOST",
  CONVERTED = "CONVERTED",
}

export interface LeadResponseDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  message: string;
  origin: LeadOrigin;
  status: LeadStatus;
  isRead: boolean;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UnreadLeadsCountDTO {
  unread: number;
}

export interface LeadFilters {
  isRead?: boolean | null;
  status?: string;
  origin?: string;
  page?: number;
  limit?: number;
}

export interface CreateLeadDTO {
  name: string;
  email: string;
  phone: string;
  message?: string;
  origin: LeadOrigin;
  company?: string;
  service?: string;
}

export const NewsletterSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório").max(100),
  email: z.string().email("Email inválido").max(100),
  phone: z.string().max(20).optional(),
});

export type NewsletterFormValues = z.infer<typeof NewsletterSchema>;

export const UpdateLeadStatusSchema = z.object({
  status: z.nativeEnum(LeadStatus),
});

export type UpdateLeadStatusDTO = z.infer<typeof UpdateLeadStatusSchema>;

export const UpdateLeadNotesSchema = z.object({
  notes: z.string().max(2000),
});

export type UpdateLeadNotesDTO = z.infer<typeof UpdateLeadNotesSchema>;

import { z } from "zod";
import { LeadStatus } from "@/lib/types/lead";

// Re-export shared types and values for feature-local convenience
export { LeadOrigin, LeadStatus } from "@/lib/types/lead";
export type {
  LeadResponseDTO,
  UnreadLeadsCountDTO,
  LeadFilters,
  CreateLeadDTO,
} from "@/lib/types/lead";

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

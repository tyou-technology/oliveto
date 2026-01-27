import { z } from "zod";

export enum ArticleStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export interface TagResponseDTO {
  id: string;
  firmId: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleResponseDTO {
  id: string;
  firmId: string;
  authorId: string;
  title: string;
  subtitle?: string;
  briefing?: string;
  content: string;
  imageUrl?: string;
  status: ArticleStatus;
  publishedAt?: string;
  tags: TagResponseDTO[];
  createdAt: string;
  updatedAt: string;
}

export const CreateArticleSchema = z.object({
  firmId: z.string().uuid(),
  authorId: z.string().uuid(),
  title: z.string().min(1, "Título é obrigatório").max(255),
  subtitle: z.string().max(255).optional(),
  briefing: z.string().optional(),
  content: z.string().min(1, "Conteúdo é obrigatório"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  status: z.nativeEnum(ArticleStatus).optional(),
  publishedAt: z.string().datetime().optional(),
  tagIds: z.array(z.string().uuid()).optional(),
});

export type CreateArticleDTO = z.infer<typeof CreateArticleSchema>;

export const UpdateArticleSchema = z.object({
  title: z.string().max(255).optional(),
  subtitle: z.string().max(255).optional(),
  briefing: z.string().optional(),
  content: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  status: z.nativeEnum(ArticleStatus).optional(),
  publishedAt: z.string().datetime().optional(),
  tagIds: z.array(z.string().uuid()).optional(),
});

export type UpdateArticleDTO = z.infer<typeof UpdateArticleSchema>;

export const CreateTagSchema = z.object({
  firmId: z.string().uuid(),
  name: z.string().min(1, "Nome da tag é obrigatório").max(100),
  description: z.string().optional(),
  color: z.string().regex(/^#([A-Fa-f0-9]{6})$/, "Cor inválida").optional(),
  icon: z.string().max(100).optional(),
});

export type CreateTagDTO = z.infer<typeof CreateTagSchema>;

export const UpdateTagSchema = z.object({
  name: z.string().max(100).optional(),
  description: z.string().optional(),
  color: z.string().regex(/^#([A-Fa-f0-9]{6})$/, "Cor inválida").optional(),
  icon: z.string().max(100).optional(),
});

export type UpdateTagDTO = z.infer<typeof UpdateTagSchema>;

import { z } from "zod";

export enum ArticleStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export interface TagResponseDTO {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleTagRelation {
  articleId: string;
  tagId: string;
  tag: TagResponseDTO;
}

export interface ArticleResponseDTO {
  id: string;
  slug?: string;
  authorId?: string;
  author?: { id: string; name: string; avatarUrl: string | null };
  title: string;
  briefing?: string;
  content?: string;
  coverUrl?: string;
  readingTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  status: ArticleStatus;
  publishedAt?: string;
  articleTags?: ArticleTagRelation[];
  tagIds?: string[];
  createdAt: string;
  updatedAt: string;
}

/** Extracts a flat array of tags from an article, regardless of API shape. */
export function getArticleTags(article: ArticleResponseDTO): TagResponseDTO[] {
  if (article.articleTags && article.articleTags.length > 0) {
    return article.articleTags.map((at) => at.tag);
  }
  return [];
}

export const CreateArticleSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(255),
  content: z.string().min(1, "Conteúdo é obrigatório").max(16777215),
  briefing: z.string().max(500).optional(),
  readingTime: z.number().int().min(1).optional(),
  tagIds: z.array(z.string()).optional(),
  coverUrl: z
    .string()
    .url()
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      "URL deve começar com http:// ou https://"
    )
    .optional()
    .or(z.literal("")),
  seoTitle: z.string().max(255).optional(),
  seoDescription: z.string().max(500).optional(),
  status: z.nativeEnum(ArticleStatus).optional().default(ArticleStatus.DRAFT),
});

export type CreateArticleDTO = z.infer<typeof CreateArticleSchema>;

export const UpdateArticleSchema = z.object({
  title: z.string().max(255).optional(),
  content: z.string().max(16777215).optional(),
  briefing: z.string().max(500).optional(),
  readingTime: z.number().int().min(1).optional(),
  status: z.nativeEnum(ArticleStatus).optional(),
  tagIds: z.array(z.string()).optional(),
  coverUrl: z
    .string()
    .url()
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      "URL deve começar com http:// ou https://"
    )
    .optional()
    .or(z.literal("")),
  seoTitle: z.string().max(255).optional(),
  seoDescription: z.string().max(500).optional(),
});

export type UpdateArticleDTO = z.infer<typeof UpdateArticleSchema>;

export const CreateTagSchema = z.object({
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

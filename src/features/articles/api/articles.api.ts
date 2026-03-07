import { api } from "@/lib/api-client";
import { env } from "@/lib/env";
import {
  ArticleResponseDTO,
  CreateArticleDTO,
  UpdateArticleDTO,
  TagResponseDTO,
  CreateTagDTO,
  UpdateTagDTO,
} from "@/lib/types/article";

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const articlesApi = {
  // Articles
  create: async (data: CreateArticleDTO): Promise<ArticleResponseDTO> => {
    const response = await api.post<ArticleResponseDTO>("/articles", data);
    return response.data;
  },

  getAll: async (page = 1, limit = 10, status?: string, tagId?: string, search?: string): Promise<PaginatedResponse<ArticleResponseDTO>> => {
    const params: any = { page, limit };
    if (status) params.status = status;
    if (tagId) params.tagId = tagId;
    if (search) params.search = search;

    const response = await api.get<PaginatedResponse<ArticleResponseDTO>>("/articles", { params });
    return response.data;
  },

  getPublished: async (page = 1, limit = 10, tagId?: string, search?: string): Promise<PaginatedResponse<ArticleResponseDTO>> => {
    const params: any = { page, limit, status: "PUBLISHED" };
    if (tagId) params.tagId = tagId;
    if (search) params.search = search;

    const response = await api.get<PaginatedResponse<ArticleResponseDTO>>("/articles", { params });
    return response.data;
  },

  getPublicPublished: async (page = 0, size = 10): Promise<any> => {
    // For app router static generation + fetch cache
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/articles?page=${page + 1}&limit=${size}&status=PUBLISHED`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch public published articles: ${response.statusText}`);
    }
    return response.json();
  },

  getPublicById: async (id: string): Promise<ArticleResponseDTO> => {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/articles/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch public article: ${response.statusText}`);
    }
    return response.json();
  },

  getPublishedTags: async (): Promise<TagResponseDTO[]> => {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/tags`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch published tags: ${response.statusText}`);
    }
    return response.json();
  },

  getBySlug: async (slug: string): Promise<ArticleResponseDTO> => {
    const response = await api.get<ArticleResponseDTO>(`/articles/slug/${slug}`);
    return response.data;
  },

  getById: async (id: string): Promise<ArticleResponseDTO> => {
    const response = await api.get<ArticleResponseDTO>(`/articles/${id}`);
    return response.data;
  },

  update: async (id: string, data: UpdateArticleDTO): Promise<ArticleResponseDTO> => {
    const response = await api.patch<ArticleResponseDTO>(`/articles/${id}`, data);
    return response.data;
  },

  publish: async (id: string): Promise<void> => {
    await api.patch(`/articles/${id}/publish`);
  },

  archive: async (id: string): Promise<void> => {
    await api.patch(`/articles/${id}/archive`);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/articles/${id}`);
  },

  // Tags
  createTag: async (data: CreateTagDTO): Promise<TagResponseDTO> => {
    const response = await api.post<TagResponseDTO>("/tags", data);
    return response.data;
  },

  getAllTags: async (): Promise<TagResponseDTO[]> => {
    const response = await api.get<TagResponseDTO[]>("/tags");
    return response.data;
  },

  getTagById: async (id: string): Promise<TagResponseDTO> => {
    const response = await api.get<TagResponseDTO>(`/tags/${id}`);
    return response.data;
  },

  updateTag: async (id: string, data: UpdateTagDTO): Promise<TagResponseDTO> => {
    const response = await api.patch<TagResponseDTO>(`/tags/${id}`, data);
    return response.data;
  },

  deleteTag: async (id: string): Promise<void> => {
    await api.delete(`/tags/${id}`);
  },
};

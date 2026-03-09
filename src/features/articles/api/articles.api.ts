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
    const response = await api.post<{ data: ArticleResponseDTO }>("/articles", data);
    return response.data.data;
  },

  getAll: async (page = 1, limit = 10, status?: string, tagId?: string, search?: string): Promise<PaginatedResponse<ArticleResponseDTO>> => {
    const params: Record<string, unknown> = { page, limit };
    if (status) params.status = status;
    if (tagId) params.tagId = tagId;
    if (search) params.search = search;

    const response = await api.get<PaginatedResponse<ArticleResponseDTO>>("/articles", { params });
    return response.data;
  },

  getPublished: async (page = 1, limit = 10, tagId?: string, search?: string): Promise<PaginatedResponse<ArticleResponseDTO>> => {
    const params: Record<string, unknown> = { page, limit };
    if (tagId) params.tagId = tagId;
    if (search) params.search = search;

    const response = await api.get<PaginatedResponse<ArticleResponseDTO>>("/articles/published", { params });
    return response.data;
  },

  getPublicPublished: async (page = 0, size = 10): Promise<PaginatedResponse<ArticleResponseDTO>> => {
    // For app router static generation + fetch cache
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/articles/published?page=${page + 1}&limit=${size}`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch public published articles: ${response.statusText}`);
    }
    return response.json();
  },

  getPublicBySlug: async (slug: string): Promise<ArticleResponseDTO> => {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/articles/slug/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch public article by slug: ${response.statusText}`);
    }
    const json = await response.json();
    return json.data;
  },

  getPublishedTags: async (): Promise<TagResponseDTO[]> => {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/tags`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch published tags: ${response.statusText}`);
    }
    const json = await response.json();
    return json.data;
  },

  getBySlug: async (slug: string): Promise<ArticleResponseDTO> => {
    const response = await api.get<{ data: ArticleResponseDTO }>(`/articles/slug/${slug}`);
    return response.data.data;
  },

  getById: async (id: string): Promise<ArticleResponseDTO> => {
    const response = await api.get<{ data: ArticleResponseDTO }>(`/articles/${id}`);
    return response.data.data;
  },

  update: async (id: string, data: UpdateArticleDTO): Promise<ArticleResponseDTO> => {
    const response = await api.patch<{ data: ArticleResponseDTO }>(`/articles/${id}`, data);
    return response.data.data;
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
    const response = await api.post<{ data: TagResponseDTO }>("/tags", data);
    return response.data.data;
  },

  getAllTags: async (): Promise<TagResponseDTO[]> => {
    const response = await api.get<{ data: TagResponseDTO[] }>("/tags");
    return response.data.data;
  },

  getTagById: async (id: string): Promise<TagResponseDTO> => {
    const response = await api.get<{ data: TagResponseDTO }>(`/tags/${id}`);
    return response.data.data;
  },

  updateTag: async (id: string, data: UpdateTagDTO): Promise<TagResponseDTO> => {
    const response = await api.patch<{ data: TagResponseDTO }>(`/tags/${id}`, data);
    return response.data.data;
  },

  deleteTag: async (id: string): Promise<void> => {
    await api.delete(`/tags/${id}`);
  },
};

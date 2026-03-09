import { apiClient } from "@/lib/api/client";
import { env } from "@/lib/env";
import { ApiListResponse } from "@/lib/types/api.types";
import {
  ArticleResponseDTO,
  CreateArticleDTO,
  UpdateArticleDTO,
  TagResponseDTO,
  CreateTagDTO,
  UpdateTagDTO,
} from "@/lib/types/article";

export const articlesService = {
  // Articles
  create: async (data: CreateArticleDTO): Promise<ArticleResponseDTO> => {
    const response = await apiClient.post<{ data: ArticleResponseDTO }>("/articles", data);
    return response.data.data;
  },

  getAll: async (
    page = 1,
    limit = 10,
    status?: string,
    tagId?: string,
    search?: string
  ): Promise<ApiListResponse<ArticleResponseDTO>> => {
    const params: Record<string, unknown> = { page, limit };
    if (status) params.status = status;
    if (tagId) params.tagId = tagId;
    if (search) params.search = search;

    const response = await apiClient.get<ApiListResponse<ArticleResponseDTO>>("/articles", { params });
    return response.data;
  },

  getPublished: async (
    page = 1,
    limit = 10,
    tagId?: string,
    search?: string
  ): Promise<ApiListResponse<ArticleResponseDTO>> => {
    const params: Record<string, unknown> = { page, limit };
    if (tagId) params.tagId = tagId;
    if (search) params.search = search;

    const response = await apiClient.get<ApiListResponse<ArticleResponseDTO>>("/articles/published", { params });
    return response.data;
  },

  // Static generation variants using native fetch with ISR cache.
  // Uses API_INTERNAL_URL when set (e.g. WSL2/Docker where the Next.js server
  // can't reach the public localhost URL) and falls back to NEXT_PUBLIC_API_URL.
  getPublicPublished: async (page = 0, size = 10): Promise<ApiListResponse<ArticleResponseDTO>> => {
    const base = env.API_INTERNAL_URL ?? env.NEXT_PUBLIC_API_URL;
    const response = await fetch(
      `${base}/articles/published?page=${page + 1}&limit=${size}`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch published articles: ${response.statusText}`);
    }
    return response.json();
  },

  getPublicBySlug: async (slug: string): Promise<ArticleResponseDTO> => {
    const base = env.API_INTERNAL_URL ?? env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${base}/articles/slug/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch article by slug: ${response.statusText}`);
    }
    const json: { data: ArticleResponseDTO } = await response.json();
    return json.data;
  },

  getPublishedTags: async (): Promise<TagResponseDTO[]> => {
    const base = env.API_INTERNAL_URL ?? env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${base}/tags`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.statusText}`);
    }
    const json: { data: TagResponseDTO[] } = await response.json();
    return json.data;
  },

  getBySlug: async (slug: string): Promise<ArticleResponseDTO> => {
    const response = await apiClient.get<{ data: ArticleResponseDTO }>(`/articles/slug/${slug}`);
    return response.data.data;
  },

  getById: async (id: string): Promise<ArticleResponseDTO> => {
    const response = await apiClient.get<{ data: ArticleResponseDTO }>(`/articles/${id}`);
    return response.data.data;
  },

  update: async (id: string, data: UpdateArticleDTO): Promise<ArticleResponseDTO> => {
    const response = await apiClient.patch<{ data: ArticleResponseDTO }>(`/articles/${id}`, data);
    return response.data.data;
  },

  publish: async (id: string): Promise<void> => {
    await apiClient.patch(`/articles/${id}/publish`);
  },

  archive: async (id: string): Promise<void> => {
    await apiClient.patch(`/articles/${id}/archive`);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/articles/${id}`);
  },

  // Tags
  createTag: async (data: CreateTagDTO): Promise<TagResponseDTO> => {
    const response = await apiClient.post<{ data: TagResponseDTO }>("/tags", data);
    return response.data.data;
  },

  getAllTags: async (): Promise<TagResponseDTO[]> => {
    const response = await apiClient.get<{ data: TagResponseDTO[] }>("/tags");
    return response.data.data;
  },

  getTagById: async (id: string): Promise<TagResponseDTO> => {
    const response = await apiClient.get<{ data: TagResponseDTO }>(`/tags/${id}`);
    return response.data.data;
  },

  updateTag: async (id: string, data: UpdateTagDTO): Promise<TagResponseDTO> => {
    const response = await apiClient.patch<{ data: TagResponseDTO }>(`/tags/${id}`, data);
    return response.data.data;
  },

  deleteTag: async (id: string): Promise<void> => {
    await apiClient.delete(`/tags/${id}`);
  },
};

import { api } from "@/lib/api-client";
import {
  ArticleResponseDTO,
  CreateArticleDTO,
  UpdateArticleDTO,
  TagResponseDTO,
  CreateTagDTO,
  UpdateTagDTO,
} from "@/lib/types/article";

interface PaginatedResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export const articlesApi = {
  // Articles
  create: async (data: CreateArticleDTO): Promise<ArticleResponseDTO> => {
    const response = await api.post<ArticleResponseDTO>("/articles", data);
    return response.data;
  },

  count: async (): Promise<number> => {
    const response = await api.get<number>("/articles/count");
    return response.data;
  },

  getAllByFirmId: async (firmId: string, page = 0, size = 10): Promise<PaginatedResponse<ArticleResponseDTO>> => {
    const response = await api.get<PaginatedResponse<ArticleResponseDTO>>(`/articles/by-firm/${firmId}`, {
      params: { page, size },
    });
    return response.data;
  },

  getPublishedByFirmId: async (firmId: string, page = 0, size = 10): Promise<PaginatedResponse<ArticleResponseDTO>> => {
    const response = await api.get<PaginatedResponse<ArticleResponseDTO>>(`/articles/published/by-firm/${firmId}`, {
      params: { page, size },
    });
    return response.data;
  },

  getById: async (id: string): Promise<ArticleResponseDTO> => {
    const response = await api.get<ArticleResponseDTO>(`/articles/${id}`);
    return response.data;
  },

  update: async (id: string, data: UpdateArticleDTO): Promise<ArticleResponseDTO> => {
    const response = await api.put<ArticleResponseDTO>(`/articles/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/articles/${id}`);
  },

  addTag: async (articleId: string, tagId: string): Promise<ArticleResponseDTO> => {
    const response = await api.post<ArticleResponseDTO>(`/articles/${articleId}/tags`, { tagId });
    return response.data;
  },

  removeTag: async (articleId: string, tagId: string): Promise<ArticleResponseDTO> => {
    const response = await api.delete<ArticleResponseDTO>(`/articles/${articleId}/tags/${tagId}`);
    return response.data;
  },

  // Tags
  createTag: async (data: CreateTagDTO): Promise<TagResponseDTO> => {
    const response = await api.post<TagResponseDTO>("/tags", data);
    return response.data;
  },

  getAllTagsByFirmId: async (firmId: string, page = 0, size = 100): Promise<{ content: TagResponseDTO[] }> => {
    const response = await api.get<{ content: TagResponseDTO[] }>(`/tags/by-firm/${firmId}`, {
      params: { page, size },
    });
    return response.data;
  },

  getPublishedTagsByFirmId: async (firmId: string, page = 0, size = 100): Promise<{ content: TagResponseDTO[] }> => {
    const response = await api.get<{ content: TagResponseDTO[] }>(`/tags/published/by-firm/${firmId}`, {
      params: { page, size },
    });
    return response.data;
  },

  updateTag: async (id: string, data: UpdateTagDTO): Promise<TagResponseDTO> => {
    const response = await api.put<TagResponseDTO>(`/tags/${id}`, data);
    return response.data;
  },

  deleteTag: async (id: string): Promise<void> => {
    await api.delete(`/tags/${id}`);
  },
};

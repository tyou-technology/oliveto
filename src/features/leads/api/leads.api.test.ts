import { describe, it, expect, vi, beforeEach } from "vitest";
import { leadsApi } from "./leads.api";
import { api } from "@/lib/api-client";

// Mock the API client
vi.mock("@/lib/api-client", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("leadsApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("findAll", () => {
    it("should call api.get with correct params when no filters provided", async () => {
      // Arrange
      const mockResponse = {
        data: {
          content: [],
          page: {
            size: 10,
            number: 0,
            totalElements: 0,
            totalPages: 0,
          },
        },
      };
      (api.get as any).mockResolvedValue(mockResponse);

      // Act
      await leadsApi.findAll();

      // Assert
      expect(api.get).toHaveBeenCalledWith("/leads", {
        params: {
          page: 0,
          size: 10,
          sort: "createdAt,desc",
        },
      });
    });

    it("should call api.get with correct params including isRead when provided", async () => {
      // Arrange
      const mockResponse = {
        data: {
          content: [],
          page: {
            size: 20,
            number: 1,
            totalElements: 10,
            totalPages: 1,
          },
        },
      };
      (api.get as any).mockResolvedValue(mockResponse);

      // Act
      await leadsApi.findAll(1, 20, true);

      // Assert
      expect(api.get).toHaveBeenCalledWith("/leads", {
        params: {
          page: 1,
          size: 20,
          sort: "createdAt,desc",
          isRead: true,
        },
      });
    });

    it("should call api.get with correct params when isRead is explicitly false", async () => {
      // Arrange
      const mockResponse = {
        data: {
          content: [],
          page: {
            size: 10,
            number: 0,
            totalElements: 0,
            totalPages: 0,
          },
        },
      };
      (api.get as any).mockResolvedValue(mockResponse);

      // Act
      await leadsApi.findAll(0, 10, false);

      // Assert
      expect(api.get).toHaveBeenCalledWith("/leads", {
        params: {
          page: 0,
          size: 10,
          sort: "createdAt,desc",
          isRead: false,
        },
      });
    });

    it("should ignore isRead if it is null or undefined", async () => {
       // Arrange
      const mockResponse = {
        data: {
          content: [],
          page: {
            size: 10,
            number: 0,
            totalElements: 0,
            totalPages: 0,
          },
        },
      };
      (api.get as any).mockResolvedValue(mockResponse);

      // Act
      await leadsApi.findAll(0, 10, null);

      // Assert
      expect(api.get).toHaveBeenCalledWith("/leads", {
        params: {
          page: 0,
          size: 10,
          sort: "createdAt,desc",
        },
      });
    });
  });
});

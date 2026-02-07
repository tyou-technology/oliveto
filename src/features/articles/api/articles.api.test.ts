import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock env
vi.mock("@/lib/env", () => ({
  env: {
    NEXT_PUBLIC_API_URL: "https://api.example.com",
    NEXT_PUBLIC_FIRM_ID: "00000000-0000-0000-0000-000000000000"
  }
}));

// Mock api client to avoid actual axios calls during test if functionality isn't replaced yet
vi.mock("@/lib/api-client", () => ({
  api: {
    get: vi.fn(),
  }
}));

import { articlesApi } from "./articles.api";

describe("articlesApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getPublishedTagsByFirmId", () => {
    it("should use fetch with correct URL and revalidate option", async () => {
      const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({ content: [] }),
      } as Response);

      const firmId = "12345678-1234-1234-1234-1234567890ab";
      const page = 1;
      const size = 50;

      await articlesApi.getPublishedTagsByFirmId(firmId, page, size);

      // URL search params order might vary if not careful, but typically reliable in Node/Browser implementations
      // We check if it contains the base and params
      const expectedUrl = `https://api.example.com/tags/published/by-firm/${firmId}?page=${page}&size=${size}`;

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [url, options] = fetchSpy.mock.calls[0];

      expect(url.toString()).toBe(expectedUrl);
      expect(options).toEqual({
        next: { revalidate: 3600 },
      });
    });

    it("should throw error when response is not ok", async () => {
       vi.spyOn(global, "fetch").mockResolvedValue({
        ok: false,
        statusText: "Server Error",
      } as Response);

      const firmId = "12345678-1234-1234-1234-1234567890ab";

      await expect(articlesApi.getPublishedTagsByFirmId(firmId))
        .rejects.toThrow("Failed to fetch published tags: Server Error");
    });
  });
});

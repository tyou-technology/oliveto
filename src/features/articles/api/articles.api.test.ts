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

  it("should be defined", () => {
    expect(articlesApi).toBeDefined();
  });
});

import { describe, it, expect } from "vitest";
import { envSchema } from "./env";

describe("Environment Variables Schema", () => {
  const validBase = {
    NODE_ENV: "test",
    NEXT_PUBLIC_APP_ENV: "test",
    NEXT_PUBLIC_FIRM_ID: "00000000-0000-0000-0000-000000000000",
    NEXT_PUBLIC_CLIENT_TOKEN: "valid-token",
  };

  it("should accept valid http URL", () => {
    const result = envSchema.safeParse({
      ...validBase,
      NEXT_PUBLIC_API_URL: "http://api.example.com",
    });
    expect(result.success).toBe(true);
  });

  it("should accept valid https URL", () => {
    const result = envSchema.safeParse({
      ...validBase,
      NEXT_PUBLIC_API_URL: "https://api.example.com",
    });
    expect(result.success).toBe(true);
  });

  it("should reject javascript protocol", () => {
    const result = envSchema.safeParse({
      ...validBase,
      NEXT_PUBLIC_API_URL: "javascript:alert(1)",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("URL must use http or https protocol");
    }
  });

  it("should reject ftp protocol", () => {
    const result = envSchema.safeParse({
      ...validBase,
      NEXT_PUBLIC_API_URL: "ftp://example.com",
    });
    expect(result.success).toBe(false);
  });

  it("should reject data protocol", () => {
    const result = envSchema.safeParse({
      ...validBase,
      NEXT_PUBLIC_API_URL: "data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid URL format", () => {
    const result = envSchema.safeParse({
      ...validBase,
      NEXT_PUBLIC_API_URL: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty client token", () => {
    const result = envSchema.safeParse({
      ...validBase,
      NEXT_PUBLIC_API_URL: "http://api.example.com",
      NEXT_PUBLIC_CLIENT_TOKEN: "",
    });
    expect(result.success).toBe(false);
  });
});

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { authApi } from "./auth.api";
import { api } from "@/lib/api-client";
import MockAdapter from "axios-mock-adapter";

describe("Auth API Sanitization", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  it("should sanitize login response by removing extra fields", async () => {
    const sensitiveData = {
      token: "valid-token",
      type: "Bearer",
      email: "test@example.com",
      userId: "123",
      firmId: "firm-1",
      role: "admin",
      // Sensitive fields that should be removed
      internal_secret: "secret-123",
      hashed_password: "hashed-password",
    };

    mock.onPost("/auth/login").reply(200, sensitiveData);

    const response = await authApi.login({
      email: "test@example.com",
      password: "Password1!",
    });

    // Standard fields should be present
    expect(response).toHaveProperty("type", "Bearer");
    expect(response).toHaveProperty("email", "test@example.com");
    expect(response).toHaveProperty("userId", "123");
    expect(response).toHaveProperty("firmId", "firm-1");
    expect(response).toHaveProperty("role", "admin");

    // Sensitive fields should be removed
    // Currently, this will FAIL because the code returns `rest` which includes everything except `token`
    expect(response).not.toHaveProperty("internal_secret");
    expect(response).not.toHaveProperty("hashed_password");

    // Token is removed by the existing code
    expect(response).not.toHaveProperty("token");
  });

  it("should sanitize validateToken response by removing extra fields", async () => {
    const sensitiveData = {
      valid: true,
      name: "Test User",
      email: "test@example.com",
      userId: "123",
      firmId: "firm-1",
      role: "admin",
      message: "Valid token",
      // Sensitive fields
      internal_debug: "debug-info",
    };

    mock.onGet("/auth/validate").reply(200, sensitiveData);

    const response = await authApi.validateToken();

    expect(response).toHaveProperty("valid", true);
    expect(response).not.toHaveProperty("internal_debug");
  });

  it("should sanitize confirmRegistration response by removing extra fields", async () => {
    const sensitiveData = {
      token: "new-token",
      type: "Bearer",
      email: "test@example.com",
      userId: "123",
      // Sensitive fields
      verification_code: "123456",
    };

    mock.onPost("/auth/confirm-register").reply(200, sensitiveData);

    const response = await authApi.confirmRegistration({
      verificationToken: "token-123",
    });

    expect(response).toHaveProperty("userId", "123");
    expect(response).not.toHaveProperty("verification_code");
    expect(response).not.toHaveProperty("token");
  });
});

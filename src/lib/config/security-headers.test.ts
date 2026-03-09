import { describe, it, expect } from "vitest";
import { getSecurityHeaders } from "./security-headers.mjs";

describe("getSecurityHeaders", () => {
  it("should return the correct security headers", () => {
    const headers = getSecurityHeaders();
    const headersMap = new Map(headers.map((h) => [h.key, h.value]));

    expect(headersMap.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headersMap.get("Referrer-Policy")).toBe(
      "strict-origin-when-cross-origin"
    );
    expect(headersMap.get("Permissions-Policy")).toBe(
      "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()"
    );
    expect(headersMap.get("Strict-Transport-Security")).toContain(
      "max-age=63072000"
    );
    expect(headersMap.get("X-Frame-Options")).toBe("DENY");
    expect(headersMap.get("X-Permitted-Cross-Domain-Policies")).toBe("none");
    expect(headersMap.get("X-DNS-Prefetch-Control")).toBe("off");
  });
});

import { describe, it, expect } from "vitest";
import { CreateArticleSchema, UpdateArticleSchema } from "@/lib/types/article";

describe("Article Schema Security", () => {
  const validArticle = {
    authorId: "123e4567-e89b-12d3-a456-426614174000",
    title: "Valid Title",
    content: "Valid Content",
  };

  describe("CreateArticleSchema", () => {
    it("should reject javascript: protocol in imageUrl", () => {
      const data = { ...validArticle, imageUrl: "javascript:alert(1)" };
      const result = CreateArticleSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("URL deve começar com http:// ou https://");
      }
    });

    it("should reject data: protocol in imageUrl", () => {
      const data = { ...validArticle, imageUrl: "data:text/html,<script>alert(1)</script>" };
      const result = CreateArticleSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject vbscript: protocol in imageUrl", () => {
      const data = { ...validArticle, imageUrl: "vbscript:msgbox(1)" };
      const result = CreateArticleSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should accept http protocol in imageUrl", () => {
      const data = { ...validArticle, imageUrl: "http://google.com/image.jpg" };
      const result = CreateArticleSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should accept https protocol in imageUrl", () => {
      const data = { ...validArticle, imageUrl: "https://google.com/image.jpg" };
      const result = CreateArticleSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should accept empty imageUrl (optional)", () => {
      const data = { ...validArticle, imageUrl: "" };
      const result = CreateArticleSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("UpdateArticleSchema", () => {
    it("should reject javascript: protocol in imageUrl", () => {
      const data = { imageUrl: "javascript:alert(1)" };
      const result = UpdateArticleSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should accept https protocol in imageUrl", () => {
      const data = { imageUrl: "https://google.com/image.jpg" };
      const result = UpdateArticleSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});

import { describe, it, expect } from 'vitest';
import { CreateArticleSchema, UpdateArticleSchema, ArticleStatus } from './article';

describe('Article Schemas', () => {
  const validUUID = '123e4567-e89b-12d3-a456-426614174000';

  describe('CreateArticleSchema', () => {
    it('should validate a valid article', () => {
      const validData = {
        firmId: validUUID,
        authorId: validUUID,
        title: 'Valid Title',
        content: 'Valid Content',
        status: ArticleStatus.DRAFT,
      };
      const result = CreateArticleSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail if content exceeds max length (16,777,215)', () => {
      const invalidData = {
        firmId: validUUID,
        authorId: validUUID,
        title: 'Valid Title',
        content: 'a'.repeat(16777216), // Exceeds limit by 1
        status: ArticleStatus.DRAFT,
      };
      const result = CreateArticleSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe('too_big');
      }
    });

    it('should fail if briefing exceeds max length (500)', () => {
      const invalidData = {
        firmId: validUUID,
        authorId: validUUID,
        title: 'Valid Title',
        content: 'Valid Content',
        briefing: 'a'.repeat(501), // Exceeds limit by 1
        status: ArticleStatus.DRAFT,
      };
      const result = CreateArticleSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe('too_big');
      }
    });
  });

  describe('UpdateArticleSchema', () => {
    it('should validate a valid update', () => {
      const validData = {
        title: 'Updated Title',
        content: 'Updated Content',
      };
      const result = UpdateArticleSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail if content exceeds max length (16,777,215)', () => {
      const invalidData = {
        content: 'a'.repeat(16777216), // Exceeds limit by 1
      };
      const result = UpdateArticleSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe('too_big');
      }
    });

    it('should fail if briefing exceeds max length (500)', () => {
      const invalidData = {
        briefing: 'a'.repeat(501), // Exceeds limit by 1
      };
      const result = UpdateArticleSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe('too_big');
      }
    });
  });
});

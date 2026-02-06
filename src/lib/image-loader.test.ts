import { describe, it, expect } from 'vitest';
import cloudinaryLoader from './image-loader';

describe('cloudinaryLoader', () => {
  it('should handle full URLs by using fetch', () => {
    const src = 'http://example.com/image.jpg';
    const result = cloudinaryLoader({ src, width: 800 });
    expect(result).toContain('image/fetch');
    expect(result).toContain(src);
  });

  it('should prepend oliveto/ if missing', () => {
    const src = 'socios';
    const result = cloudinaryLoader({ src, width: 800 });
    expect(result).toContain('image/upload');
    expect(result).toContain('oliveto/socios');
  });

  it('should not prepend oliveto/ if already present', () => {
    const src = 'oliveto/logo';
    const result = cloudinaryLoader({ src, width: 800 });
    expect(result).toContain('image/upload');
    expect(result).toContain('oliveto/logo');
    expect(result).not.toContain('oliveto/oliveto/logo');
  });

  it('should strip leading slash and prepend oliveto/', () => {
    const src = '/logo.png';
    const result = cloudinaryLoader({ src, width: 800 });
    expect(result).toContain('oliveto/logo.png');
  });

  it('should include optimization params', () => {
    const src = 'oliveto/test';
    const result = cloudinaryLoader({ src, width: 100, quality: 75 });
    expect(result).toContain('f_auto');
    expect(result).toContain('q_75');
    expect(result).toContain('w_100');
  });
});

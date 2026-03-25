import { http, HttpResponse } from 'msw';
import { env } from '@/lib/env';
import { ArticleResponseDTO, ArticleStatus } from '@/lib/types/article';

const apiUrl = (path: string) => {
  return `${env.NEXT_PUBLIC_API_URL}${path}`;
};

export const handlers = [
  // Auth Handlers
  http.post(apiUrl('/auth/login'), async ({ request }) => {
    const { email } = await request.json() as { email: string };

    if (email === 'test@example.com') {
      return HttpResponse.json({
        type: 'Bearer',
        accessToken: 'mock-access-token',
        expiresIn: 3600,
      });
    }

    return new HttpResponse(null, { status: 401 });
  }),

  // Cookie-based refresh — no request body
  http.post(apiUrl('/auth/refresh'), () => {
    return HttpResponse.json({
      type: 'Bearer',
      accessToken: 'mock-refreshed-access-token',
      expiresIn: 3600,
    });
  }),

  http.post(apiUrl('/auth/logout'), () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Article Handlers
  http.get(apiUrl('/articles'), ({ request }) => {
    if (!request.headers.get('X-Client-Token')) {
      return new HttpResponse(null, { status: 400, statusText: 'Missing X-Client-Token' });
    }

    const mockArticles = {
      data: [
        {
          id: 'article-1',
          title: 'Test Article 1',
          content: 'Content 1',
          status: ArticleStatus.PUBLISHED,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'article-2',
          title: 'Test Article 2',
          content: 'Content 2',
          status: ArticleStatus.DRAFT,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ],
      meta: {
        limit: 10,
        page: 1,
        total: 2,
        totalPages: 1
      }
    };

    return HttpResponse.json(mockArticles);
  }),
];

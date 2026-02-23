import { http, HttpResponse } from 'msw';
import { env } from '@/lib/env';
import { LoginResponse } from '@/features/auth/types/auth.types';
import { ArticleResponseDTO, ArticleStatus } from '@/lib/types/article';

const apiUrl = (path: string) => {
  return `${env.NEXT_PUBLIC_API_URL}${path}`;
};

export const handlers = [
  // Auth Handlers
  http.post(apiUrl('/auth/login'), async ({ request }) => {
    // Validate that X-Client-Token is present (Integration/Contract Check)
    if (!request.headers.get('X-Client-Token')) {
      return new HttpResponse(null, { status: 400, statusText: 'Missing X-Client-Token' });
    }

    const { email } = await request.json() as { email: string };

    if (email === 'test@example.com') {
      const mockResponse: LoginResponse = {
        type: 'Bearer',
        email: 'test@example.com',
        userId: 'user-123',
        firmId: 'firm-123',
        role: 'ADMIN',
      };

      // Return a successful response with a cookie (simulating HttpOnly cookie)
      return HttpResponse.json(mockResponse, {
        headers: {
          'Set-Cookie': 'auth_token=mock-jwt-token; Path=/; HttpOnly',
        },
      });
    }

    return new HttpResponse(null, { status: 401 });
  }),

  // Article Handlers
  http.get(apiUrl('/articles/by-firm/:firmId'), ({ params, request }) => {
    if (!request.headers.get('X-Client-Token')) {
      return new HttpResponse(null, { status: 400, statusText: 'Missing X-Client-Token' });
    }

    const { firmId } = params;

    const mockArticles: { content: ArticleResponseDTO[]; page: any } = {
      content: [
        {
          id: 'article-1',
          firmId: firmId as string,
          title: 'Test Article 1',
          content: 'Content 1',
          status: ArticleStatus.PUBLISHED,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'article-2',
          firmId: firmId as string,
          title: 'Test Article 2',
          content: 'Content 2',
          status: ArticleStatus.DRAFT,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ],
      page: {
        size: 10,
        number: 0,
        totalElements: 2,
        totalPages: 1
      }
    };

    return HttpResponse.json(mockArticles);
  }),
];

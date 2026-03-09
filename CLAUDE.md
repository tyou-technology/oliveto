# Oliveto Front-end — Project Guide

## Overview

Site institucional da **Oliveto Contabilidade**, especializado em Perícia Contábil, Auditoria e Consultoria. Construído com **Next.js 16 + React 19 + TypeScript 5 + Tailwind CSS 4**. Todo o conteúdo público está em **Português Brasileiro**; variáveis de ambiente, nomes de componentes, funções e comentários de código devem estar em **inglês**.

```
oliveto-contabilidade/
├── src/
│   ├── app/                        # Next.js App Router — páginas, layouts, rotas de API
│   │   ├── (public)/               # Grupo de rotas públicas (site institucional)
│   │   ├── (dashboard)/            # Grupo de rotas protegidas (painel admin)
│   │   ├── api/                    # Route Handlers do Next.js
│   │   ├── globals.css             # Tokens CSS globais, reset, tipografia base
│   │   └── layout.tsx              # RootLayout — providers, fonts, metadata
│   ├── components/                 # Biblioteca de componentes (Atomic Design)
│   │   ├── atoms/                  # Primitivos sem dependências de negócio
│   │   ├── molecules/              # Composições de átomos
│   │   ├── organisms/              # Seções e blocos complexos
│   │   ├── templates/              # Layouts de página sem dados reais
│   │   └── ui/                     # Componentes shadcn/ui (não editar diretamente)
│   ├── config/                     # Constantes de ambiente, metadata, rotas, temas
│   ├── features/                   # Fatias de funcionalidade (co-locate tudo de um domínio)
│   │   ├── articles/               # Feed do blog, detalhe de artigo
│   │   ├── leads/                  # Formulário de captura, confirmação
│   │   └── auth/                   # Login, refresh, store de sessão
│   ├── hooks/                      # Hooks reutilizáveis independentes de domínio
│   ├── lib/                        # Clientes externos (axios, queryClient) e helpers puros
│   │   ├── api/                    # Instância Axios + interceptors
│   │   ├── query/                  # queryClient, defaultOptions
│   │   └── utils/                  # cn(), formatDate(), masks, sanitize
│   ├── services/                   # Chamadas HTTP organizadas por recurso
│   │   ├── articles.service.ts
│   │   ├── leads.service.ts
│   │   └── auth.service.ts
│   ├── store/                      # Stores Zustand (auth, ui)
│   ├── styles/                     # Tokens adicionais, keyframes, variantes
│   └── types/                      # Tipos globais e enums partilhados
├── public/                         # Assets estáticos — imagens, fonts locais, robots.txt
├── test/                           # Vitest unit + Integration (MSW)
│   ├── setup.ts
│   └── __mocks__/
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── vitest.config.ts
└── CLAUDE.md
```

**Dependências cruzadas:** `features/*` → `services/*` → `lib/api`. `components/*` nunca importa de `features/*`.

---

## Tech Stack

| Camada           | Tecnologia                                                |
| ---------------- | --------------------------------------------------------- |
| Framework        | Next.js 16 (App Router), React 19, TypeScript 5           |
| Estilização      | Tailwind CSS 4, shadcn/ui (Radix UI), CVA, tailwind-merge |
| Animação         | Framer Motion 12                                          |
| Formulários      | React Hook Form 7 + Zod 3                                 |
| Dados remotos    | TanStack React Query 5                                    |
| Estado global    | Zustand 5                                                 |
| HTTP             | Axios 1                                                   |
| Editor de texto  | Tiptap 2 (artigos do blog — somente no painel admin)      |
| Tabelas          | TanStack React Table 8                                    |
| Gráficos         | Recharts 2                                                |
| Datas            | date-fns 4                                                |
| Sanitização HTML | isomorphic-dompurify                                      |
| Testes           | Vitest 4 + Testing Library + MSW 2                        |
| Analytics        | Vercel Analytics                                          |
| Monitoramento    | Sentry                                                    |
| Deploy           | Vercel / Docker                                           |

---

## Variáveis de Ambiente

| Variável                         | Finalidade                               | Padrão / Exemplo            |
| -------------------------------- | ---------------------------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL`            | Base URL da Oliveto API                  | `http://localhost:3001`     |
| `NEXT_PUBLIC_SITE_URL`           | URL canônica do site                     | `https://oliveto.com.br`    |
| `NEXT_PUBLIC_GA_ID`              | Google Analytics 4 Measurement ID        | `G-XXXXXXXXXX`              |
| `NEXT_PUBLIC_SENTRY_DSN`         | DSN público do Sentry (client-side)      | `https://xxx@sentry.io/yyy` |
| `SENTRY_AUTH_TOKEN`              | Token do Sentry para upload de sourcemap | `sntrys_xxxxx`              |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v3 site key             | `6LdXXXXXXXXXXXXXXXXX`      |
| `REVALIDATE_SECRET`              | Token para revalidação on-demand         | min 32 chars                |

> Nunca comite valores sensíveis. Use `.env.local` localmente; variáveis de ambiente da plataforma em produção. Copie `.env.example` para `.env.local` ao fazer setup.

Prefixo `NEXT_PUBLIC_` expõe a variável ao browser. Variáveis sem esse prefixo são somente servidor.

---

## Estrutura de Componentes — Atomic Design

### Hierarquia

```
atoms/       → Sem estado de negócio. Sem chamadas HTTP. Sem imports de features/.
molecules/   → Compõe átomos. Pode ter estado local leve (hover, open).
organisms/   → Compõe moléculas e átomos. Pode receber dados via props de features/.
templates/   → Define o layout da página. Recebe slots/children. Sem dados reais.
features/    → Smart components: fazem fetch, usam stores, orquestram organismos.
```

**Regra de ouro:** a dependência flui para baixo. Atoms nunca importam molecules. Features nunca são importadas por components.

### Layout interno de cada componente

```
components/organisms/hero-section/
├── hero-section.tsx          # Componente principal
├── hero-section.test.tsx     # Testes co-localizados
├── hero-section.types.ts     # Props e variantes tipadas
└── index.ts                  # Barrel export
```

### Barrel exports

Cada pasta de componente expõe apenas o necessário:

```typescript
// components/atoms/button/index.ts
export { Button } from "./button";
export type { ButtonProps } from "./button.types";
```

Nunca importe de um caminho interno: `import { Button } from '@/components/atoms/button/button'`.

---

## Estrutura de Features

Cada feature é auto-contida. Co-locate tudo que pertence a um domínio:

```
features/leads/
├── components/              # Componentes exclusivos desta feature
│   └── lead-form/
├── hooks/                   # Hooks de dados e estado desta feature
│   └── use-create-lead.ts   # Wrapper React Query (useMutation)
├── schemas/                 # Schemas Zod de validação
│   └── lead.schema.ts
├── types/                   # Tipos e interfaces desta feature
│   └── lead.types.ts
└── index.ts                 # Re-exporta apenas o necessário
```

---

## Padrões de Design

### 1. Sem Strings Literais no Código

Rotas, mensagens de erro, chaves de query, nomes de cookie e action names vivem em constantes.

```typescript
// ✅
import { ROUTES } from "@/config/routes";
import { QUERY_KEYS } from "@/config/query-keys";

router.push(ROUTES.ARTICLES.DETAIL(slug));
useQuery({ queryKey: QUERY_KEYS.ARTICLES.LIST(filters) });

// ❌
router.push(`/artigos/${slug}`);
useQuery({ queryKey: ["articles", filters] });
```

### 2. Variantes com CVA

Toda variação visual de componente usa `class-variance-authority`. Nada de ternários de classe espalhados no JSX.

```typescript
// ✅
const buttonVariants = cva('base-classes', {
  variants: {
    intent: { primary: '...', ghost: '...' },
    size:   { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: { intent: 'primary', size: 'md' },
});

// ❌
<button className={`btn ${isPrimary ? 'btn-primary' : 'btn-ghost'} ${isLarge ? 'btn-lg' : ''}`} />
```

### 3. cn() para Merging de Classes

Use sempre `cn()` (`clsx` + `tailwind-merge`) para combinar classes condicionalmente.

```typescript
import { cn } from '@/lib/utils/cn';

<div className={cn('base', isActive && 'active', className)} />
```

### 4. Formulários: React Hook Form + Zod

Todo formulário usa `useForm` com `zodResolver`. Nunca valide manualmente no handler.

```typescript
const schema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().regex(BR_PHONE_REGEX, "Telefone inválido").optional(),
});

type LeadFormValues = z.infer<typeof schema>;

const form = useForm<LeadFormValues>({ resolver: zodResolver(schema) });
```

### 5. Dados Remotos: React Query

Toda busca de dados remota usa React Query. Nenhum `useEffect` com `fetch`/`axios` solto.

```typescript
// Hook de query
export function useArticles(filters: ArticleFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.ARTICLES.LIST(filters),
    queryFn: () => articlesService.list(filters),
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

// Hook de mutation
export function useCreateLead() {
  return useMutation({
    mutationFn: leadsService.create,
    onSuccess: () => {
      toast.success("Mensagem enviada com sucesso!");
    },
  });
}
```

### 6. Estado Global: Zustand

Apenas estado verdadeiramente global vive no Zustand (sessão de auth, preferências de UI). Dados de servidor ficam no React Query.

```typescript
// store/auth.store.ts
interface AuthState {
  user: User | null;
  tokens: TokenPair | null;
  setSession: (user: User, tokens: TokenPair) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      setSession: (user, tokens) => set({ user, tokens }),
      clearSession: () => set({ user: null, tokens: null }),
    }),
    { name: "oliveto-auth" },
  ),
);
```

### 7. Sanitização de HTML do Blog

Todo conteúdo HTML gerado pelo Tiptap e retornado pela API deve ser sanitizado antes de renderizar.

```typescript
import DOMPurify from 'isomorphic-dompurify';

function ArticleBody({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  return <div className="prose" dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

### 8. Axios — Instância Única com Interceptors

Nunca crie `axios.create()` em componentes. Use apenas a instância de `@/lib/api`.

```typescript
// lib/api/client.ts
export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Interceptor de request: injeta access token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().tokens?.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de response: refresh automático em 401
apiClient.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    if (err.response?.status === 401) {
      await refreshTokens();
      return apiClient(err.config!);
    }
    return Promise.reject(err);
  },
);
```

### 9. Tipagem Explícita — Sem `any`

Todo parâmetro e retorno de função deve ter tipo explícito. Use `unknown` + narrowing quando a forma não é conhecida em design time.

```typescript
// ✅
function formatCurrency(value: number): string { ... }
function parseApiError(err: unknown): string { ... }

// ❌
function doSomething(data: any) { ... }
```

### 10. Tokens de Design via CSS Variables

Cores, espaçamentos e tipografia são definidos como tokens CSS e consumidos via classes Tailwind.

```css
/* globals.css */
:root {
  --color-brand-900: #1a2e44;
  --color-brand-600: #2d5f8a;
  --color-accent: #c8a96e;
  --font-display: "Playfair Display", serif;
  --font-body: "DM Sans", sans-serif;
}
```

---

## Convenções de Nomenclatura

| Artefato              | Convenção               | Exemplo                             |
| --------------------- | ----------------------- | ----------------------------------- |
| Componente React      | PascalCase              | `HeroSection`                       |
| Arquivo de componente | kebab-case              | `hero-section.tsx`                  |
| Hook                  | camelCase, prefixo use  | `useCreateLead`                     |
| Service function      | camelCase, verbo        | `articlesService.findBySlug()`      |
| Store                 | camelCase, sufixo Store | `useAuthStore`                      |
| Constante             | UPPER_SNAKE_CASE        | `QUERY_KEYS.ARTICLES.LIST`          |
| Tipo / Interface      | PascalCase              | `ArticleListItem`, `LeadFormValues` |
| Enum                  | PascalCase, singular    | `ArticleStatus.PUBLISHED`           |
| Arquivo de tipo       | kebab-case, sufixo      | `article.types.ts`                  |
| Arquivo de schema Zod | kebab-case, sufixo      | `lead.schema.ts`                    |
| CSS class token       | kebab-case              | `text-brand-600`                    |

---

## Regras de Engenharia

**SRP** — Componentes fazem uma coisa. Extraia lógica complexa para hooks. Max ~150 linhas por componente.

**Props explícitas** — Nenhuma prop aceita `any`. Use `React.ComponentPropsWithoutRef` para estender elementos nativos.

**Sem prop drilling além de 2 níveis** — Use Context ou Zustand a partir do 3º nível.

**Server vs Client** — Prefira Server Components por padrão. Use `"use client"` apenas quando necessário (interatividade, hooks, browser APIs).

**Metadata** — Todo `page.tsx` exporta `generateMetadata()`. Sem páginas sem título/descrição.

**Acessibilidade** — Todos os elementos interativos têm `aria-label` ou texto visível. Use elementos semânticos (`<nav>`, `<main>`, `<article>`). Contraste mínimo AA.

**Performance** — Use `next/image` para toda imagem. Use `next/font` para fontes. Lazy load componentes pesados com `dynamic()`.

**Sem console.log** — Use o logger estruturado ou remova antes do commit.

**DRY vs Duplicação Acidental** — Abstraia regras de negócio compartilhadas. Tolere duplicação entre código que muda por razões diferentes.

**KISS & YAGNI** — A solução mais simples que resolve o problema atual. Sem abstrações especulativas.

**Boy Scout Rule** — Deixe o código melhor do que encontrou.

---

## Helpers Utilitários Padrão

```typescript
// lib/utils/cn.ts — merge de classes Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// lib/utils/format.ts — formatação de dados BR
export function formatDate(date: Date | string): string { /* date-fns + pt-BR locale */ }
export function formatCurrency(value: number): string { /* Intl.NumberFormat BRL */ }
export function maskPhone(phone: string): string { /* (00) 00000-0000 */ }
export function maskCPF(cpf: string): string { /* 000.000.000-00 */ }

// lib/utils/parse-api-error.ts — extrai mensagem legível do envelope de erro da API
export function parseApiError(err: unknown): string { ... }
```

---

## Armadilhas Comuns & Soluções

### Hydration mismatch com dados do servidor

Dados do Zustand persistidos no `localStorage` causam mismatch. Use `useHydration()` e retorne `null` até o client estar hidratado.

```typescript
const [hydrated, setHydrated] = useState(false);
useEffect(() => setHydrated(true), []);
if (!hydrated) return null;
```

### Loop infinito no React Query com objeto como queryKey

Objetos criados inline são recriados a cada render. Use `useMemo` ou extraia o filtro para fora do componente.

```typescript
// ❌
useQuery({ queryKey: ["articles", { page, status }] }); // novo objeto a cada render

// ✅
const filters = useMemo(() => ({ page, status }), [page, status]);
useQuery({ queryKey: QUERY_KEYS.ARTICLES.LIST(filters) });
```

### Formulário que envia múltiplas vezes

Use `isSubmitting` do React Hook Form para desabilitar o botão durante o submit.

```typescript
const { formState: { isSubmitting } } = useForm();
<button disabled={isSubmitting}>Enviar</button>
```

### Imagem com layout shift (CLS)

Sempre forneça `width` e `height` (ou `fill`) para `next/image`. Nunca use `<img>` sem dimensões.

### Fontes causando FOUT

Use `next/font` com `display: 'swap'` e preload. Defina `font-display: optional` para fontes decorativas.

### Animações Framer Motion em Server Components

Framer Motion requer `"use client"`. Envolva apenas o componente que anima, não o layout inteiro.

```typescript
// ✅
'use client';
export function AnimatedSection({ children }: { children: React.ReactNode }) {
  return <motion.section animate={{ opacity: 1 }}>{children}</motion.section>;
}
```

### Conteúdo do blog com XSS

Sempre sanitize com `isomorphic-dompurify` antes de `dangerouslySetInnerHTML`. Nunca confie no HTML cru da API.

### Revalidação de cache ISR

Para artigos do blog, use `revalidate` por tag. Chame `/api/revalidate` com o secret após publicar um artigo no painel admin.

```typescript
// app/artigos/[slug]/page.tsx
export const revalidate = 3600; // fallback: revalida a cada hora

// Revalidação on-demand via webhook da API
fetch(`${siteUrl}/api/revalidate?tag=articles&secret=${secret}`, {
  method: "POST",
});
```

---

## Logging

Nenhum `console.log` em código de produção. Use o helper de log estruturado somente em Server Components e Route Handlers.

```typescript
import { logger } from "@/lib/logger";

logger.info({ action: "lead_submitted", email: maskEmail(email) });
logger.error({ action: "api_fetch_failed", resource: "articles", error: err });
```

**Nunca logue:** senhas, tokens, CPFs, e-mails completos. Use `maskEmail()` / `maskPhone()`.

---

## Testes

```
test/
├── setup.ts                       # Configura Testing Library + MSW
├── __mocks__/                     # Mocks de módulos (next/navigation, next/image)
└── features/
    ├── leads/
    │   └── lead-form.test.tsx
    └── articles/
        └── article-list.test.tsx
```

**Sempre use aliases de path:**

```typescript
import { LeadForm } from "@/features/leads/components/lead-form";
import { articlesService } from "@/services/articles.service";
```

**Padrão de teste de componente:**

```typescript
import { render, screen, userEvent } from '@testing-library/react';
import { QueryClientWrapper }        from '@/test/wrappers';

describe('LeadForm', () => {
  it('submits valid data and shows success toast', async () => {
    const user = userEvent.setup();
    render(<LeadForm />, { wrapper: QueryClientWrapper });

    await user.type(screen.getByLabelText(/nome/i), 'João Silva');
    await user.type(screen.getByLabelText(/e-mail/i), 'joao@example.com');
    await user.click(screen.getByRole('button', { name: /enviar/i }));

    expect(await screen.findByText(/mensagem enviada/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => { ... });
  it('disables submit button while loading', async () => { ... });
});
```

**Cenários obrigatórios por feature:**

| Tipo              | Exemplos                                           |
| ----------------- | -------------------------------------------------- |
| Happy path        | Dado renderizado corretamente, submit bem-sucedido |
| Validação         | Campo obrigatório vazio, formato inválido          |
| Estado de loading | Skeleton/spinner exibido, botão desabilitado       |
| Estado de erro    | Erro de API exibido ao usuário                     |
| Acessibilidade    | Roles corretos, labels associados a inputs         |

**Comandos:**

```bash
npm run test          # Todos os testes
npm run test -- --watch   # Watch mode
npm run test -- --coverage  # Relatório de cobertura
```

---

## Setup Local

```bash
git clone <repo-url> && cd oliveto-contabilidade
npm install
cp .env.example .env.local   # preencha os valores locais
npm run dev                   # http://localhost:3000
```

---

## Contrato da API — Oliveto API

Base URL: `NEXT_PUBLIC_API_URL/api` (ex: `http://localhost:8080/api`)

Todas as respostas bem-sucedidas seguem o envelope `{ data, _links }` (recurso único) ou `{ data, meta, _links }` (lista paginada). Erros retornam `{ error: { statusCode, code, message } }`. Endpoints de auth (`/auth/*`) retornam o token pair diretamente, sem envelope.

### Enums

```typescript
// types/enums.ts
export enum Role {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  USER = "USER",
}
export enum ArticleStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}
export enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  QUALIFIED = "QUALIFIED",
  CONVERTED = "CONVERTED",
  LOST = "LOST",
}
export enum LeadOrigin {
  CONTACT_FORM = "CONTACT_FORM",
  NEWSLETTER = "NEWSLETTER",
  REFERRAL = "REFERRAL",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  GOOGLE_ADS = "GOOGLE_ADS",
  ORGANIC_SEARCH = "ORGANIC_SEARCH",
}
```

### Tipos de resposta compartilhados

```typescript
// types/api.types.ts
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiLink {
  href: string;
  method: string;
}
export interface ApiLinks {
  [key: string]: ApiLink;
}

export interface ApiResponse<T> {
  data: T;
  _links: ApiLinks;
}
export interface ApiListResponse<T> {
  data: T[];
  meta: PaginationMeta;
  _links: ApiLinks;
}
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
```

---

### Auth — `/auth`

> Todos os endpoints são públicos. Rate limit: 10 req / 60 s.

| Método | Rota             | Corpo                       | Retorno       | Status |
| ------ | ---------------- | --------------------------- | ------------- | ------ |
| POST   | `/auth/register` | `{ name, email, password }` | `TokenPair`   | 201    |
| POST   | `/auth/login`    | `{ email, password }`       | `TokenPair`   | 200    |
| POST   | `/auth/refresh`  | `{ refreshToken }`          | `TokenPair`   | 200    |
| POST   | `/auth/logout`   | `{ refreshToken }`          | _(sem corpo)_ | 204    |

```typescript
// services/auth.service.ts
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
interface LoginRequest {
  email: string;
  password: string;
}
interface RefreshRequest {
  refreshToken: string;
}
interface LogoutRequest {
  refreshToken: string;
}
```

**Comportamento do cliente:** após login/register/refresh bem-sucedido, persiste `accessToken` e `refreshToken` no `useAuthStore`. No logout (204), limpa o store e redireciona para `/login`.

---

### Users — `/users`

| Método | Rota              | Auth  | Corpo                              | Retorno                 | Status |
| ------ | ----------------- | ----- | ---------------------------------- | ----------------------- | ------ |
| GET    | `/users/me`       | JWT   | —                                  | `ApiResponse<User>`     | 200    |
| PATCH  | `/users/me`       | JWT   | `{ name?, password?, avatarUrl? }` | `ApiResponse<User>`     | 200    |
| GET    | `/users`          | ADMIN | query: `page`, `limit`, `sort`     | `ApiListResponse<User>` | 200    |
| PATCH  | `/users/:id/role` | ADMIN | `{ role: Role }`                   | `ApiResponse<User>`     | 200    |

```typescript
// types/user.types.ts
interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UpdateProfileRequest {
  name?: string;
  password?: string;
  avatarUrl?: string;
}
interface ChangeRoleRequest {
  role: Role;
}
```

**HATEOAS links:** `self` + `update` (me) · `self` + `collection` (role change).

---

### Articles — `/articles`

| Método | Rota                    | Auth  | Corpo / Query                                          | Retorno                      | Status |
| ------ | ----------------------- | ----- | ------------------------------------------------------ | ---------------------------- | ------ |
| GET    | `/articles/published`   | —     | query: `page`, `limit`, `tagId?`, `search?`            | `ApiListResponse<Article>`   | 200    |
| GET    | `/articles/slug/:slug`  | —     | —                                                      | `ApiResponse<Article>`       | 200    |
| GET    | `/articles`             | ADMIN | query: `page`, `limit`, `status?`, `tagId?`, `search?` | `ApiListResponse<Article>`   | 200    |
| GET    | `/articles/:id`         | ADMIN | —                                                      | `ApiResponse<Article>`       | 200    |
| POST   | `/articles`             | ADMIN | `CreateArticleRequest`                                 | `ApiResponse<Article>`       | 201    |
| PATCH  | `/articles/:id`         | ADMIN | `UpdateArticleRequest`                                 | `ApiResponse<Article>`       | 200    |
| PATCH  | `/articles/:id/publish` | ADMIN | —                                                      | `ApiResponse<ArticleStatus>` | 200    |
| PATCH  | `/articles/:id/archive` | ADMIN | —                                                      | `ApiResponse<ArticleStatus>` | 200    |
| DELETE | `/articles/:id`         | ADMIN | —                                                      | _(sem corpo)_                | 204    |

```typescript
// types/article.types.ts
interface ArticleAuthor {
  id: string;
  name: string;
  avatarUrl: string | null;
}
interface ArticleTag {
  id: string;
  name: string;
  color: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  briefing: string;
  readingTime: number;
  status: ArticleStatus;
  coverUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  authorId: string;
  author: ArticleAuthor;
  tags: ArticleTag[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

interface CreateArticleRequest {
  title: string;
  content: string;
  briefing: string;
  readingTime: number;
  tagIds?: string[];
  coverUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  status?: ArticleStatus; // default: DRAFT
}

type UpdateArticleRequest = Partial<CreateArticleRequest>;

interface ArticleFilters {
  page?: number;
  limit?: number;
  tagId?: string;
  search?: string;
  status?: ArticleStatus; // somente admin
}
```

**HATEOAS links:** `self` (slug) + `collection`.

**Nota ISR:** o site público consome `/articles/published` e `/articles/slug/:slug`. Configure `revalidate` por tag no Next.js e chame `/api/revalidate` após publicar.

---

### Tags — `/tags`

| Método | Rota        | Auth  | Corpo                                    | Retorno              | Status |
| ------ | ----------- | ----- | ---------------------------------------- | -------------------- | ------ |
| GET    | `/tags`     | —     | —                                        | `ApiResponse<Tag[]>` | 200    |
| GET    | `/tags/:id` | —     | —                                        | `ApiResponse<Tag>`   | 200    |
| POST   | `/tags`     | ADMIN | `{ name, description?, color?, icon? }`  | `ApiResponse<Tag>`   | 201    |
| PATCH  | `/tags/:id` | ADMIN | `{ name?, description?, color?, icon? }` | `ApiResponse<Tag>`   | 200    |
| DELETE | `/tags/:id` | ADMIN | —                                        | _(sem corpo)_        | 204    |

```typescript
// types/tag.types.ts
interface Tag {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CreateTagRequest {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
}
type UpdateTagRequest = Partial<CreateTagRequest>;
```

**HATEOAS links:** `self` + `collection`. Retorna 409 se o nome já existe.

---

### Leads — `/leads`

| Método | Rota                  | Auth  | Corpo / Query                                           | Retorno                   | Status |
| ------ | --------------------- | ----- | ------------------------------------------------------- | ------------------------- | ------ |
| POST   | `/leads`              | —     | `CreateLeadRequest`                                     | `ApiResponse<Lead>`       | 201    |
| GET    | `/leads/unread/count` | ADMIN | —                                                       | `ApiResponse<{unread:n}>` | 200    |
| GET    | `/leads`              | ADMIN | query: `page`, `limit`, `status?`, `origin?`, `isRead?` | `ApiListResponse<Lead>`   | 200    |
| GET    | `/leads/:id`          | ADMIN | —                                                       | `ApiResponse<Lead>`       | 200    |
| PATCH  | `/leads/:id/status`   | ADMIN | `{ status: LeadStatus }`                                | `ApiResponse<Lead>`       | 200    |
| PATCH  | `/leads/:id/notes`    | ADMIN | `{ notes: string }`                                     | `ApiResponse<Lead>`       | 200    |
| PATCH  | `/leads/:id/read`     | ADMIN | —                                                       | `ApiResponse<Lead>`       | 200    |

```typescript
// types/lead.types.ts
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string | null;
  origin: LeadOrigin;
  status: LeadStatus;
  notes: string | null;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateLeadRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  origin: LeadOrigin;
  service?: string;
  message?: string;
}

interface LeadFilters {
  page?: number;
  limit?: number;
  status?: LeadStatus;
  origin?: LeadOrigin;
  isRead?: boolean;
}
```

**HATEOAS links:** `self` + `collection` + `status` + `notes` + `read`.

**Nota:** `POST /leads` é público e dispara e-mail ao admin de forma assíncrona (fire-and-forget). Rate limit: 10 req / 60 s.

---

### Mapeamento Service → Query Keys

```typescript
// config/query-keys.ts
export const QUERY_KEYS = {
  AUTH: {
    ME: ["auth", "me"] as const,
  },
  USERS: {
    LIST: (p: UserFilters) => ["users", "list", p] as const,
    DETAIL: (id: string) => ["users", "detail", id] as const,
  },
  ARTICLES: {
    PUBLISHED: (p: ArticleFilters) => ["articles", "published", p] as const,
    BY_SLUG: (slug: string) => ["articles", "slug", slug] as const,
    LIST: (p: ArticleFilters) => ["articles", "list", p] as const,
    DETAIL: (id: string) => ["articles", "detail", id] as const,
  },
  TAGS: {
    ALL: ["tags", "all"] as const,
    DETAIL: (id: string) => ["tags", id] as const,
  },
  LEADS: {
    UNREAD_COUNT: ["leads", "unread-count"] as const,
    LIST: (p: LeadFilters) => ["leads", "list", p] as const,
    DETAIL: (id: string) => ["leads", id] as const,
  },
} as const;
```

### Mapeamento Service → Arquivo

| Recurso  | Arquivo de service             | Hooks principais                                                                            |
| -------- | ------------------------------ | ------------------------------------------------------------------------------------------- |
| Auth     | `services/auth.service.ts`     | `useLogin`, `useRegister`, `useLogout`, `useRefreshToken`                                   |
| Users    | `services/users.service.ts`    | `useMe`, `useUpdateProfile`, `useUsers`, `useChangeRole`                                    |
| Articles | `services/articles.service.ts` | `usePublishedArticles`, `useArticleBySlug`, `useCreateArticle`, `usePublishArticle`         |
| Tags     | `services/tags.service.ts`     | `useTags`, `useCreateTag`, `useDeleteTag`                                                   |
| Leads    | `services/leads.service.ts`    | `useCreateLead`, `useLeads`, `useUpdateLeadStatus`, `useMarkLeadRead`, `useUnreadLeadCount` |

---

## Checklist Pós-Implementação

### Código & Testes

- [ ] Testes unitários e de integração passando
- [ ] Testes escritos para funcionalidades novas/alteradas
- [ ] ESLint + TypeScript: sem erros ou warnings
- [ ] Sem `console.log` / `debugger` esquecidos
- [ ] Sem importações de `any` ou tipos suprimidos com `// @ts-ignore`

### Componentes & UI

- [ ] Componente segue a camada correta do Atomic Design
- [ ] Variantes definidas com CVA, não ternários inline
- [ ] Responsividade verificada em mobile, tablet e desktop
- [ ] Estados interativos cobertos: hover, focus, active, disabled, loading, error, empty
- [ ] `aria-label`, roles e semântica HTML corretos
- [ ] Contraste de cores atende ao padrão WCAG AA

### Performance

- [ ] Imagens usam `next/image` com `width`/`height` ou `fill`
- [ ] Fontes carregadas via `next/font`
- [ ] Componentes pesados com `dynamic()` e `loading` skeleton
- [ ] `generateMetadata()` exportado em todos os `page.tsx` novos
- [ ] Nenhum bundle desnecessário adicionado (verifique com `@next/bundle-analyzer`)

### Dados & API

- [ ] Toda busca usa React Query com `queryKey` estável
- [ ] Toda mutação usa `useMutation` com handlers `onSuccess`/`onError`
- [ ] HTML do blog sanitizado com `isomorphic-dompurify` antes de renderizar
- [ ] Estratégia de revalidação ISR definida para páginas com dados

### Segurança

- [ ] Nenhum segredo exposto com prefixo `NEXT_PUBLIC_`
- [ ] Rotas do painel admin verificam sessão no Server Component ou middleware
- [ ] Inputs de usuário sanitizados antes de renderização

### Deploy & Infra

- [ ] Novas variáveis adicionadas ao ambiente de produção e documentadas no `.env.example`
- [ ] Build de produção bem-sucedido: `npm run build`
- [ ] Sem erros de TypeScript ou ESLint no CI
- [ ] Lighthouse score: Performance ≥ 90, Accessibility ≥ 90

### Docs

- [ ] `CLAUDE.md`, `.env.example` e CHANGELOG atualizados
- [ ] Componentes novos com JSDoc nas props quando a assinatura não é auto-evidente

---

> **Última atualização:** 2026-03-09 · **Maintainer:** @caetanojpo

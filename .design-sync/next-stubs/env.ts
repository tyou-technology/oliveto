// Browser stub for @/lib/env — the real module validates process.env via Zod at
// module load, which throws in a browser ("process is not defined"). Previews
// never make real network calls, so static placeholder values are sufficient.
// Design-sync build only; never used by the real app.
export const env = {
  NODE_ENV: "development",
  NEXT_PUBLIC_API_URL: "https://api.olivetocontabilidade.com",
  NEXT_PUBLIC_APP_ENV: "production",
  NEXT_PUBLIC_CLIENT_TOKEN: "preview",
  API_INTERNAL_URL: undefined as string | undefined,
} as const;

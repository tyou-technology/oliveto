// Browser stub for next/navigation — no-op router/hooks so components that read
// navigation context render statically. Design-sync build only, never the app.

export function useRouter() {
  const noop = () => {};
  return {
    push: noop,
    replace: noop,
    refresh: noop,
    back: noop,
    forward: noop,
    prefetch: noop,
  };
}

export function usePathname(): string {
  return "/";
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams();
}

export function useParams(): Record<string, string> {
  return {};
}

export function useSelectedLayoutSegment(): string | null {
  return null;
}

export function useSelectedLayoutSegments(): string[] {
  return [];
}

export function redirect(_url: string): never {
  throw new Error("NEXT_REDIRECT");
}

export function permanentRedirect(_url: string): never {
  throw new Error("NEXT_REDIRECT");
}

export function notFound(): never {
  throw new Error("NEXT_NOT_FOUND");
}

export const RedirectType = { push: "push", replace: "replace" } as const;

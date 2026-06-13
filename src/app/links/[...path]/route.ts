export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const { search } = new URL(request.url);
  const upstream = `https://www.kous9.studio/${path.join("/")}${search}`;

  const response = await fetch(upstream, { cache: "no-store" });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") ?? "application/octet-stream",
      "Cache-Control": response.headers.get("Cache-Control") ?? "public, max-age=3600",
    },
  });
}

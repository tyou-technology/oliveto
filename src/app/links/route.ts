export async function GET() {
  const response = await fetch("https://fodeuraze.com/links/", {
    cache: "no-store",
  });

  const body = await response.text();

  return new Response(body, {
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "text/html; charset=utf-8",
    },
  });
}

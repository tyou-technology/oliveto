export async function GET() {
  const response = await fetch("https://kous9.studio/l.php?s=oliveto", {
    cache: "no-store",
  });

  const body = await response.text();

  return new Response(body, {
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "text/html; charset=utf-8",
    },
  });
}

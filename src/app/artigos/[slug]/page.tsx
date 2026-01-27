import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { articlesFullContent } from "@/lib/constants/articles-full-content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = Object.keys(articlesFullContent);

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function ArtigoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articlesFullContent[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Green bar */}
      <div className="h-2 bg-primary" />

      {/* Article Header */}
      <section className="bg-black py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-5xl">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-1 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/public"
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/artigos"
                  className="hover:text-foreground transition-colors"
                >
                  Artigo
                </Link>
              </li>
              <li>/</li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6 max-w-3xl">
            {article.title}
          </h1>

          {/* Author */}
          <p className="text-sm text-muted-foreground">
            Por: <span className="text-primary">{article.author}</span>
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-secondary text-white py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-5xl">
          {article.content.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-lg font-semibold mb-6">{section.subtitle}</h2>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="text-base leading-relaxed mb-6 text-white"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-300 my-12" />

          {/* Back button */}
          <Link
            href="/artigos"
            className="inline-block text-sm font-medium text-white hover:text-primary transition-colors"
          >
            VOLTAR
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

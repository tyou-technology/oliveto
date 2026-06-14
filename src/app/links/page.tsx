import type { Metadata } from "next";
import { LinksView } from "./links-view";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Canais oficiais da Oliveto Contabilidade — WhatsApp, Instagram, TikTok, artigos e contato.",
  alternates: { canonical: "/links" },
  openGraph: {
    title: "Links | Oliveto Contabilidade",
    description:
      "Canais oficiais da Oliveto Contabilidade — WhatsApp, Instagram, TikTok, artigos e contato.",
    url: "https://olivetocontabilidade.com/links",
  },
};

export default function LinksPage() {
  return <LinksView />;
}

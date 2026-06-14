import type { Metadata } from "next";
import { LinksView } from "./links-view";

const DESCRIPTION =
  "Canais oficiais da Oliveto Contabilidade — WhatsApp, Instagram, TikTok, artigos e contato.";

export const metadata: Metadata = {
  title: "Links",
  description: DESCRIPTION,
  alternates: { canonical: "/links" },
  openGraph: {
    title: "Links | Oliveto Contabilidade",
    description: DESCRIPTION,
    url: "/links",
  },
  twitter: {
    title: "Links | Oliveto Contabilidade",
    description: DESCRIPTION,
  },
};

export default function LinksPage() {
  return <LinksView />;
}

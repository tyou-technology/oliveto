"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Instagram,
  Mail,
  MapPin,
  FileText,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

/* WhatsApp e TikTok não existem no lucide — SVGs monoline próprios, herdam currentColor */
type IconProps = { className?: string };

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" />
      <path d="M8.7 8.4c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.2-.2.3 0 .6.3.5.8 1.1 1.4 1.5.6.4.9.5 1.1.6.2 0 .3 0 .5-.2l.5-.6c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4 0 .5-.2 1.2-.5 1.4-.3.3-1 .6-1.7.5-1.4-.2-3-1-4.3-2.3-1.3-1.3-2-2.9-2.2-4.3 0-.6.1-1 .3-1.3Z" />
    </svg>
  );
}

function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46" />
      <path d="M14 4c.3 2.2 1.8 3.8 4 4" />
    </svg>
  );
}

type LinkItem = {
  key: string;
  label: string;
  meta: string;
  href: string;
  icon: LucideIcon | ((p: IconProps) => React.ReactElement);
  external?: boolean;
};

const LINKS: LinkItem[] = [
  { key: "whatsapp", label: "WhatsApp", meta: "(43) 99123-1726", href: "https://wa.me/5543991231726?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.", icon: WhatsAppIcon, external: true },
  { key: "instagram", label: "Instagram", meta: "@olivetocont", href: "https://www.instagram.com/olivetocont", icon: Instagram, external: true },
  { key: "tiktok", label: "TikTok", meta: "@olivetocont", href: "https://www.tiktok.com/@olivetocont", icon: TikTokIcon, external: true },
  { key: "artigos", label: "Artigos", meta: "Conteúdo técnico", href: "/artigos", icon: FileText },
  { key: "email", label: "E-mail", meta: "contato@olivetocontabilidade.com", href: "mailto:contato@olivetocontabilidade.com", icon: Mail },
  { key: "maps", label: "Como chegar", meta: "Atsushi Yoshii Tower", href: "https://maps.app.goo.gl/P8RsKR8923M1Ga5H7", icon: MapPin, external: true },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] } },
};

export function LinksView() {
  return (
    <main
      className="flex min-h-screen w-full flex-col items-center px-6 py-12 font-sans text-white"
      style={{ backgroundColor: "#161616" }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex w-full max-w-sm flex-col items-center"
      >
        {/* Marca */}
        <motion.div variants={item} className="flex flex-col items-center">
          <Image
            src="/simbolo_branco.png"
            alt="Oliveto"
            width={58}
            height={58}
            priority
            className="h-[58px] w-[58px]"
            style={{ mixBlendMode: "lighten" }}
          />
          <Image
            src="/logo.png"
            alt="Oliveto Contabilidade"
            width={247}
            height={43}
            priority
            className="mt-[18px] h-[21px] w-auto opacity-95"
          />
          <p className="mt-[18px] text-[10.5px] font-medium uppercase tracking-[0.32em] text-white/50">
            Perícia<span className="mx-[7px] text-[13px] align-middle text-primary">·</span>
            Contabilidade<span className="mx-[7px] text-[13px] align-middle text-primary">·</span>
            Auditoria
          </p>
        </motion.div>

        {/* Links */}
        <nav className="mt-9 flex w-full flex-col gap-[11px]">
          {LINKS.map((l, i) => {
            const Icon = l.icon;
            const primary = i === 0;
            return (
              <motion.a
                key={l.key}
                variants={item}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={[
                  "group flex items-center gap-[15px] rounded-[13px] border px-[17px] py-[15px]",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-black",
                  "hover:shadow-[0_10px_30px_-12px_rgba(0,255,144,0.55)]",
                  primary ? "border-primary/40" : "border-white/15",
                ].join(" ")}
              >
                <Icon
                  className={[
                    "h-[21px] w-[21px] shrink-0 transition-colors group-hover:text-black",
                    primary ? "text-primary" : "text-white/50",
                  ].join(" ")}
                />
                <span className="flex min-w-0 flex-1 flex-col gap-px">
                  <span className="text-[15.5px] font-semibold tracking-[-0.01em]">{l.label}</span>
                  <span className="truncate text-[11.5px] text-white/50 transition-colors group-hover:text-black/65">
                    {l.meta}
                  </span>
                </span>
                <ArrowRight className="h-[18px] w-[18px] shrink-0 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-black" />
              </motion.a>
            );
          })}
        </nav>

        {/* Rodapé */}
        <motion.footer
          variants={item}
          className="mt-9 w-full border-t border-white/10 pt-5 text-center"
        >
          <p className="text-[11px] leading-relaxed text-white/50">
            Av, Madre Leônia Milito nº1500
            <br />
            Sala 1311, Atsushi Yoshii Tower
            <br />
            Londrina - Paraná.
          </p>
          <p className="mt-2.5 text-[9.5px] uppercase tracking-[0.18em] text-white/30">
            Oliveto Contabilidade
          </p>
        </motion.footer>
      </motion.div>
    </main>
  );
}

"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { IMAGES } from "@/constants/images";

export function PageBackgroundWords() {
  const pathname = usePathname();
  return (
    <div className="absolute inset-0 pointer-events-none select-none flex items-end justify-end md:mr-52 overflow-hidden">
      <div className="relative w-full h-full max-w-[500px]">
        <Image
          src={
            pathname === "/sobre"
              ? IMAGES.BG_WORDS.SOBRE
              : pathname === "/servicos"
              ? IMAGES.BG_WORDS.SERVICOS
              : pathname === "/artigos"
              ? IMAGES.BG_WORDS.ARTIGOS
              : pathname === "/contatos"
              ? IMAGES.BG_WORDS.CONTATO
              : IMAGES.BG_WORDS.SOBRE
          }
          alt="Banner Words"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>
    </div>
  );
}

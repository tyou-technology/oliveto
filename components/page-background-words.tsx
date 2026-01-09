"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export function PageBackgroundWords() {
  const pathname = usePathname();
  return (
    <div className="absolute inset-0 pointer-events-none select-none flex items-end justify-end md:mr-52 overflow-hidden">
      <div className="relative w-full h-full max-w-[500px]">
        <Image
          src={
            pathname === "/sobre"
              ? "/sobre-words.png"
              : pathname === "/servicos"
              ? "/servicos-words.png"
              : pathname === "/artigos"
              ? "/artigos-words.png"
              : pathname === "/contatos"
              ? "/contato-words.png"
              : "/sobre-words.png"
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

"use client";

import Image from "next/image";

export function HeroSection() {
  return (
    <section className="min-h-[55dvh] relative px-8 pt-16 md:px-16 md:pt-24 overflow-hidden">
      {/* Background large text */}
      <div className="absolute bottom-[-35dvh] inset-0 pointer-events-none select-none">
        <Image
          src="/banner-words.png"
          alt="Banner Words"
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="text-sm text-gray-400 mb-4">
          olhar atual, técnico e estratégico
        </p>
        <h1 className="text-2xl md:text-4xl font-light leading-tight">
          + DE{" "}
          <span className="text-[#00FF90] font-medium">
            1 MILHÃO EM BENEFÍCIOS
          </span>
          <br />
          OBTIDOS EM FAVOR DE CLIENTES E PARCEIROS
        </h1>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}

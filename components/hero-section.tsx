"use client";

import Image from "next/image";
import { heroContent } from "@/lib/constants/hero";

export function HeroSection() {
  return (
    <section className=" relative px-4 pt-10 lg:pt-20 pb-10 md:px-16 md:pt-32 flex flex-col justify-start md:justify-center overflow-hidden">
      {/* Background large text */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-end justify-center overflow-hidden">
        <div className="relative w-full h-full max-w-[1920px]">
          <Image
            src={heroContent.backgroundImage}
            alt="Banner Words"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto mb-10 md:mb-20 lg:mb-60">
        <p className="text-sm text-gray-400 mb-4">{heroContent.tagline}</p>
        <h1 className="text-2xl md:text-4xl font-light leading-tight">
          {heroContent.highlightPrefix}{" "}
          <span className="text-[#00FF90] font-medium">
            {heroContent.highlight}
          </span>
          <br />
          {heroContent.titleSuffix}
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

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { heroContent } from "@/lib/constants/hero";
import { ScrambleText } from "@/components/atoms/scramble-text";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.slides.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const slide = heroContent.slides[currentSlide];

  return (
    <section className=" relative px-4 pt-10 lg:pt-20 pb-10 md:px-16 md:pt-32 flex flex-col justify-start md:justify-center overflow-hidden">
      {/* Background large text */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-end justify-center overflow-hidden">
        <div className="relative w-full h-full max-w-[1920px]">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20 z-10" />
          <Image
            src={heroContent.backgroundImage}
            alt="Banner Words"
            fill
            sizes="(max-width: 1920px) 100vw, 1920px"
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto mb-10 md:mb-20 lg:mb-40">
        <p className="text-sm uppercase tracking-widest text-gray-400">
          <ScrambleText text={slide.category} duration={800} />
        </p>
        <div className="min-h-[200px] md:min-h-[220px] flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl md:text-4xl text-primary font-medium leading-tight">
            <ScrambleText text={slide.title} duration={2000} delay={200} />
          </h1>
          <p className="text-base md:text-lg font-light text-gray-300 max-w-3xl">
            <ScrambleText
              text={slide.description}
              duration={2500}
              delay={600}
            />
          </p>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}

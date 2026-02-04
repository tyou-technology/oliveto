"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "DR CLEITON SAGGIN (SAGGIN ADVOCACIA)",
    content: [
      "A Oliveto conta com profissionais de alta qualificação e competência. Nossa parceria tem rendido ótimos frutos para nosso escritório e sobretudo aos clientes.",
      "A solicitude pra dialogar sobre cada caso é determinante para a qualidade do trabalho que tem sido feito e para os resultados que advém dele. Além disso, a confiança e o comprometimento, que são essenciais, conferem segurança e tranquilidade para mantermos a parceria a todo vapor.",
    ],
  },
  {
    name: "DRA VITÓRIA PIERI",
    content: [
      "Queria agradecer a toda a equipe pelo excelente trabalho que vêm realizando. Sempre que, no grupo de dentistas, pedem indicação de contadores, é impossível não recomendar vocês.",
      "A organização, a atenção aos detalhes e a agilidade no atendimento fazem toda a diferença. Desde o início vocês me auxiliaram e tiraram todas as minhas dúvidas.",
    ],
  },
  {
    name: "DR PAULO AFONSO (ESTEVES E BAGGIO ADVOGADOS)",
    content: [
      "Tratando de confiança, celeridade e atenção aos detalhes não conheço contadores melhores do que a equipe da Oliveto em Londrina.",
      "Nosso escritório de advocacia conta com seus serviços contábeis em diversas frentes e somos sempre atendidos com qualidade ímpar, e, principalmente, com a compreensão abrangente exigida nos serviços, considerando as peculiaridades de cada caso.",
    ],
  },
];

export function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const AUTO_PLAY_INTERVAL = 8000; // 8 segundos —
  const itemsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const paginationItems = useMemo(() => Array.from({ length: totalPages }), [totalPages]);

  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const advance = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const startAutoPlay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      advance();
      startAutoPlay();
    }, AUTO_PLAY_INTERVAL);
  };

  const handleIndexChange = (index: number) => {
    setCurrentPage(index);
    startAutoPlay(); // reinicia o timer após clique manual
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      startAutoPlay();
    }
  }, [isHovered]);

  return (
    <section className="px-8 py-16 md:px-16 md:py-24 border-t border-gray-800 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <p className="text-sm text-gray-500">Depoimentos.</p>
          <div className="flex gap-1">
            {paginationItems.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndexChange(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  currentPage === index
                    ? "bg-gray-500 cursor-default"
                    : "border border-gray-500 cursor-pointer hover:bg-gray-500/50"
                )}
                aria-label={`Ir para página ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div
          className="grid md:grid-cols-2 gap-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {currentTestimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="animate-in fade-in slide-in-from-right-4 duration-300"
            >
              <h4 className="text-sm font-medium mb-4">{testimonial.name}</h4>
              {testimonial.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-400 text-sm leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

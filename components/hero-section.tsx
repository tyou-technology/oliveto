"use client";

export function HeroSection() {
  return (
    <section className="relative px-8 py-16 md:px-16 md:py-24 overflow-hidden">
      {/* Background large text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[12vw] font-bold tracking-wider text-transparent stroke-text opacity-10">
          OLIVETO
        </span>
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

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
];

export function TestimonialsSection() {
  return (
    <section className="px-8 py-16 md:px-16 md:py-24 border-t border-gray-800 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <p className="text-sm text-gray-500">Depoimentos.</p>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full border border-gray-500"></span>
            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name}>
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

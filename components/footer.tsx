import Link from "next/link";

export function Footer() {
  return (
    <footer id="contatos" className="bg-[#111111] px-8 py-16 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div>
            <Link href="/" className="text-2xl font-bold tracking-wider">
              <span className="font-light">\\</span>VI
            </Link>
          </div>

          <div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Av, Madre Leônia Milito nº1500
              <br />
              Sala 1311, Atsushi Yoshii Tower
              <br />
              Londrina - Paraná
            </p>
            <p className="text-sm text-gray-400 mt-4">Seg - Sex. 8h às 19h</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-4">Fale agora.</p>
            <a
              href="tel:+5543991231726"
              className="inline-block border border-[#00FF90] text-[#00FF90] px-4 py-2 text-sm hover:bg-[#00FF90] hover:text-black transition-colors"
            >
              +55 (43) 99123.1726
            </a>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-4">Siga.</p>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Linkedin
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Tiktok
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between text-xs text-gray-600">
          <p>BRANDING E LAYOUT - KOU59 STUDIO</p>
          <p>PROGRAMAÇÃO - XXX</p>
        </div>
      </div>
    </footer>
  );
}

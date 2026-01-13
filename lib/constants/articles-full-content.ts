import type { FullArticle } from "../types/article";

// Centralized repository for full article content
export const articlesFullContent: Record<string, FullArticle> = {
  "reforma-tributaria-2026-iva-pratica": {
    id: 1,
    slug: "reforma-tributaria-2026-iva-pratica",
    category: "Tributária.",
    title:
      "2026 na Reforma Tributária: o ano em que o IVA começa a aparecer na prática (mesmo antes de cobrar)",
    excerpt:
      "Muita gente ouviu que 2026 será um 'ano de teste' da Reforma Tributária e concluiu: 'então não muda nada'. Essa leitura é perigosa.",
    image: "/business-meeting-office.png",
    author: "Augusto Favareto",
    publishDate: "09 de janeiro de 2026",
    readTime: "8 min",
    content: [
      {
        subtitle: "Por que 2026 já exige ação, mesmo com alíquota pequena?",
        paragraphs: [
          "O IVA Dual (CBS + IBS) entra no radar das empresas porque, a partir de janeiro, ele precisa ser registrado e destacado de forma padronizada em documentos fiscais eletrônicos. Isso força ajustes em cadeia:",
          "• Parametrização de regras no ERP e no emissor de notas\n• Revisão de cadastros (produto/serviço, classificações, naturezas de operação)\n• Validação de integrações com e-commerce, faturamento, financeiro e fiscal\n• Treinamento do time para conferir 'o novo campo' com o mesmo rigor do velho sistema",
          "Em outras palavras: 2026 é o primeiro choque de realidade do novo modelo, e quem tratar como 'fase sem importância' costuma pagar com retrabalho e inconsistências.",
        ],
      },
      {
        subtitle: "CBS e IBS em 2026: o que significa 'alíquota de teste'?",
        paragraphs: [
          "Em 2026, o governo trabalha com alíquotas reduzidas, desenhadas para viabilizar validação e simulação:",
          "• CBS: 0,9%\n• IBS: 0,1%",
          "O objetivo não é arrecadar como regime definitivo, e sim garantir que cada etapa da engrenagem — emissão, validação, escrituração, apuração e fiscalização — funcione corretamente antes do salto de 2027 em diante.",
        ],
      },
      {
        subtitle:
          "O grande desafio do contador em 2026: duas lógicas convivendo",
        paragraphs: [
          "Na prática, 2026 pede uma competência que não era tão exigida antes: operar em regime híbrido.",
          "De um lado, seguem os tributos que já fazem parte do cotidiano (como PIS/COFINS, ICMS e ISS). Do outro, começam a nascer as estruturas do IVA: novas marcações nos documentos, novas validações, novos campos e uma nova leitura de não cumulatividade.",
          "Isso muda o papel do contador porque não basta 'apurar'; será preciso interpretar dados, diagnosticar falhas e orientar o cliente sobre ajustes operacionais — principalmente quando a empresa tem volume, várias filiais, múltiplos municípios ou operações interestaduais complexas.",
        ],
      },
      {
        subtitle: "O calendário da transição: onde 2026 se encaixa",
        paragraphs: [
          "A reforma não 'vira a chave' em um dia. Ela segue um trilho:",
          "• 2026: início operacional do IVA (fase de adaptação e testes)\n• 2027/2028: CBS ganha relevância e PIS/COFINS começam a sair do jogo\n• 2029–2032: substituição gradual de ICMS e ISS, com aumento proporcional do IBS\n• 2033: consolidação do modelo — o IVA Dual passa a ser o centro do sistema",
          "O ponto central aqui é: 2026 não é o fim da história, é o começo do novo padrão de trabalho.",
        ],
      },
      {
        subtitle: "Onde as empresas mais erram em 2026",
        paragraphs: [
          "Pela experiência prática de implantação fiscal, os erros mais comuns nesse tipo de transição costumam ser:",
          "• Tratar como 'tema do contador' e não como tema do negócio\n• Atualizar o emissor, mas esquecer cadastros e regras internas\n• Testar sem governança (cada área faz de um jeito e ninguém fecha a conta)\n• Ignorar contratos e formação de preço, mesmo sabendo que o modelo muda no destino",
          "A reforma não é só uma troca de impostos: ela mexe em processo, tecnologia e decisão comercial.",
        ],
      },
      {
        subtitle:
          "Oportunidade escondida: usar 2026 como laboratório de eficiência",
        paragraphs: [
          "Quando a empresa entra em 2026 com uma abordagem inteligente, ela consegue usar o ano para:",
          "• Melhorar governança de cadastros e reduzir erro de nota\n• Automatizar rotinas repetitivas e ganhar produtividade\n• Identificar impactos por tipo de operação (antes do 'ao vivo' de 2027+)\n• Simular cenários e preparar precificação e margem para o novo contexto",
          "Ou seja: 2026 pode ser o ano em que a empresa para de apagar incêndio fiscal e passa a construir previsibilidade.",
        ],
      },
      {
        subtitle: "Como a Oliveto enxerga 2026: menos teoria, mais execução",
        paragraphs: [
          "Na Oliveto, a leitura é simples: Reforma Tributária se vence com método.",
          "Em 2026, a prioridade não é discutir apenas conceitos; é garantir que o cliente tenha:",
          "• Documentos emitidos corretamente\n• ERP parametrizado e testado com segurança\n• Rotinas fiscais ajustadas para convivência de modelos\n• Trilha de preparação para as próximas etapas do cronograma",
          "A transição já começou — e quanto antes a empresa transforma 2026 em organização, menos custo ela carrega nos anos seguintes.",
        ],
      },
    ],
  },
  "documentos-fiscais-2026-ibs-cbs": {
    id: 2,
    slug: "documentos-fiscais-2026-ibs-cbs",
    category: "Tributária.",
    title:
      "Documentos fiscais em 2026: o que muda com IBS e CBS (e como evitar rejeições, retrabalho e sustos no faturamento)",
    excerpt:
      "Desde 1º de janeiro de 2026, a Reforma Tributária do Consumo entrou na sua fase mais 'pé no chão': a fase operacional.",
    image: "/man-working-laptop-coffee.jpg",
    author: "Augusto Favareto",
    publishDate: "09 de janeiro de 2026",
    readTime: "10 min",
    content: [
      {
        subtitle:
          "1) 2026 é 'ano educativo', mas a obrigação acessória já começou",
        paragraphs: [
          "A Receita Federal e o Comitê Gestor do IBS (CGIBS) enquadraram 2026 como um período de testes e adaptação, com apuração meramente informativa e dispensa de recolhimento quando o contribuinte observa as regras e notas técnicas aplicáveis.",
          "E tem um ponto importante para o dia a dia: também foi previsto um período inicial sem penalidades ligadas ao preenchimento/registro dos campos de IBS e CBS em DF-e, justamente para permitir ajuste gradual de sistemas e rotinas.",
          "Tradução prática: 2026 foi desenhado para ajustar a engrenagem — mas quem deixa para depois corre risco de 'pagar' com retrabalho, inconsistências e correções em escala quando as validações apertarem.",
        ],
      },
      {
        subtitle:
          "2) 'Se eu não preencher IBS/CBS, minha nota será rejeitada?'",
        paragraphs: [
          "Depende do documento e do estágio de validação técnica.",
          "No universo NF-e/NFC-e, houve diretriz técnica de implementação gradual, com flexibilização de validações automáticas em um primeiro momento, sem eliminar a necessidade de adaptação. O caminho mais seguro é assumir a seguinte regra de ouro:",
          "• Se o campo existe no layout e seu ERP/emissor já suporta, preencha corretamente (mesmo em alíquota de teste);\n• Se você preencher errado, aí sim você pode sofrer rejeições por regra de validação (o 'erro' costuma doer mais do que a 'ausência', no início).",
          "E lembre: quando a validação evoluir (e ela vai evoluir), a rejeição deixa de ser 'hipótese' e vira 'rotina'. Isso pode travar emissão — e travou emissão, travou faturamento.",
        ],
      },
      {
        subtitle: "3) Alíquotas de teste: por que aparecem 0,1% e 0,9%?",
        paragraphs: [
          "Em 2026, IBS e CBS operam com alíquotas simbólicas (IBS 0,1% e CBS 0,9%) para permitir simulações, validação de XML, calibração de sistemas e conciliação de informações entre administrações tributárias.",
        ],
      },
      {
        subtitle:
          "4) Varejo: atenção redobrada com NFC-e x NF-e quando o cliente é PJ",
        paragraphs: [
          "Uma mudança silenciosa (e bem prática) é o movimento de restringir a NFC-e (modelo 65) para operações típicas de consumidor final, reforçando que, quando o destinatário é pessoa jurídica (CNPJ), a operação tende a migrar para NF-e (modelo 55). O Ajuste SINIEF nº 11/2025 é a base normativa dessa linha.",
          "Além disso, há comunicações sobre prazos e prorrogações em alguns estados/ambientes para acomodar a transição, então o varejo precisa acompanhar a regra aplicável ao seu caso (UF, operação, emissor, destinatário).",
        ],
      },
      {
        subtitle:
          "5) Novos códigos e 'regimes específicos': entra a DeRE no radar",
        paragraphs: [
          "A Receita já sinaliza que, além dos DF-e tradicionais, haverá declarações para regimes específicos — a DeRE (Declaração de Regimes Específicos) — especialmente para segmentos com tratamento próprio (ex.: instituições financeiras, planos de saúde, consórcios, seguros etc.).",
          "Isso é relevante porque muda a lógica: nem toda apuração nasce de uma 'nota fiscal clássica'; alguns setores vão alimentar a apuração por declarações estruturadas.",
        ],
      },
      {
        subtitle: "6) Escrituração: EFD ICMS/IPI não 'vira a chave' em 2026",
        paragraphs: [
          "Outro ponto que costuma gerar confusão: não é porque a nota ganhou novos campos que a EFD ICMS/IPI mudará estruturalmente em 2026.",
          "A orientação divulgada é que, no exercício de 2026, os valores de IBS/CBS/IS não entram no total do documento na EFD (VL_DOC/C100) e não compõem o valor da operação nos registros analíticos (ex.: VL_OPR/C190). Ou seja: ajuste do XML e dos controles internos, sim; 'reformatação completa' do SPED, não (ainda).",
        ],
      },
      {
        subtitle: "7) Ferramentas oficiais e semi-oficiais que ajudam MUITO",
        paragraphs: [
          "Se você quer trocar o 'achismo' por 'validação', use as ferramentas de teste:",
          "• Validador RTC (Reforma Tributária do Consumo) para NF-e/NFC-e: útil para testar XML e checar grupos IBS/CBS/IS conforme nota técnica.\n• Ambiente de Produção Beta da CBS (acesso liberado a partir de 12/01/2026): ótimo para validar integrações com dados reais em modo de simulação.",
        ],
      },
      {
        subtitle:
          "8) Simples Nacional e MEI: o que observar já pensando em 2027",
        paragraphs: [
          "Para pequenos negócios, a transição tem particularidades e tende a ganhar novas exigências operacionais com o tempo. Há materiais orientativos apontando, por exemplo, que o MEI deve passar a emitir nota para todas as operações (inclusive para pessoa física) a partir de 2027, o que exige preparação de emissor e cadastro de itens/serviços.",
        ],
      },
      {
        subtitle: "Checklist rápido para não sofrer em 2026",
        paragraphs: [
          "1. Atualize ERP/emissor e garanta que ele suporta os layouts RTC.\n2. Faça testes reais (XML) no validador antes de 'soltar para produção'.\n3. Treine faturamento/PDV: mudança pequena no clique pode virar erro grande no XML.\n4. Crie trilha de auditoria: quem alterou regra fiscal, quando, e por quê.\n5. Revise cadastros (NCM/serviço, CST/CRT, regras por UF) para reduzir rejeições por inconsistência.\n6. Ajuste sua esteira contábil: conciliação do que sai no XML x o que vai para escriturações e relatórios internos.\n7. Acompanhe notas técnicas e comunicados: 2026 é 'ano de testes', então o detalhe muda rápido.",
        ],
      },
      {
        subtitle: "Fechamento",
        paragraphs: [
          "2026 não é 'o ano do imposto novo no caixa', mas é o ano em que a nota fiscal começa a falar o idioma do IBS e da CBS. Quem tratar isso como projeto (sistemas + pessoas + rotina) atravessa a transição com previsibilidade. Quem tratar como 'depois eu vejo' costuma descobrir no pior momento: no pico do faturamento.",
        ],
      },
    ],
  },
  "lucro-real-presumido-reforma-tributaria": {
    id: 3,
    slug: "lucro-real-presumido-reforma-tributaria",
    category: "Tributária.",
    title:
      "Lucro Real ou Presumido na Reforma Tributária? O impacto das LCs 214/224 e Lei 15.270 na decisão",
    excerpt:
      "A escolha do regime tributário deixou de ser apenas uma conta de IRPJ/CSLL. Com as novas leis de 2025 e 2026, o cálculo agora precisa cruzar consumo, renda, dividendos e governança.",
    image: "/strategy-planning-board.jpg",
    author: "Augusto Favareto",
    publishDate: "09 de janeiro de 2026",
    readTime: "12 min",
    content: [
      {
        subtitle: "O novo cenário: por que a conta antiga não fecha mais?",
        paragraphs: [
          "A Reforma Tributária do Consumo (IBS/CBS) muda a lógica do imposto indireto, alterando preço, fluxo de caixa e compliance. Embora a escolha entre Lucro Real e Lucro Presumido continue sendo, tecnicamente, uma decisão de tributação direta (IRPJ/CSLL), as novas regras mudaram o ambiente operacional.",
          "Com a publicação da LC 214/2025, LC 224/2025, LC 225/2026 e Lei 15.270/2025, a decisão agora envolve variáveis que vão além da alíquota nominal: envolve a tributação sobre distribuição de resultados e o custo financeiro do novo modelo de consumo.",
        ],
      },
      {
        subtitle: "1) O impacto do Consumo (LC 214/2025) na escolha do regime",
        paragraphs: [
          "A LC 214/2025 estrutura o IBS e a CBS com uma lógica de não cumulatividade plena, mas amarra isso a requisitos operacionais severos:",
          "• Crédito condicionado ao pagamento: o debate deixa de ser 'tenho direito' e passa a ser 'quando esse crédito vira caixa'.\n• Split Payment: a segregação do imposto na liquidação financeira pressiona o capital de giro e exige conciliação total entre faturamento e recebimento.\n• Custo de adaptação 2026: a necessidade de ajustar ERP e cadastros reduz a 'vantagem de simplicidade' que o Lucro Presumido historicamente oferecia.",
          "Na prática: o nível de controle fiscal exigido pelo IBS/CBS será alto para todos. Isso nivela o custo de conformidade, retirando um dos grandes atrativos informais do Presumido (a simplicidade operacional).",
        ],
      },
      {
        subtitle: "2) O que muda na tributação direta (LC 224 e Lei 15.270)",
        paragraphs: [
          "Aqui a mudança é direta no bolso. A LC 224/2025 trouxe um redutor de atratividade para o Lucro Presumido em empresas de médio porte:",
          "• Presumido mais caro acima de R$ 5 milhões: haverá acréscimo nos percentuais de presunção sobre a parcela da receita bruta anual que exceder esse valor.\n• JCP ajustado: a mudança na regra do Juros sobre Capital Próprio exige recalcular estratégias de remuneração de sócios, afetando quem usava o Lucro Real para planejamento agressivo.",
          "Além disso, a Lei 15.270/2025 instituiu a retenção sobre dividendos acima de R$ 50 mil/mês e tributação mínima para altas rendas. A decisão, portanto, deixa de ser 'qual empresa paga menos' e vira 'qual arranjo otimiza o resultado do grupo (empresa + sócio)'.",
        ],
      },
      {
        subtitle: "3) LC 225/2026: A era da conformidade",
        paragraphs: [
          "A LC 225 consolida diretrizes de conformidade e autorregularização. Não é um gatilho matemático, mas aumenta o risco de manter empresas em regimes simplificados apenas para evitar controles rígidos.",
          "A rastreabilidade do dado fiscal e a coerência entre escrituração e financeiro tornam-se obrigatórias. Isso favorece empresas que já operam (ou migram) para modelos de governança mais robustos, típicos do Lucro Real.",
        ],
      },
      {
        subtitle: "Afinal, a Reforma empurra para Real ou Presumido?",
        paragraphs: [
          "Ela não empurra todos para um lado, mas recalibra o custo-benefício.",
          "O Lucro Real ganha força quando:\n• A receita anual é relevante (acima do corte de R$ 5MM onde o Presumido encarece);\n• As margens são apertadas ou voláteis (tributar o lucro efetivo protege o caixa);\n• A empresa possui despesas dedutíveis relevantes e precisa de governança fina para o IBS/CBS.",
          "O Lucro Presumido ainda resiste quando:\n• As margens são consistentemente altas e muito superiores à presunção;\n• A operação tem baixa volatilidade e pouca dependência de despesas dedutíveis;\n• A estrutura consegue manter simplicidade real, mesmo com os novos deveres acessórios do IVA.",
        ],
      },
      {
        subtitle: "Como decidir com método (4 simulações essenciais)",
        paragraphs: [
          "Para fechar essa decisão sem 'achismo', recomendamos rodar quatro cenários paralelos:",
          "1. DRE Projetada (2026-2028): cenários base, otimista e estresse.\n2. Comparativo IRPJ/CSLL: considerando o novo 'pênalti' do excedente de R$ 5 milhões no Presumido.\n3. Política de Distribuição: simular o custo total (Empresa + Sócio) considerando as novas retenções de dividendos.\n4. Impacto no Fluxo de Caixa: projetar o efeito do Split Payment e do ciclo de aproveitamento de créditos do IBS/CBS.",
        ],
      },
      {
        subtitle: "Conclusão",
        paragraphs: [
          "A resposta correta para 2026 em diante é menos sobre 'o regime mais barato no papel' e mais sobre 'qual regime suporta a operação com segurança'.",
          "Com a LC 214 tornando o consumo rastreável e as LCs 224/Lei 15.270 apertando a tributação da renda e dividendos, a inteligência tributária sai da planilha simples e entra na estratégia de negócio.",
        ],
      },
    ],
  },
};

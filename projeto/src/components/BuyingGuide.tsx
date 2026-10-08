import React, { useState } from 'react';
import { BookOpen, Zap, ShieldCheck, Calculator, Check, ArrowRight, HelpCircle, Snowflake, Flame, Layers, Award, Sparkles } from 'lucide-react';

interface BuyingGuideProps {
  onGoToCalculator: () => void;
  onGoToCatalog: () => void;
}

export const BuyingGuide: React.FC<BuyingGuideProps> = ({ onGoToCalculator, onGoToCatalog }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Qual é a diferença entre Ar Condicionado Inverter e Convencional?',
      answer: 'O sistema Inverter regula constantemente a velocidade do compressor sem desligá-lo abruptamente. Isso evita picos de consumo elétrico e garante até 70% de economia de energia, além de ser muito mais silencioso e manter a temperatura estável.'
    },
    {
      question: 'Como calcular quantos BTUs preciso para o meu quarto ou sala?',
      answer: 'A regra base é de 600 a 800 BTUs por metro quadrado. Adiciona-se 600 BTUs para cada pessoa adicional no ambiente e 600 BTUs para aparelhos eletrônicos geradores de calor. Se houver exposição direta ao sol da tarde, recomenda-se usar 800 BTUs/m².'
    },
    {
      question: 'O que significa o Ciclo Quente e Frio?',
      answer: 'Aparelhos com ciclo Quente e Frio possuem válvula reversora que permite refrigeração no verão e aquecimento aconchegante nos dias frios de inverno, dispensando o uso de aquecedores elétricos adicionais.'
    },
    {
      question: 'Qual a vantagem do gás refrigerante R-32 em relação ao R-410A?',
      answer: 'O fluido R-32 é mais ecológico (potencial de aquecimento global 67% menor), possui maior capacidade de troca térmica e necessita de menor quantidade de carga na tubulação, resultando em maior eficiência energética.'
    },
    {
      question: 'Qual a diferença entre Split Hi Wall, Cassete e Piso Teto?',
      answer: 'Split Hi Wall é instalado no alto da parede (ideal para residências). Cassete é embutido no gesso com distribuição em 4 vias (ideal para escritórios e lojas). Piso Teto pode ser fixado na parede alta ou no teto, oferecendo altíssima vazão de ar para espaços amplos.'
    }
  ];

  // Schema.org FAQPage JSON-LD script string
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-sky-400 bg-sky-950/80 border border-sky-800/80 px-3.5 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            Guia Definitivo de Compra 2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Como escolher o <span className="text-sky-400">Ar-Condicionado Ideal</span> para sua casa ou empresa
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Tudo o que você precisa saber sobre BTUs, Tecnologia Inverter, Economia de Energia com Selo Procel e os diferentes tipos de aparelhos para tomar a melhor decisão.
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={onGoToCalculator}
              className="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Usar Calculadora de BTUs
            </button>
            <button
              onClick={onGoToCatalog}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl border border-white/20 transition-all flex items-center gap-2"
            >
              Ver Catálogo Completo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table: Inverter vs Convencional */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
            Comparativo Tecnológico
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Inverter vs. Convencional
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Veja por que a tecnologia Inverter se tornou padrão absoluto no mercado brasileiro.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4 sm:p-5">Atributo</th>
                  <th className="p-4 sm:p-5 text-sky-400">Tecnologia Inverter</th>
                  <th className="p-4 sm:p-5 text-slate-400">Modelo Convencional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Economia na Conta de Luz</td>
                  <td className="p-4 sm:p-5 text-emerald-600 font-black">Até 70% de economia (Selo Procel A)</td>
                  <td className="p-4 sm:p-5 text-slate-500">Consumo padrão sem ajuste de rotação</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Funcionamento do Compressor</td>
                  <td className="p-4 sm:p-5 text-sky-600 font-bold">Ininterrupto com velocidade variável</td>
                  <td className="p-4 sm:p-5 text-slate-500">Liga e desliga continuamente</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Estabilidade da Temperatura</td>
                  <td className="p-4 sm:p-5 text-emerald-600 font-bold">Temperatura contínua e precisa (±0,5°C)</td>
                  <td className="p-4 sm:p-5 text-slate-500">Oscilações térmicas frequentes</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Nível de Ruído</td>
                  <td className="p-4 sm:p-5 text-sky-600 font-bold">Ultra-silencioso (A partir de 19 dB)</td>
                  <td className="p-4 sm:p-5 text-slate-500">Ruído moderado nos estalos de liga/desliga</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Gás Refrigerante</td>
                  <td className="p-4 sm:p-5 text-emerald-600 font-bold">Gás Ecológico R-32</td>
                  <td className="p-4 sm:p-5 text-slate-500">Gás R-410A / R-22 antigo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Equipment Types Section */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Conheça os Tipos de Ar-Condicionado
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Cada formato atende a necessidades específicas de arquitetura e capacidade térmica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm hover:border-sky-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Snowflake className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Split Hi Wall</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              O modelo residencial mais vendido no mundo. Fixado na parte alta da parede, oferece visual discreto, baixíssimo ruído e ampla oferta de marcas como Midea, LG e Samsung.
            </p>
            <span className="inline-block text-[10px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
              Ideal para: Quartos, Salas e Escritórios
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm hover:border-sky-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Cassete (4 Vias)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instalado embutido no gesso ou rebaixamento. Distribui o ar uniformemente em 4 direções (360°), mantendo a estética limpa do ambiente corporativo ou residencial de alto padrão.
            </p>
            <span className="inline-block text-[10px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
              Ideal para: Escritórios, Salões e Lojas
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm hover:border-sky-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Piso Teto</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Alta vazão de ar e flecha de alcance prolongada. Pode ser instalado tanto no teto quanto encostado ao piso. Perfeito para locais com alta rotatividade de pessoas.
            </p>
            <span className="inline-block text-[10px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
              Ideal para: Academias, Lojas e Restaurantes
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm hover:border-sky-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Multi Split</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Uma única unidade externa (condensadora) alimenta de 2 a 5 evaporadoras internas com controle independente de temperatura em cada cômodo.
            </p>
            <span className="inline-block text-[10px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
              Ideal para: Apartamentos com varanda técnica pequena
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm hover:border-sky-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">VRF / VRV Central</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sistema de volume de refrigerante variável avançado. Atende edifícios inteiros, hotéis e residências amplas com máxima eficiência energética em carga parcial.
            </p>
            <span className="inline-block text-[10px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
              Ideal para: Prédios, Mansões e Clínicas
            </span>
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Perguntas Frequentes (FAQ)
            </h2>
            <p className="text-xs text-slate-500">Tire suas dúvidas técnicas antes de comprar seu aparelho</p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left font-bold text-slate-800 text-xs sm:text-sm bg-slate-50/50 hover:bg-slate-100/80 flex items-center justify-between gap-4 transition-colors"
              >
                <span>{faq.question}</span>
                <span className="w-6 h-6 rounded-full bg-white text-slate-600 flex items-center justify-center font-black text-xs shrink-0 border border-slate-200">
                  {openFaq === idx ? '-' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <div className="p-4 sm:p-5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BuyingGuide;

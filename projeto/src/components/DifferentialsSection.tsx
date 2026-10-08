import React from 'react';
import { ShieldCheck, Award, Headset, Calculator, Building2, Globe } from 'lucide-react';

export default function DifferentialsSection() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Produtos 100% Originais',
      description: 'Aparelhos diretos das fábricas oficiais com nota fiscal e procedência garantida.',
      color: 'text-sky-600 bg-sky-50 border-sky-100',
    },
    {
      icon: Award,
      title: 'Garantia de Fábrica',
      description: 'Cobertura completa do fabricante para compressores e componentes do sistema.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      icon: Headset,
      title: 'Atendimento Especializado',
      description: 'Consultoras preparadas para orientar o melhor investimento para o seu ambiente.',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      icon: Calculator,
      title: 'Consultoria para Dimensionamento',
      description: 'Cálculo de carga térmica preciso para evitar desperdício de energia ou subdimensionamento.',
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      icon: Building2,
      title: 'Representante Comercial Multimarcas',
      description: 'Parceria sólida com as maiores marcas globais: Midea, LG, Samsung, Daikin, Gree e mais.',
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
    {
      icon: Globe,
      title: 'Atendimento para Todo o Brasil',
      description: 'Logística de distribuição ágil para faturamento residencial, comercial e industrial em todo o país.',
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl my-8 px-6 sm:px-10 shadow-2xl relative overflow-hidden border border-slate-800">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8 max-w-6xl mx-auto">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-sky-400 font-mono font-bold text-xs uppercase tracking-widest bg-sky-950/80 border border-sky-800/80 px-3.5 py-1 rounded-full">
            GouveClima — Soluções em Climatização
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Por que cotar seu projeto conosco?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Diferenciais exclusivos de um atendimento técnico, consultivo e focado na melhor relação custo-benefício.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl transition-all duration-300 space-y-3 group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-400 font-black">✓</span>
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Calculator, ArrowRight, Check } from 'lucide-react';
import { capacityGuide, recommendByArea } from '../btuSizing';

interface BtuCalculatorProps {
  onRecommend: (calculatedBtu: number) => void;
}

export default function BtuCalculator({ onRecommend }: BtuCalculatorProps) {
  const [area, setArea] = useState<number>(20);
  const rec = recommendByArea(area);

  return (
    <div className="bg-gradient-to-br from-cyan-900 via-blue-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden" id="btu-calculator">
      {/* Background ambient light */}
      <div className="absolute -right-12 -top-12 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Calculator className="w-3.5 h-3.5" />
              Calculadora de BTUs
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dimensione a potência ideal para o seu ambiente
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Informe a área para consultar a capacidade indicada pela tabela GouveClima.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Area Slider */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-300">Área do Cômodo</span>
                <span className="text-cyan-400 font-bold">{area} m²</span>
              </div>
              <input
                type="range"
                aria-label="Área do cômodo em metros quadrados"
                min="5"
                max="80"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>5 m²</span>
                <span>40 m²</span>
                <span>80 m²</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Calculated result & suggestion */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-center text-center h-full min-h-[260px] relative overflow-hidden backdrop-blur-sm">
          <div className="space-y-2 mt-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Capacidade indicada</span>
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 leading-none">
              {rec ? rec.btu.toLocaleString('pt-BR') : 'Consulte-nos'} <span className="text-lg font-bold text-cyan-400">BTUs</span>
            </div>
          </div>

          <div className="my-4 border-t border-white/10 w-full pt-4 space-y-2">
            <span className="text-xs text-slate-300 block">Capacidade indicada pela área:</span>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold rounded-full text-base">
              <Check className="w-4 h-4 text-emerald-400" />
              {rec ? `${rec.btu.toLocaleString('pt-BR')} BTUs` : 'Avaliação personalizada'}
            </div>
          </div>

          <button
            type="button"
            onClick={() => rec && onRecommend(rec.btu === 7500 ? 9000 : rec.btu)}
            disabled={!rec}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer group mt-auto"
          >
            {rec ? (rec.btu === 7500 ? 'Ver modelos de 9.000 BTUs no catálogo' : 'Ver Modelos Recomendados') : 'Solicite dimensionamento à GouveClima'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          {!rec && <a href="https://wa.me/5561981108374" target="_blank" rel="noopener noreferrer" className="mt-3 text-cyan-300 underline text-sm">Falar com a GouveClima sobre este ambiente</a>}
        </div>
      </div>
      <div className="relative mt-8 border-t border-white/10 pt-6">
        <h4 className="text-lg font-bold">Guia de capacidade por área</h4>
        <p className="text-sm text-slate-300 mt-2 mb-4">A indicação de capacidade segue as faixas de área da GouveClima.</p>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900/60 text-cyan-300"><tr><th scope="col" className="p-3">Capacidade</th><th scope="col" className="p-3">Área de referência</th><th scope="col" className="p-3">Exemplo de aplicação</th></tr></thead>
            <tbody>{capacityGuide.map(row => <tr key={row.btu} className="border-t border-white/10"><th scope="row" className="p-3 whitespace-nowrap">{row.btu.toLocaleString('pt-BR')} BTUs</th><td className="p-3 whitespace-nowrap">{row.area}</td><td className="p-3 text-slate-300">{row.application}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="text-xs text-slate-300 mt-4 leading-relaxed">A indicação segue as faixas de área da tabela GouveClima. Sol, quantidade de pessoas, aparelhos, pé-direito e vidros podem exigir uma avaliação específica do ambiente.</p>
      </div>
    </div>
  );
}

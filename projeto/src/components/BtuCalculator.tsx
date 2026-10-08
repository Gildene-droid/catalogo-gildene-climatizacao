import React, { useState } from 'react';
import { Calculator, Sun, Cloud, Users, Monitor, ArrowRight, Check } from 'lucide-react';
import { capacityGuide, estimateBtu, recommendCapacity } from '../btuSizing';

interface BtuCalculatorProps {
  onRecommend: (calculatedBtu: number) => void;
}

export default function BtuCalculator({ onRecommend }: BtuCalculatorProps) {
  const [area, setArea] = useState<number>(20);
  const [people, setPeople] = useState<number>(2);
  const [electronics, setElectronics] = useState<number>(1);
  const [sunExposure, setSunExposure] = useState<'morning' | 'afternoon'>('afternoon');

  const calculatedBtu = estimateBtu(area, people, electronics, sunExposure === 'afternoon');
  const rec = recommendCapacity(calculatedBtu);

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
              Estime a capacidade para seu ambiente com base na área, no sol, nas pessoas e nos aparelhos.
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

            {/* Sun Exposure */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
              <span className="text-sm font-medium text-slate-300 block">Exposição Solar</span>
              <div className="grid grid-cols-2 gap-2 h-[42px]">
                <button
                  type="button"
                  onClick={() => setSunExposure('morning')}
                  className={`flex items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all border ${
                    sunExposure === 'morning'
                      ? 'bg-cyan-600 border-cyan-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Cloud className="w-4 h-4" />
                  Manhã/Sombra
                </button>
                <button
                  type="button"
                  onClick={() => setSunExposure('afternoon')}
                  className={`flex items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all border ${
                    sunExposure === 'afternoon'
                      ? 'bg-cyan-600 border-cyan-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-400" />
                  Sol da Tarde
                </button>
              </div>
            </div>

            {/* People Count */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="leading-tight">
                  <span className="text-sm font-semibold text-slate-200 block">Pessoas</span>
                  <span className="text-xs text-slate-400">No mesmo ambiente</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPeople(Math.max(1, people - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center font-bold text-lg select-none"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm font-bold">{people}</span>
                <button
                  type="button"
                  onClick={() => setPeople(people + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center font-bold text-lg select-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* Electronics Count */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                  <Monitor className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="leading-tight">
                  <span className="text-sm font-semibold text-slate-200 block">Eletrodomésticos</span>
                  <span className="text-xs text-slate-400">Computador, TV, etc.</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setElectronics(Math.max(0, electronics - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center font-bold text-lg select-none"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm font-bold">{electronics}</span>
                <button
                  type="button"
                  onClick={() => setElectronics(electronics + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center font-bold text-lg select-none"
                >
                  +
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Calculated result & suggestion */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-center text-center h-full min-h-[260px] relative overflow-hidden backdrop-blur-sm">
          <div className="space-y-2 mt-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Carga Térmica Estimada</span>
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 leading-none">
              {calculatedBtu.toLocaleString('pt-BR')} <span className="text-lg font-bold text-cyan-400">BTUs</span>
            </div>
          </div>

          <div className="my-4 border-t border-white/10 w-full pt-4 space-y-2">
            <span className="text-xs text-slate-300 block">Recomendamos modelos de:</span>
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
        <p className="text-sm text-slate-300 mt-2 mb-4">Referência GouveClima. As faixas orientativas abaixo podem diferir do cálculo, que considera as condições informadas do ambiente.</p>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900/60 text-cyan-300"><tr><th scope="col" className="p-3">Capacidade</th><th scope="col" className="p-3">Área de referência</th><th scope="col" className="p-3">Exemplo de aplicação</th></tr></thead>
            <tbody>{capacityGuide.map(row => <tr key={row.btu} className="border-t border-white/10"><th scope="row" className="p-3 whitespace-nowrap">{row.btu.toLocaleString('pt-BR')} BTUs</th><td className="p-3 whitespace-nowrap">{row.area}</td><td className="p-3 text-slate-300">{row.application}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="text-xs text-slate-300 mt-4 leading-relaxed">Cálculo: área × 750 BTUs/m² em manhã/sombra ou × 800 com sol da tarde, mais 600 BTUs por pessoa além da primeira e por aparelho. A sugestão arredonda para a próxima capacidade disponível, até 60.000 BTUs. Pé-direito, vidros e uso do ambiente também influenciam; confirme a escolha com a GouveClima.</p>
      </div>
    </div>
  );
}

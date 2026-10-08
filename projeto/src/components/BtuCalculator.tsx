import React, { useState } from 'react';
import { Calculator, Sun, Cloud, Users, Monitor, ArrowRight, Check } from 'lucide-react';

interface BtuCalculatorProps {
  onRecommend: (calculatedBtu: number) => void;
}

export default function BtuCalculator({ onRecommend }: BtuCalculatorProps) {
  const [area, setArea] = useState<number>(20);
  const [people, setPeople] = useState<number>(2);
  const [electronics, setElectronics] = useState<number>(1);
  const [sunExposure, setSunExposure] = useState<'morning' | 'afternoon'>('afternoon');

  // Calculates BTU
  // Base factor is 600 BTU per m² for morning sun, 800 BTU per m² for afternoon sun
  const factor = sunExposure === 'morning' ? 600 : 800;
  
  // BTU = (Area * factor) + (600 * (people - 1, if people > 1)) + (600 * electronics)
  const peopleFactor = people > 1 ? (people - 1) * factor : 0;
  const electronicsFactor = electronics * factor;
  const calculatedBtu = (area * factor) + peopleFactor + electronicsFactor;

  // Find standard model recommendations (9k, 12k, 18k, 24k)
  const getRecommendedRange = (btu: number) => {
    if (btu <= 9500) return { btu: 9000, desc: '9.000 BTUs' };
    if (btu <= 12500) return { btu: 12000, desc: '12.000 BTUs' };
    if (btu <= 18500) return { btu: 18000, desc: '18.000 BTUs' };
    return { btu: 24000, desc: '24.000+ BTUs' };
  };

  const rec = getRecommendedRange(calculatedBtu);

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
              Insira os dados do seu cômodo e descubra a capacidade de refrigeração ideal em poucos segundos.
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
              {rec.desc}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onRecommend(rec.btu)}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer group mt-auto"
          >
            Ver Modelos Recomendados
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

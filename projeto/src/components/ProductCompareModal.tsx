import React from 'react';
import { Product } from '../types';
import ProductImage from './ProductImage';
import { X, Check, Zap, Wifi, ShieldCheck, MessageCircle, ShoppingCart, Trash2 } from 'lucide-react';

interface ProductCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveFromCompare: (productId: string) => void;
  onClearAll: () => void;
  onAddToCart: (product: Product) => void;
  onOpenDetail: (product: Product) => void;
}

export default function ProductCompareModal({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveFromCompare,
  onClearAll,
  onAddToCart,
  onOpenDetail,
}: ProductCompareModalProps) {
  if (!isOpen) return null;

  const maxSlots = 4;
  const slots = Array.from({ length: maxSlots }, (_, i) => comparedProducts[i] || null);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
              Comparativo Técnico de Climatização
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Comparando {comparedProducts.length} de {maxSlots} modelos
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {comparedProducts.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Limpar Todos
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Content / Comparison Grid */}
        <div className="p-4 sm:p-6 overflow-x-auto flex-1 space-y-6">
          <div className="min-w-[700px] grid grid-cols-5 gap-3 sm:gap-4 text-xs">
            
            {/* Specification Labels Column */}
            <div className="space-y-4 font-bold text-slate-500 pt-36">
              <div className="h-10 flex items-center border-b border-slate-100 text-slate-900 font-black uppercase text-[10px]">
                Marca
              </div>
              <div className="h-10 flex items-center border-b border-slate-100 text-slate-900 font-black uppercase text-[10px]">
                Capacidade (BTUs)
              </div>
              <div className="h-10 flex items-center border-b border-slate-100 text-slate-900 font-black uppercase text-[10px]">
                Tecnologia
              </div>
              <div className="h-10 flex items-center border-b border-slate-100 text-slate-900 font-black uppercase text-[10px]">
                Ciclo
              </div>
              <div className="h-10 flex items-center border-b border-slate-100 text-slate-900 font-black uppercase text-[10px]">
                Selo Procel
              </div>
              <div className="h-10 flex items-center border-b border-slate-100 text-slate-900 font-black uppercase text-[10px]">
                Wi-Fi Integrado
              </div>
              <div className="h-10 flex items-center border-b border-slate-100 text-slate-900 font-black uppercase text-[10px]">
                Área Recomendada
              </div>
              <div className="h-10 flex items-center border-b border-slate-100 text-slate-900 font-black uppercase text-[10px]">
                Garantia
              </div>
              <div className="h-12 flex items-center border-b border-slate-100 text-slate-900 font-black uppercase text-[10px]">
                Condições Comerciais
              </div>
            </div>

            {/* 4 Product Slots Columns */}
            {slots.map((prod, idx) => (
              <div key={prod ? prod.id : `empty-slot-${idx}`} className="bg-slate-50/70 rounded-2xl p-3 border border-slate-100 flex flex-col justify-between">
                {prod ? (
                  <div className="space-y-4">
                    {/* Header Item Card */}
                    <div className="relative text-center space-y-2">
                      <button
                        onClick={() => onRemoveFromCompare(prod.id)}
                        className="absolute -top-1 -right-1 p-1 bg-slate-200 hover:bg-red-500 hover:text-white rounded-full transition-all text-slate-600"
                        title="Remover da comparação"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="w-24 h-24 bg-white rounded-xl p-2 mx-auto flex items-center justify-center shadow-sm">
                        <ProductImage src={prod.image} alt={prod.name} containerClassName="w-full h-full" />
                      </div>

                      <h4 
                        onClick={() => { onOpenDetail(prod); onClose(); }}
                        className="font-bold text-slate-900 text-xs line-clamp-2 hover:text-sky-600 cursor-pointer h-8"
                      >
                        {prod.name}
                      </h4>
                    </div>

                    {/* Data Specs Rows */}
                    <div className="h-10 flex items-center justify-center border-b border-slate-200/60 font-extrabold text-sky-700">
                      {prod.brand}
                    </div>

                    <div className="h-10 flex items-center justify-center border-b border-slate-200/60 font-mono font-black text-slate-900">
                      {prod.capacityBTU.toLocaleString('pt-BR')} BTUs
                    </div>

                    <div className="h-10 flex items-center justify-center border-b border-slate-200/60">
                      <span className="px-2 py-0.5 bg-sky-100 text-sky-800 font-extrabold rounded-md text-[10px]">
                        {prod.technology}
                      </span>
                    </div>

                    <div className="h-10 flex items-center justify-center border-b border-slate-200/60 font-medium text-slate-700">
                      {prod.cycle || 'Frio'}
                    </div>

                    <div className="h-10 flex items-center justify-center border-b border-slate-200/60">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold rounded-md text-[10px] flex items-center gap-1">
                        <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                        {prod.procelBadge || 'Selo A'}
                      </span>
                    </div>

                    <div className="h-10 flex items-center justify-center border-b border-slate-200/60">
                      {prod.hasWifi ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                          <Check className="w-3.5 h-3.5" /> Sim
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium text-[11px]">Opcional</span>
                      )}
                    </div>

                    <div className="h-10 flex items-center justify-center border-b border-slate-200/60 font-semibold text-slate-700">
                      {prod.recommendedArea || 'Dimensionamento sob consulta'}
                    </div>

                    <div className="h-10 flex items-center justify-center border-b border-slate-200/60 font-semibold text-slate-600">
                      {prod.warranty || 'Confirmar com o consultor de vendas'}
                    </div>

                    <div className="h-12 flex flex-col items-center justify-center border-b border-slate-200/60">
                      <span className="text-xs font-black text-sky-700 uppercase">
                        Sob Consulta
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2">
                      <button
                        onClick={() => { onAddToCart(prod); onClose(); }}
                        className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl text-[11px] shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Adicionar ao Pedido
                      </button>

                      <a
                        href={`https://wa.me/5561981108374?text=${encodeURIComponent(`Olá! Gostaria de cotar o modelo comparado: ${prod.name}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-xl text-[10px] flex items-center justify-center gap-1 text-center"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        Consultar Preço
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 space-y-2 min-h-[400px]">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 font-black text-lg">
                      +
                    </div>
                    <span className="text-xs font-bold text-slate-400">
                      Espaço livre para comparação
                    </span>
                    <p className="text-[10px] text-slate-400">
                      Selecione outro produto no catálogo para comparar.
                    </p>
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
          Dúvida sobre qual a capacidade ideal para o seu espaço? Use nossa <strong className="text-sky-600">Calculadora de BTUs</strong> ou fale direto com nossos consultores.
        </div>

      </div>
    </div>
  );
}

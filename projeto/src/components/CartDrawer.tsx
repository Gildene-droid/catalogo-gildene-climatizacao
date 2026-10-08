import React from 'react';
import { X, Trash2, Plus, Minus, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import ProductImage from './ProductImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-left">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-800">Meu Pedido</h3>
                <span className="text-[10px] text-slate-400 font-medium block">Lista de orçamentos</span>
              </div>
              {totalItemsCount > 0 && (
                <span className="bg-sky-100 text-sky-700 text-[10px] font-black rounded-full px-2.5 py-0.5 ml-2">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-700 text-base block">Seu pedido está vazio</span>
                  <p className="text-xs text-slate-400 max-w-[240px]">
                    Navegue pelo nosso catálogo de climatização e adicione os produtos desejados para solicitar um orçamento.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="p-3.5 border border-slate-100 bg-slate-50/50 rounded-2xl relative group flex gap-3.5 items-start">
                    
                    {/* Foto */}
                    <ProductImage
                      src={item.product.image}
                      alt={item.product.name}
                      containerClassName="w-20 h-20 shrink-0 border border-slate-100 rounded-xl bg-white p-1 overflow-hidden"
                    />

                    {/* Especificações exigidas: Nome, Marca, Capacidade (BTUs), Tecnologia, Quantidade */}
                    <div className="flex-1 min-w-0 space-y-1 pr-6">
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                        {item.product.name}
                      </h4>
                      
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                        <span className="px-2 py-0.5 bg-sky-50 text-sky-700 font-extrabold rounded-md border border-sky-100">
                          {item.product.brand}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono rounded-md">
                          {item.product.capacityBTU.toLocaleString()} BTUs
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                          {item.product.technology}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 font-mono rounded-md">
                          {item.voltage}
                        </span>
                      </div>

                      {/* Accessories list */}
                      {item.selectedUpsells.length > 0 && (
                        <div className="pt-0.5 space-y-0.5">
                          {item.selectedUpsells.map((up) => (
                            <span key={up.id} className="text-[9px] text-sky-700 font-medium block">
                              + {up.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Alterar Quantidade */}
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Quantidade</span>
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all font-bold cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-black text-slate-800 min-w-6 text-center select-none font-mono">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all font-bold cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Remover Item */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg absolute top-3 right-3 shadow-2xs border border-slate-100 transition-all cursor-pointer"
                      title="Remover Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer controls - No Prices, No Subtotals, No Payments */}
          {cart.length > 0 && (
            <div className="border-t border-slate-100 p-6 space-y-3 bg-slate-50/50">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pronto para gerar sua solicitação de orçamento oficial.</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={onCheckout}
                  className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs rounded-xl shadow-md hover:shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <FileText className="w-4 h-4" />
                  Solicitar Orçamento
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-slate-500 hover:text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  Continuar Escolhendo
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

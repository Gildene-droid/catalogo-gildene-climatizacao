import React from 'react';
import { Product } from '../types';
import ProductImage from './ProductImage';
import { Heart, X, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onOpenDetail: (product: Product) => void;
}

export default function WishlistModal({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onAddToCart,
  onOpenDetail,
}: WishlistModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Meus Favoritos</h2>
              <p className="text-xs text-slate-400 font-medium">
                {favorites.length} {favorites.length === 1 ? 'produto salvo' : 'produtos salvos'} na sua lista
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {favorites.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-300 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Sua lista de favoritos está vazia</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Navegue pelo nosso catálogo de ar condicionado e clique no ícone de coração para salvar seus modelos preferidos.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {favorites.map((product) => (
                <div key={product.id} className="py-4 flex items-center gap-4 group">
                  <div 
                    onClick={() => { onOpenDetail(product); onClose(); }}
                    className="w-20 h-20 bg-slate-50 rounded-2xl p-2 shrink-0 cursor-pointer border border-slate-100 flex items-center justify-center"
                  >
                    <ProductImage src={product.image} alt={product.name} containerClassName="w-full h-full" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black uppercase text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                      {product.brand} • {product.capacityBTU.toLocaleString()} BTUs
                    </span>
                    <h4 
                      onClick={() => { onOpenDetail(product); onClose(); }}
                      className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-sky-600 cursor-pointer mt-1"
                    >
                      {product.name}
                    </h4>
                    <div className="text-xs font-black text-sky-700 uppercase mt-1">
                      Sob Consulta
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => { onAddToCart(product); onClose(); }}
                      className="p-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                      title="Adicionar ao Pedido"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="hidden sm:inline">Adicionar ao Pedido</span>
                    </button>

                    <button
                      onClick={() => onRemoveFavorite(product.id)}
                      className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                      title="Remover dos favoritos"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}

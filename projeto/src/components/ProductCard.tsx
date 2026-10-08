import React from 'react';
import { Product } from '../types';
import ProductImage from './ProductImage';
import { Star, MessageCircle, ArrowRight, ShieldCheck, Zap, Heart, CheckSquare, Square } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (product: Product) => void;
  isCompared?: boolean;
  onToggleCompare?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isFavorite = false,
  onToggleFavorite,
  isCompared = false,
  onToggleCompare,
}) => {
  const whatsappUrl = `https://wa.me/5561981108374?text=${encodeURIComponent(
    `Olá! Gostaria de consultar o preço e condições para o modelo: ${product.name} (${product.capacityBTU.toLocaleString()} BTUs - ${product.brand})`
  )}`;

  return (
    <div className="bg-white border border-slate-100 hover:border-sky-300 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      {/* Top Badges & Actions */}
      <div className="flex items-center justify-between gap-2 mb-3 z-10">
        <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-full">
          {product.brand}
        </span>

        <div className="flex items-center gap-1.5">
          {product.procelBadge && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-emerald-600 fill-emerald-600" />
              {product.procelBadge}
            </span>
          )}

          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(product);
              }}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
                  : 'bg-slate-100 text-slate-400 hover:text-rose-500 hover:bg-slate-200'
              }`}
              title={isFavorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Product Image Container */}
      <div 
        onClick={() => onSelect(product)}
        className="w-full h-48 bg-slate-50/80 rounded-xl p-3 flex items-center justify-center cursor-pointer mb-3 relative group-hover:bg-sky-50/40 transition-colors"
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          containerClassName="w-full h-full"
        />
        
        <span className="absolute bottom-2 left-2 text-[9px] font-extrabold uppercase bg-slate-900/80 text-white px-2 py-0.5 rounded-md backdrop-blur-sm">
          {product.cycle || 'Frio'} • {product.technology}
        </span>

        <span className="absolute top-2 right-2 text-[9px] font-extrabold uppercase bg-sky-600 text-white px-2 py-0.5 rounded-md shadow-sm">
          {product.capacityBTU.toLocaleString()} BTUs
        </span>
      </div>

      <p className="text-[10px] text-slate-400 mb-2">Foto de referência. Confirme a versão no orçamento.</p>
      {/* Compare Toggle Pill */}
      {onToggleCompare && (
        <div className="mb-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product);
            }}
            className={`w-full py-1 px-2.5 rounded-lg text-[10px] font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isCompared
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
            }`}
          >
            {isCompared ? (
              <>
                <CheckSquare className="w-3 h-3 text-white" />
                Comparando Modelo
              </>
            ) : (
              <>
                <Square className="w-3 h-3 text-slate-400" />
                + Comparar este modelo
              </>
            )}
          </button>
        </div>
      )}

      {/* Product Details */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 mb-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="text-xs font-bold text-slate-700">{product.rating.toFixed(1)}</span>
            <span className="text-[10px] text-slate-400">({product.reviewsCount} avaliações)</span>
          </div>

          <h3 
            onClick={() => onSelect(product)}
            className="font-bold text-slate-900 text-sm leading-snug hover:text-sky-600 transition-colors cursor-pointer line-clamp-2"
          >
            {product.name}
          </h3>
        </div>

        {/* Quote Badge & Actions */}
        <div className="pt-3 border-t border-slate-100 mt-2 space-y-3">
          <div className="bg-sky-50/80 border border-sky-100 rounded-xl p-2.5 text-center">
            <span className="text-xs font-black text-sky-800 block">
              Consulte Condições Comerciais
            </span>
            <span className="text-[10px] text-slate-500 font-semibold block">
              Solicite um orçamento personalizado
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {onAddToCart ? (
              <button
                onClick={() => onAddToCart(product)}
                className="py-2 px-2 bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-extrabold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                Adicionar ao Pedido
              </button>
            ) : (
              <button
                onClick={() => onSelect(product)}
                className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-extrabold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                Ver Detalhes
              </button>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-extrabold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 text-center"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Consultar Preço
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

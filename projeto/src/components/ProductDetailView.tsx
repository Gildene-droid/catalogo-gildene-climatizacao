import React, { useState } from 'react';
import { Star, Truck, Heart, ArrowLeft, ShoppingCart, Check, FileText, Settings, Award, ZoomIn, X, MessageCircle, Download, ShieldCheck, Zap } from 'lucide-react';
import { Product, UpsellItem } from '../types';
import ProductImage from './ProductImage';
import ProductCard from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
  allProducts?: Product[];
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, voltage: '220V' | '110V', selectedUpsells: UpsellItem[]) => void;
  onOpenProductDetail?: (product: Product) => void;
  onBuyNow?: (product: Product, quantity: number, voltage: '220V' | '110V', selectedUpsells: UpsellItem[]) => void;
}

type TabType = 'specs' | 'desc' | 'manual' | 'reviews';

export default function ProductDetailView({
  product,
  allProducts = [],
  onBack,
  onAddToCart,
  onOpenProductDetail,
  onBuyNow,
}: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [voltage, setVoltage] = useState<'220V' | '110V'>('220V');
  const [cep, setCep] = useState('');
  const [shippingResult, setShippingResult] = useState<{ cost: number; days: number; text: string } | null>(null);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const [selectedUpsells, setSelectedUpsells] = useState<UpsellItem[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('specs');
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);

  // Freight calculation
  const handleCalculateShipping = () => {
    if (!cep.trim() || cep.length < 8) {
      alert('Por favor, insira um CEP válido com 8 dígitos');
      return;
    }
    setShippingLoading(true);
    setShippingResult(null);

    setTimeout(() => {
      const cleanCep = cep.replace(/\D/g, '');
      const firstDigit = parseInt(cleanCep[0]);
      
      if (firstDigit === 0 || firstDigit === 1) {
        setShippingResult({ cost: 0, days: 3, text: 'Frete sob consulta para São Paulo e Região' });
      } else if (firstDigit === 7) {
        setShippingResult({ cost: 0, days: 2, text: 'Condições Especiais para Brasília e Entorno' });
      } else {
        setShippingResult({ cost: 45.00, days: 5, text: 'Frete sob consulta via WhatsApp' });
      }
      setShippingLoading(false);
    }, 600);
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, 1, voltage, selectedUpsells);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  const handleBuyNowClick = () => {
    if (onBuyNow) {
      onBuyNow(product, 1, voltage, selectedUpsells);
    } else {
      onAddToCart(product, 1, voltage, selectedUpsells);
    }
  };

  // Find related products (same category or same brand)
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de solicitar um orçamento comercial para o produto:\n*${product.name}*\nMarca: ${product.brand}\nBTUs: ${product.capacityBTU}\nTecnologia: ${product.technology}\nSKU: ${product.sku || 'N/A'}`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fade-in" id="product-detail">
      
      {/* Lightbox Image Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer z-50"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center p-4">
            <ProductImage
              src={selectedImage}
              alt={`${product.name} ampliada`}
              containerClassName="w-full h-full max-h-[75vh]"
            />
            <span className="text-white text-xs font-mono mt-4 text-center">
              {product.name} - Foto de referência da linha
            </span>
          </div>
        </div>
      )}

      {/* Back Button & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 transition-all font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o catálogo
        </button>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 font-mono">
          <span>Início</span>
          <span>&gt;</span>
          <span>{product.category}</span>
          <span>&gt;</span>
          <span className="text-sky-600 truncate max-w-[200px]">{product.brand}</span>
        </div>
      </div>

      {/* Product Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Gallery & Zoom */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] w-full bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden relative group flex items-center justify-center p-6 shadow-sm">
            <ProductImage
              src={selectedImage}
              alt={product.name}
              containerClassName="w-full h-full"
            />
            {product.technology && (
              <span className="absolute top-6 left-6 px-3.5 py-1.5 bg-sky-600 text-white text-xs font-extrabold rounded-full tracking-widest shadow-sm">
                {product.technology.toUpperCase()}
              </span>
            )}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <button
                onClick={() => setIsZoomOpen(true)}
                className="p-3 bg-white/90 hover:bg-white text-slate-700 hover:text-sky-600 rounded-full shadow-md backdrop-blur-sm transition-all cursor-pointer z-10"
                title="Ampliar Imagem"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-3 bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 rounded-full shadow-md backdrop-blur-sm transition-all cursor-pointer z-10"
                title="Favoritar"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-[10px] font-bold font-mono">
              Foto de referência da linha
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {(product.gallery.length > 0 ? product.gallery : [product.image]).map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className={`aspect-[4/3] rounded-2xl bg-slate-50 p-2 border overflow-hidden flex items-center justify-center transition-all cursor-pointer ${
                  selectedImage === imgUrl ? 'border-sky-500 ring-2 ring-sky-500/15 bg-white' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <ProductImage
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  containerClassName="w-full h-full"
                />
              </button>
            ))}
          </div>

          {/* Fast Highlights Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center">
              <Zap className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Eficiência</span>
              <span className="text-xs font-black text-slate-800">{product.procelBadge || 'Selo Procel A'}</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Garantia</span>
              <span className="text-xs font-black text-slate-800">{product.warranty || 'Até 10 Anos'}</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center">
              <Truck className="w-4 h-4 text-sky-500 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Entrega</span>
              <span className="text-xs font-black text-slate-800">Todo o Brasil</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center">
              <Award className="w-4 h-4 text-purple-500 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Recomendado</span>
              <span className="text-xs font-black text-slate-800">{product.recommendedArea || 'Até 20 m²'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-sky-100">
                {product.brand}
              </span>
              {product.hasWifi && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-emerald-100">
                  Wi-Fi Integrado
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-500 font-mono">
                {product.rating} ({product.reviewsCount} avaliações)
              </span>
              {product.sku && (
                <span className="text-xs text-slate-400 font-mono">SKU: {product.sku}</span>
              )}
            </div>
          </div>

          {/* Quote Banner Box */}
          <div className="bg-sky-50/80 rounded-2xl p-5 space-y-3 border border-sky-100 shadow-xs">
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-700 block font-mono">
              CONDIÇÕES COMERCIAIS
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-snug flex items-start gap-2">
              <span className="text-sky-600 shrink-0">💬</span>
              <span>Consulte condições comerciais com um de nossos especialistas.</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Solicite um orçamento personalizado diretamente com a equipe GouveClima — Soluções em Climatização. Atendimento B2B e B2C para todo o Brasil.
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddToCartClick}
                className="w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <ShoppingCart className="w-4 h-4" />
                Adicionar ao Pedido
              </button>

              <a
                href={`https://wa.me/5561981108374?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                Consultar Preço
              </a>
            </div>
          </div>

          {/* Voltage Selection */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Voltagem</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setVoltage('220V')}
                className={`py-3 border-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  voltage === '220V'
                    ? 'border-sky-600 bg-sky-50/20 text-sky-700 shadow-sm'
                    : 'border-slate-100 hover:border-slate-300 text-slate-600'
                }`}
              >
                220V Mono / Bifásico
              </button>
              <button
                type="button"
                disabled
                className="py-3 border-2 border-slate-100 text-slate-300 bg-slate-50/50 rounded-xl text-xs font-bold flex flex-col items-center justify-center relative cursor-not-allowed select-none"
              >
                <span>110V</span>
                <span className="absolute -top-2 px-1.5 py-0.5 bg-slate-400 text-white font-extrabold text-[8px] rounded-full uppercase tracking-wider">
                  Sob Consulta
                </span>
              </button>
            </div>
          </div>

          {/* Freight Calculator */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Calcular Frete & Prazo</span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="00000-000"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800 font-mono"
              />
              <button
                type="button"
                onClick={handleCalculateShipping}
                disabled={shippingLoading}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-black rounded-xl transition-all cursor-pointer shadow-sm"
              >
                {shippingLoading ? 'Calculando...' : 'Calcular'}
              </button>
            </div>

            {shippingResult && (
              <div className="flex gap-2.5 items-center p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold rounded-2xl">
                <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="leading-tight">
                  <span className="font-bold text-emerald-700 block">{shippingResult.text}</span>
                  <span className="text-[10px] text-emerald-600">Entrega garantida para todo o Brasil</span>
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCartClick}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <ShoppingCart className="w-4 h-4" />
            Adicionar ao Pedido
          </button>
          {addedMessage && (
            <p className="text-center text-xs font-semibold text-emerald-600 bg-emerald-50 py-2 rounded-xl border border-emerald-100 animate-scale">
              ✓ Produto adicionado ao pedido com sucesso!
            </p>
          )}
        </div>

      </div>

      {/* Tabs Section: Specs, Description, Manual, Reviews */}
      <div className="border-t border-slate-100 pt-8">
        <div className="flex border-b border-slate-100 overflow-x-auto gap-6 sm:gap-10 pb-0.5">
          {[
            { id: 'specs', label: 'Especificações Técnicas', icon: Settings },
            { id: 'desc', label: 'Descrição Completa', icon: FileText },
            { id: 'manual', label: 'Manual & Ficha PDF', icon: Award },
            { id: 'reviews', label: `Avaliações (${product.reviewsCount})`, icon: Star },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`pb-3 font-bold text-xs transition-all flex items-center gap-1.5 border-b-2 shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-sky-600 text-sky-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-6 min-h-[200px]">
          {activeTab === 'specs' && (
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <div
                    key={key}
                    className={`flex justify-between items-center px-6 py-3.5 border-slate-50 ${
                      idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'
                    } border-b`}
                  >
                    <span className="font-semibold text-slate-600 text-xs">{key}</span>
                    <span className="font-bold text-slate-800 font-mono text-xs">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'desc' && (
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 text-sm text-slate-600 leading-relaxed">
              <h3 className="font-black text-slate-900 text-base">{product.name}</h3>
              <p>{product.description}</p>
              <div className="space-y-2 pt-2">
                <span className="font-bold text-slate-800 block">Diferenciais e Tecnologias:</span>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 font-medium">
                  {product.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0 border border-sky-100">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="leading-tight">
                  <span className="font-bold text-slate-800 text-sm block">Ficha Técnica e Manual de Instalação {product.brand}.pdf</span>
                  <span className="text-[11px] text-slate-400 font-mono">Documentação Oficial do Fabricante • Português</span>
                </div>
              </div>
              <a
                href={product.pdfUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!product.pdfUrl) {
                    e.preventDefault();
                    alert(`O manual oficial do modelo ${product.name} está sendo disponibilizado sob demanda. Solicite pelo WhatsApp!`);
                  }
                }}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Download className="w-4 h-4" />
                Baixar Ficha Técnica PDF
              </a>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="text-center sm:text-left">
                  <span className="text-5xl font-black text-slate-800 tracking-tighter block">{product.rating}</span>
                  <div className="flex gap-0.5 text-amber-400 my-1 justify-center sm:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono block">Média de {product.reviewsCount} avaliações</span>
                </div>
                <div className="space-y-2 flex-1 max-w-sm w-full">
                  {[
                    { stars: 5, pct: '88%' },
                    { stars: 4, pct: '10%' },
                    { stars: 3, pct: '2%' },
                    { stars: 2, pct: '0%' },
                    { stars: 1, pct: '0%' }
                  ].map((bar) => (
                    <div key={bar.stars} className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                      <span className="w-12 text-right">{bar.stars} estrelas</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-600 rounded-full" style={{ width: bar.pct }} />
                      </div>
                      <span className="w-8 font-mono text-right">{bar.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-slate-100 pt-10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black text-sky-600 uppercase tracking-widest block">Recomendações Especializadas</span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Produtos Relacionados</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                onOpenDetail={(p) => {
                  if (onOpenProductDetail) {
                    onOpenProductDetail(p);
                  }
                }}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

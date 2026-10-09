import { getWarrantyPolicy } from '../warrantyPolicies';
import React from 'react';
import { BRANDS_DATA, PRODUCTS } from '../data';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { Shield, Zap, Award, CheckCircle, MessageCircle, ArrowLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface BrandSEOPageProps {
  brandId: string;
  onSelectProduct: (product: Product) => void;
  onBackToHome: () => void;
}

export const BrandSEOPage: React.FC<BrandSEOPageProps> = ({ brandId, onSelectProduct, onBackToHome }) => {
  const brandKey = brandId.toLowerCase().trim();
  const brandInfo = BRANDS_DATA[brandKey] || {
    id: brandKey,
    name: brandId,
    tagline: `Soluções de Ar Condicionado Inverter ${brandId}`,
    description: `Confira a linha completa de condicionadores de ar ${brandId}. Modelos Split Hi Wall, Cassete e Inverter com máxima economia e garantia.`,
    highlights: [
      'Compressor Inverter de alta eficiência energética',
      'Serpentina em cobre anticorrosiva',
      'Gás ecológico R-32 de alta performance',
      'Atendimento especializado e entrega garantida'
    ],
    warrantyInfo: 'Garantia oficial do fabricante com suporte especializado.',
    seoKeywords: [`Ar Condicionado ${brandId}`, `Split Inverter ${brandId}`, `${brandId} 12000 BTUs`]
  };

  // Filter products matching this brand
  const brandProducts = PRODUCTS.filter(
    (p) => p.brand.toLowerCase() === brandKey || p.brand.toLowerCase().includes(brandKey)
  );

  const whatsappUrl = `https://wa.me/message/MIJAF4C4WX2EN1?text=${encodeURIComponent(
    `Olá! Gostaria de consultar orçamentos e tabelas de preço para aparelhos de ar condicionado da marca ${brandInfo.name}.`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fade-in">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-sky-600 transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Início
        </button>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span>Início</span>
          <ChevronRight className="w-3 h-3" />
          <span>Marcas</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-sky-600 font-bold">{brandInfo.name}</span>
        </div>
      </div>

      {/* Hero Banner for Brand */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-block text-[11px] font-black uppercase tracking-widest text-sky-400 bg-sky-950/80 border border-sky-800/80 px-3 py-1 rounded-full">
            Catálogo Oficial & Especialista SEO {brandInfo.name}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ar Condicionado <span className="text-sky-400">{brandInfo.name}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
            {brandInfo.tagline}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {brandInfo.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-2xl shadow-lg transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar Preços de Fábrica {brandInfo.name}
            </a>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-300 bg-sky-900/40 px-4 py-3 rounded-2xl border border-sky-800/50">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>{getWarrantyPolicy(brandInfo.name).summary}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {brandInfo.highlights.map((highlight, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2 flex flex-col justify-between">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5 text-sky-600" />
            </div>
            <p className="text-xs font-bold text-slate-800 leading-snug">{highlight}</p>
          </div>
        ))}
      </div>

      {/* Brand Product Catalog Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Modelos em Destaque {brandInfo.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Aparelhos testados e homologados com pronta entrega e assistência técnica.
            </p>
          </div>
          <span className="text-xs font-extrabold text-sky-700 bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-xl">
            {brandProducts.length} modelo(s) encontrado(s)
          </span>
        </div>

        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brandProducts.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 text-center space-y-3">
            <p className="text-sm font-bold text-slate-700">
              Temos toda a linha {brandInfo.name} disponível via atendimento direto.
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Fale com nossa equipe técnica no WhatsApp para receber cotações de modelos de 9.000 a 60.000 BTUs {brandInfo.name} com entrega imediata.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-2xl shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Solicitar Catálogo Completo {brandInfo.name}
            </a>
          </div>
        )}
      </div>

      {/* Brand SEO Info & FAQ Section */}
      <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">
              Por que escolher Ar Condicionado {brandInfo.name}?
            </h3>
            <p className="text-xs text-slate-500">Inovação, economia de energia e durabilidade para seu ambiente</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-2 bg-slate-50 p-5 rounded-2xl">
            <h4 className="font-bold text-slate-900 text-sm">Eficiência e Selo Procel</h4>
            <p>
              Os equipamentos de ar-condicionado {brandInfo.name} passam por rigorosos testes de qualidade do Inmetro, alcançando classificação A em consumo de energia para reduzir sensivelmente sua conta de eletricidade.
            </p>
          </div>
          <div className="space-y-2 bg-slate-50 p-5 rounded-2xl">
            <h4 className="font-bold text-slate-900 text-sm">Serpentina em Cobre e Durabilidade</h4>
            <p>
              Com ligas reforçadas em cobre anticorrosivo, os aparelhos {brandInfo.name} resistem perfeitamente à maresia, intempéries e oscilações climáticas no Distrito Federal e todo o Brasil.
            </p>
          </div>
        </div>

        {/* SEO Tags Cloud */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2">
            Termos Frequentes:
          </span>
          {brandInfo.seoKeywords.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSEOPage;

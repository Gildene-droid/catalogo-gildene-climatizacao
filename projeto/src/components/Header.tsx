import React from 'react';
import { Search, ShoppingCart, User, Menu, X, ShieldCheck, Globe, Calculator, BookOpen, Wind, Lock, Heart } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  cart: CartItem[];
  onOpenCart: () => void;
  checkoutMode: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenSeoModal?: () => void;
  favoritesCount?: number;
  onOpenWishlist?: () => void;
}

export default function Header({
  currentTab,
  onTabChange,
  cart,
  onOpenCart,
  checkoutMode,
  searchQuery,
  onSearchChange,
  onOpenSeoModal,
  favoritesCount = 0,
  onOpenWishlist,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'ar-condicionado', label: 'Catálogo' },
    { id: 'marcas', label: 'Marcas' },
    { id: 'calculadora', label: 'Calculadora BTUs' },
    { id: 'guia-compra', label: 'Guia de Compra' },
    { id: 'contato', label: 'Atendimento' },
  ];

  if (checkoutMode) {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm" id="header-checkout">
        {/* Top Price Notice Bar */}
        <div className="bg-sky-900 text-sky-100 text-center text-xs py-2 px-4 font-bold tracking-wide border-b border-sky-800">
          💡 Os preços podem variar conforme região, disponibilidade e condições comerciais. Solicite um orçamento personalizado.
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('inicio')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-md">
              G
            </div>
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Gildene <span className="text-sky-600 font-bold text-base hidden sm:inline">Clima 2.0</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
            <span className="hidden md:inline-flex items-center gap-1.5 text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full text-xs font-extrabold border border-sky-100">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              Solicitação de Orçamento Direta
            </span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300" id="header-main">
      {/* Top Notice Bar - Always Visible */}
      <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-900 text-sky-100 text-center text-[11px] sm:text-xs py-2 px-4 font-extrabold tracking-wide border-b border-sky-800/80 shadow-inner flex items-center justify-center gap-2">
        <span>💡 Os preços podem variar conforme região, disponibilidade e condições comerciais. Solicite um orçamento personalizado.</span>
      </div>

      {/* Top Secondary Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 hidden sm:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold text-slate-200">
              <span className="text-sky-400">🎧</span> Atendimento especializado Gildene Clima
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <span className="text-sky-400">🕒</span> Segunda a sexta, das 08h às 18h
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <span className="text-sky-400">🚚</span> Entrega para todo o Brasil
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">|</span>
            {onOpenSeoModal && (
              <>
                <button
                  onClick={onOpenSeoModal}
                  className="text-sky-400 hover:text-white font-bold flex items-center gap-1 transition-colors"
                >
                  <Globe className="w-3 h-3" />
                  Sitemap & Robots.txt
                </button>
                <span className="text-slate-600">|</span>
              </>
            )}
            <a
              href="https://wa.me/message/MIJAF4C4WX2EN1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-extrabold flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-0.5 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              WhatsApp: (61) 98110-8374
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo / Branding */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => onTabChange('inicio')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-md">
            G
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight block leading-none">
              Gildene<span className="text-sky-600 font-black">Clima</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mt-0.5">
              Soluções em Climatização
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`text-xs font-bold transition-all duration-200 relative py-2 uppercase tracking-wider ${
                currentTab === item.id
                  ? 'text-sky-600'
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              {item.label}
              {currentTab === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions / Search & Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Box */}
          <div className="relative hidden md:block w-56 lg:w-64">
            <input
              type="text"
              placeholder="Buscar marcas, BTUs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-2xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Wishlist Trigger */}
          {onOpenWishlist && (
            <button
              onClick={onOpenWishlist}
              className="p-2.5 hover:bg-rose-50 rounded-2xl text-slate-700 hover:text-rose-600 transition-all relative cursor-pointer"
              aria-label="Favoritos"
              title="Meus Favoritos"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-800'}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-black text-[10px] rounded-full flex items-center justify-center shadow-md animate-scale">
                  {favoritesCount}
                </span>
              )}
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="p-2.5 hover:bg-slate-100 rounded-2xl text-slate-700 transition-all relative cursor-pointer"
            aria-label="Carrinho"
            id="cart-trigger"
          >
            <ShoppingCart className="w-5 h-5 text-slate-800" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-sky-600 text-white font-black text-[10px] rounded-full flex items-center justify-center shadow-md animate-scale">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 hover:bg-slate-100 rounded-2xl text-slate-700 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white shadow-xl animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Buscar no catálogo..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
                  currentTab === item.id
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            {onOpenSeoModal && (
              <button
                onClick={() => {
                  onOpenSeoModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl font-bold text-xs text-sky-600 bg-sky-50 flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                Ver Sitemap.xml e Robots.txt
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FilterSidebar from './components/FilterSidebar';
import BtuCalculator from './components/BtuCalculator';
import ProductDetailView from './components/ProductDetailView';
import CheckoutView from './components/CheckoutView';
import CartDrawer from './components/CartDrawer';
import ProductCard from './components/ProductCard';
import BrandSEOPage from './components/BrandSEOPage';
import BuyingGuide from './components/BuyingGuide';
import SeoHead from './components/SeoHead';
import SitemapRobotsModal from './components/SitemapRobotsModal';
interface SiteSettings {
  heroTitle: string;
  heroHighlightText: string;
  heroSubtitle: string;
  whatsappNumber: string;
  whatsappLink: string;
  topBarText: string;
  topBarHours: string;
  storeAddress: string;
}
import ProductCompareModal from './components/ProductCompareModal';
import WishlistModal from './components/WishlistModal';

import { Product, CartItem, FilterState, UpsellItem } from './types';
import { PRODUCTS, BRANDS_DATA } from './data';
import { ShoppingBag, ChevronRight, Calculator, Star, SlidersHorizontal, Check, Compass, MessageCircle, Shield, Truck, Award, Users, CheckCircle, Wind, Layers, ArrowRight, Zap, Filter, RotateCcw } from 'lucide-react';

import gildeneSalesHero from './assets/images/gouveclima-showroom.jpg';
import gildeneSalesOnline from './assets/images/gouveclima-atendimento.jpg';

type AppView = 'home' | 'catalog' | 'detail' | 'brand-seo' | 'buying-guide' | 'btu-calc' | 'checkout' | 'contact' | 'admin';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');

  // Dynamic Catalog State persisted in localStorage
  const [productsList, setProductsList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('gildene_custom_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map((p: Product) => {
          const current = PRODUCTS.find(item => item.id === p.id);
          return current ? {...p, image: current.image, gallery: current.gallery} : p;
        });
      } catch (e) {
        console.error('Error parsing stored products:', e);
      }
    }
    return PRODUCTS;
  });

  // Dynamic Site Settings persisted in localStorage
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('gildene_site_settings');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        for (const key of ['heroHighlightText', 'topBarText']) {
          if (typeof settings[key] === 'string') settings[key] = settings[key]
            .replaceAll('Gildene Soluções em Climatização', 'GouveClima — Soluções em Climatização')
            .replaceAll('Gildene Clima', 'GouveClima');
        }
        return settings;
      } catch (e) {
        console.error('Error parsing stored site settings:', e);
      }
    }
    return {
      heroTitle: 'Soluções completas em climatização',
      heroHighlightText: 'GouveClima — Soluções em Climatização',
      heroSubtitle: 'Conforto térmico ideal para sua casa, empresa ou projeto.',
      whatsappNumber: '(61) 98110-8374',
      whatsappLink: 'https://wa.me/message/MIJAF4C4WX2EN1',
      topBarText: 'Atendimento especializado GouveClima',
      topBarHours: 'Segunda a sexta, das 08h às 18h',
      storeAddress: 'Brasília - DF / Entregas para Todo o Brasil',
    };
  });

  const handleSaveProducts = (newProducts: Product[]) => {
    setProductsList(newProducts);
    localStorage.setItem('gildene_custom_products', JSON.stringify(newProducts));
  };

  const handleSaveSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    localStorage.setItem('gildene_site_settings', JSON.stringify(newSettings));
  };

  // Favorites (Wishlist) state
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('gildene_favorites');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Compare Models state
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const handleToggleFavorite = (product: Product) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(product.id);
      const updated = exists ? prev.filter((id) => id !== product.id) : [...prev, product.id];
      localStorage.setItem('gildene_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleCompare = (product: Product) => {
    setComparedProductIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 4) {
        alert('Você pode comparar até 4 modelos por vez.');
        return prev;
      }
      return [...prev, product.id];
    });
  };

  const favoriteProducts = useMemo(() => {
    return productsList.filter((p) => favoriteIds.includes(p.id));
  }, [productsList, favoriteIds]);

  const comparedProducts = useMemo(() => {
    return productsList.filter((p) => comparedProductIds.includes(p.id));
  }, [productsList, comparedProductIds]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(productsList[0] || PRODUCTS[0]);
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string>('midea');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'priceAsc' | 'priceDesc'>('relevance');

  // Interactive consultancy modal/state
  const [showConsultantModal, setShowConsultantModal] = useState(false);
  const [consultantName, setConsultantName] = useState('');
  const [consultantPhone, setConsultantPhone] = useState('');
  const [consultantSubmitted, setConsultantSubmitted] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    capacities: [],
    brands: [],
    technologies: [],
    cycles: [],
    category: '',
  });

  // Unique list of brands available from products list
  const availableBrands = useMemo(() => {
    const brandsSet = new Set(productsList.map((p) => p.brand));
    return Array.from(brandsSet);
  }, [productsList]);

  // Handle header tab navigation
  const handleTabChange = (tabId: string) => {
    setSearchQuery('');
    
    if (tabId === 'inicio') {
      setCurrentView('home');
      setFilters({ capacities: [], brands: [], technologies: [], cycles: [], category: '' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'ar-condicionado' || tabId === 'catalogo') {
      setCurrentView('catalog');
      setFilters({ capacities: [], brands: [], technologies: [], cycles: [], category: '' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'marcas') {
      setCurrentView('home');
      setTimeout(() => {
        document.getElementById('marcas-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    } else if (tabId === 'calculadora') {
      setCurrentView('btu-calc');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'guia-compra') {
      setCurrentView('buying-guide');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'promocoes') {
      setCurrentView('home');
      setTimeout(() => {
        document.getElementById('promocoes-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    } else if (tabId === 'quem-somos') {
      setCurrentView('home');
      setTimeout(() => {
        document.getElementById('quem-somos-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    } else if (tabId === 'contato') {
      window.open(siteSettings.whatsappLink, '_blank', 'noopener,noreferrer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'admin') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Open brand page
  const handleOpenBrandPage = (brandSlug: string) => {
    setSelectedBrandSlug(brandSlug.toLowerCase());
    setCurrentView('brand-seo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate recommendation and apply filter in catalog
  const handleBtuRecommend = (recommendedBtu: number) => {
    setCurrentView('catalog');
    setFilters({
      capacities: [recommendedBtu],
      brands: [],
      technologies: [],
      cycles: [],
      category: '',
    });
    setTimeout(() => {
      document.getElementById('catalog-header')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      // Search Query (Modelo, Marca, BTU, Tecnologia, Categoria, SKU)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTech = product.technology.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesBtu = product.capacityBTU.toString().includes(query);
        const matchesSku = product.sku ? product.sku.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesTech && !matchesCat && !matchesBtu && !matchesSku) return false;
      }

      // Capacity filter (BTUs)
      if (filters.capacities.length > 0) {
        if (!filters.capacities.includes(product.capacityBTU)) return false;
      }

      // Brand filter
      if (filters.brands.length > 0) {
        if (!filters.brands.includes(product.brand.toLowerCase())) return false;
      }

      // Technology filter
      if (filters.technologies.length > 0) {
        if (!filters.technologies.includes(product.technology)) return false;
      }

      // Cycle filter
      if (filters.cycles && filters.cycles.length > 0) {
        if (product.cycle && !filters.cycles.includes(product.cycle)) return false;
      }

      // Category filter
      if (filters.category) {
        if (filters.category === 'Comercial') {
          if (!['Cassete', 'Piso Teto', 'VRF', 'Multi Split'].includes(product.category)) return false;
        } else if (filters.category === 'Residencial') {
          if (!['Split Hi Wall', 'Multi Split', 'Split', 'Janela', 'Portátil'].includes(product.category)) return false;
        } else {
          if (product.category !== filters.category && !product.category.includes(filters.category)) return false;
        }
      }

      // Wi-Fi filter
      if (filters.hasWifi !== undefined) {
        if (product.hasWifi !== filters.hasWifi) return false;
      }

      // Price filter
      if (filters.minPrice !== undefined && product.price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false;

      // Energy rating filter
      if (filters.energyRating && product.procelBadge && !product.procelBadge.toLowerCase().includes(filters.energyRating.toLowerCase())) return false;

      // Recommended Area filter
      if (filters.areaRange && product.recommendedArea && product.recommendedArea !== filters.areaRange) return false;

      return true;
    });
  }, [filters, searchQuery, productsList]);

  // Sort Logic
  const sortedProducts = useMemo(() => {
    const productsCopy = [...filteredProducts];
    if (sortBy === 'priceAsc') {
      return productsCopy.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'priceDesc') {
      return productsCopy.sort((a, b) => b.price - a.price);
    }
    return productsCopy;
  }, [filteredProducts, sortBy]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    quantity: number,
    voltage: '220V' | '110V',
    selectedUpsells: UpsellItem[]
  ) => {
    const upsellsHash = selectedUpsells
      .map((up) => up.id)
      .sort()
      .join('-');
    const cartItemId = `${product.id}-${voltage}-${upsellsHash}`;

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            product,
            quantity,
            voltage,
            selectedUpsells,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handleOpenProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultantRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (consultantName.trim() && consultantPhone.trim()) {
      setConsultantSubmitted(true);
      setTimeout(() => {
        setConsultantSubmitted(false);
        setShowConsultantModal(false);
        setConsultantName('');
        setConsultantPhone('');
        alert('Consultor agendado! Entraremos em contato via WhatsApp nas próximas horas.');
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col font-sans antialiased" id="app-root">
      
      {/* Dynamic SEO Head Integration */}
      <SeoHead
        view={currentView}
        brandSlug={selectedBrandSlug}
        productName={selectedProduct?.name}
      />

      {/* Header element */}
      <Header
        currentTab={
          currentView === 'home'
            ? 'inicio'
            : currentView === 'catalog'
            ? 'ar-condicionado'
            : currentView === 'btu-calc'
            ? 'calculadora'
            : currentView === 'buying-guide'
            ? 'guia-compra'
            : currentView === 'contact'
            ? 'contato'
            : ''
        }
        onTabChange={handleTabChange}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        checkoutMode={currentView === 'checkout'}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (currentView !== 'catalog') setCurrentView('catalog');
        }}
        onOpenSeoModal={() => setIsSeoModalOpen(true)}
        favoritesCount={favoriteIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <div className="space-y-16 pb-20 animate-fade-in" id="home-view">
            
            {/* 1. HERO BANNER SECTION (Full Background Image with Gildene Consultant) */}
            <section className="relative overflow-hidden bg-slate-100 min-h-[480px] sm:min-h-[540px] flex items-center border-b border-slate-200">
              
              {/* Full Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={gildeneSalesHero}
                  alt="Vendedora Gildene em atendimento com cliente"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-right sm:object-center"
                />
                {/* Gradient overlay for text readability (left to right) */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 sm:via-white/80 to-transparent z-10" />
              </div>

              {/* Content Container */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-10 sm:py-16 w-full">
                <div className="max-w-xl lg:max-w-2xl space-y-6">
                  
                  {/* Main Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                    <span className="block text-sky-600">GouveClima</span>
                    <span className="block text-2xl sm:text-3xl mt-3">Soluções completas em Climatização</span>
                  </h1>
                  
                  {/* Subtitle */}
                  <p className="text-slate-700 text-base sm:text-xl font-medium leading-relaxed max-w-lg">
                    {siteSettings.heroSubtitle}
                  </p>

                  {/* Dual Action Buttons matching reference screenshot */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                    
                    {/* Blue Button: COMPRAR AGORA */}
                    <button
                      onClick={() => {
                        setCurrentView('catalog');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white p-3.5 sm:p-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer flex items-center justify-between gap-3 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                          <ShoppingBag className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider block leading-none">Comprar Agora</span>
                          <span className="text-[11px] font-medium text-blue-100 mt-1 block leading-none">Veja todas as opções</span>
                        </div>
                      </div>
                    </button>

                    {/* Green Button: SOLICITAR ORÇAMENTO */}
                    <a
                      href="https://wa.me/message/MIJAF4C4WX2EN1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white p-3.5 sm:p-4 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-between gap-3 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider block leading-none">Solicitar Orçamento</span>
                          <span className="text-[11px] font-medium text-emerald-100 mt-1 block leading-none">Atendimento via WhatsApp</span>
                          <span className="text-[10px] font-bold text-white mt-0.5 block leading-none">(61) 98110-8374</span>
                        </div>
                      </div>
                    </a>

                  </div>

                  {/* Trust Highlights Row */}
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 font-bold border-t border-slate-200/80 max-w-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-tight">Atendimento especializado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                        <Wind className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-tight">Soluções para todos os ambientes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-tight">Melhores marcas do mercado</span>
                    </div>
                  </div>

                </div>
              </div>

            </section>

            {/* 2. CATEGORIAS DE PRODUTO SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="categorias-section">
              <div className="text-center space-y-2">
                <span className="text-xs font-black text-sky-600 uppercase tracking-widest block">Linhas de Climatização</span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Categorias Principais</h2>
                <p className="text-slate-500 text-sm max-w-md mx-auto font-medium">Encontre a solução exata para residências, escritórios ou grandes empreendimentos.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
                {[
                  { name: 'Split Hi Wall', desc: 'Residencial', icon: '❄️' },
                  { name: 'Cassete', desc: '4 Vias Embutir', icon: '🏢' },
                  { name: 'Piso Teto', desc: 'Alta Potência', icon: '⚡' },
                  { name: 'VRF', desc: 'Fluxo Refrigerante', icon: '🏭' },
                  { name: 'Multi Split', desc: 'Multi Ambientes', icon: '🏠' },
                  { name: 'Comercial', desc: 'Lojas e Escritórios', icon: '🏬' },
                  { name: 'Residencial', desc: 'Quartos e Salas', icon: '🛋️' },
                ].map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setCurrentView('catalog');
                      setFilters({ capacities: [], brands: [], technologies: [], cycles: [], category: cat.name });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white border border-slate-200/80 hover:border-sky-400 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all text-center group cursor-pointer space-y-2 flex flex-col items-center justify-between"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform block">{cat.icon}</span>
                    <div className="space-y-0.5">
                      <span className="text-xs font-black text-slate-800 block group-hover:text-sky-600 leading-tight">
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        {cat.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* 3. MARCAS OFICIAIS SECTION */}
            <section className="bg-slate-100/60 border-y border-slate-200/60 py-16" id="marcas-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center space-y-2">
                  <span className="text-xs font-black text-sky-600 uppercase tracking-widest block">Marcas Líderes Globais</span>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Páginas Oficiais por Fabricante</h2>
                  <p className="text-slate-500 text-sm max-w-lg mx-auto font-medium">
                    Acesse as páginas SEO dedicadas para cada marca, com fichas técnicas, prazos de garantia e catálogos completos.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
                  {Object.values(BRANDS_DATA).map((brand) => (
                    <div
                      key={brand.id}
                      onClick={() => handleOpenBrandPage(brand.id)}
                      className="bg-white border border-slate-200 hover:border-sky-500 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all text-center cursor-pointer group hover:-translate-y-1 space-y-1.5"
                    >
                      <span className="text-xs font-black text-slate-800 group-hover:text-sky-600 block line-clamp-1">
                        {brand.name}
                      </span>
                      <span className="text-[9px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md inline-block uppercase tracking-wider">
                        Ver Modelos
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. PRODUTOS EM DESTAQUE SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="destaque-section">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-black text-sky-600 uppercase tracking-widest block">Seleção Especial</span>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Aparelhos em Destaque</h2>
                </div>
                <button
                  onClick={() => handleTabChange('ar-condicionado')}
                  className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2 uppercase tracking-wider"
                >
                  Ver Todos ({PRODUCTS.length})
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {productsList.slice(0, 8).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={handleOpenProductDetail}
                    isFavorite={favoriteIds.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    isCompared={comparedProductIds.includes(product.id)}
                    onToggleCompare={handleToggleCompare}
                  />
                ))}
              </div>
            </section>

            {/* 5. CALCULADORA DE BTUS INTERATIVA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <BtuCalculator onRecommend={handleBtuRecommend} />
            </section>

            {/* 6. VANTAGENS SECTION */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden" id="vantagens-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
                <div className="text-center space-y-2 max-w-2xl mx-auto">
                  <span className="text-xs font-black text-sky-400 uppercase tracking-widest block">Diferenciais GouveClima</span>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Por que comprar conosco?</h2>
                  <p className="text-slate-400 text-sm font-medium">Oferecemos atendimento integral do projeto à entrega garantida do equipamento.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Atendimento Especializado em Brasília',
                      desc: 'Suporte consultivo para dimensionar a carga térmica exata para o seu ambiente no DF e Entorno.'
                    },
                    {
                      title: 'Equipamentos 100% Originais',
                      desc: 'Fotos e especificações oficiais de fábrica, com NF-e e garantia direta dos fabricantes.'
                    },
                    {
                      title: 'Condições Especiais no WhatsApp',
                      desc: 'Preços comerciais sob consulta com negociação rápida e atenciosa via canal oficial.'
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl space-y-3 hover:border-sky-500/50 transition-all"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-lg">
                        ✔️
                      </div>
                      <h3 className="font-extrabold text-white text-base leading-snug">{item.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. SEÇÃO ATENDIMENTO 100% ONLINE */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="atendimento-section">
              <div className="bg-gradient-to-br from-slate-900 to-sky-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xl">
                
                <div className="md:col-span-5 relative flex items-center justify-center">
                  <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border-2 border-sky-400/30 shadow-2xl group">
                    <img
                      src={gildeneSalesOnline}
                      alt="Vendedora Gildene atendendo via fone e WhatsApp"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
                      <span className="text-xs font-black text-sky-400 block uppercase tracking-wider">Atendimento 100% Online</span>
                      <span className="text-[10px] text-slate-300 font-medium">Equipe técnica pronta para lhe atender</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">Suporte Direto</span>
                    <h2 className="text-3xl font-black tracking-tight text-white">Atendimento 100% online com especialistas em climatização</h2>
                    <p className="text-slate-300 text-sm font-medium leading-relaxed">
                      Tire suas dúvidas e receba orientações para escolher o modelo ideal para você. Entrega para todo o Brasil.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                      <span className="text-slate-400 font-semibold block">WhatsApp Vendas & Suporte</span>
                      <a
                        href="https://wa.me/message/MIJAF4C4WX2EN1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline font-black text-sm flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-4 h-4" /> (61) 98110-8374
                      </a>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                      <span className="text-slate-400 font-semibold block">Instagram Oficial</span>
                      <a
                        href="https://instagram.com/gildeneclimatizacao"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-400 hover:underline font-black text-sm"
                      >
                        @gildeneclimatizacao
                      </a>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                      <span className="text-slate-400 font-semibold block">E-mail Comercial</span>
                      <a href="mailto:gouveiafrio@gmail.com" className="text-sky-300 hover:underline font-black text-xs">
                        gouveiafrio@gmail.com
                      </a>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                      <span className="text-slate-400 font-semibold block">Entrega Nacional</span>
                      <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" /> Entrega para todo o Brasil
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href="https://wa.me/message/MIJAF4C4WX2EN1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition-all uppercase tracking-wider"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Falar com Consultor Agora
                    </a>
                  </div>
                </div>

              </div>
            </section>

            {/* 8. QUEM SOMOS */}
            <section className="bg-white border-y border-slate-100 py-16" id="quem-somos-section">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center text-xl font-bold mx-auto">
                  G
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Quem Somos</h2>
                <p className="text-slate-600 text-sm leading-relaxed max-w-3xl mx-auto font-medium">
                  A <strong>GouveClima — Soluções em Climatização</strong> é revendedora e representante autorizada das marcas mais respeitadas no mercado global de ar-condicionado. Atendemos clientes residenciais, comerciais e corporativos em Brasília e todo o Entorno com foco em tecnologia Inverter, Selo Procel A e economia energética superior.
                </p>
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: PRODUCTS CATALOGUE LIST WITH BANNER & FILTERS */}
        {currentView === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in" id="catalog-view">
            
            {/* Catalog Main Banner (Consultant Customer Service Reference) */}
            <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 shadow-xl overflow-hidden relative">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
                
                <div className="md:col-span-8 space-y-4">
                  <div className="inline-block px-3 py-1 bg-sky-500/20 border border-sky-400/30 rounded-lg text-sky-300 text-xs font-bold uppercase tracking-wider">
                    Catálogo Oficial GouveClima
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                    Encontre o ar-condicionado ideal para seu ambiente
                  </h1>
                  
                  <p className="text-slate-300 text-sm sm:text-base font-medium">
                    Mais de 200 modelos das principais marcas com consultoria especializada.
                  </p>

                  {/* Buttons: Ambos exatamente do mesmo tamanho */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    <button
                      onClick={() => {
                        setFilters({ capacities: [], brands: [], technologies: [], cycles: [], category: '' });
                      }}
                      className="sm:w-60 h-12 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      Comprar Agora
                    </button>
                    
                    <a
                      href="https://wa.me/message/MIJAF4C4WX2EN1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:w-60 h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Solicitar Orçamento
                    </a>
                  </div>
                </div>

                <div className="md:col-span-4 hidden md:flex justify-end">
                  <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-sky-400/30 shadow-2xl group">
                    <img
                      src={gildeneSalesHero}
                      alt="Vendedora Gildene com uniforme e cliente no showroom"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-center bg-slate-900/80 backdrop-blur-sm p-1.5 rounded-lg border border-white/10">
                      <span className="text-[10px] font-black text-sky-300 uppercase tracking-wider block">Atendimento GouveClima</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Horizontal Filter Controls Bar */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-sky-600" />
                  Filtros Rápidos do Catálogo
                </span>
                {(filters.capacities.length > 0 || filters.brands.length > 0 || filters.technologies.length > 0 || filters.cycles.length > 0 || filters.category) && (
                  <button
                    onClick={() => setFilters({ capacities: [], brands: [], technologies: [], cycles: [], category: '' })}
                    className="text-[11px] font-bold text-sky-600 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Limpar filtros
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {/* Marca Dropdown */}
                <select
                  value={filters.brands[0] || ''}
                  onChange={(e) => setFilters({ ...filters, brands: e.target.value ? [e.target.value.toLowerCase()] : [] })}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="">Marca: Todas</option>
                  {Object.values(BRANDS_DATA).map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>

                {/* BTU Dropdown */}
                <select
                  value={filters.capacities[0] || ''}
                  onChange={(e) => setFilters({ ...filters, capacities: e.target.value ? [parseInt(e.target.value)] : [] })}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="">BTUs: Todos</option>
                  <option value="9000">9.000 BTUs</option>
                  <option value="12000">12.000 BTUs</option>
                  <option value="18000">18.000 BTUs</option>
                  <option value="24000">24.000 BTUs</option>
                  <option value="30000">30.000 BTUs</option>
                  <option value="36000">36.000 BTUs</option>
                </select>

                {/* Tecnologia Dropdown */}
                <select
                  value={filters.technologies[0] || ''}
                  onChange={(e) => setFilters({ ...filters, technologies: e.target.value ? [e.target.value] : [] })}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="">Tecnologia: Todas</option>
                  <option value="Inverter">Inverter</option>
                  <option value="Dual Inverter">Dual Inverter</option>
                  <option value="Convencional">Convencional</option>
                </select>

                {/* Ciclo Dropdown */}
                <select
                  value={filters.cycles[0] || ''}
                  onChange={(e) => setFilters({ ...filters, cycles: e.target.value ? [e.target.value] : [] })}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="">Ciclo: Todos</option>
                  <option value="Frio">Frio</option>
                  <option value="Quente e Frio">Quente e Frio</option>
                </select>

                {/* Categoria Dropdown */}
                <select
                  value={filters.category || ''}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="">Categoria: Todas</option>
                  <option value="Split Hi Wall">Split Hi Wall</option>
                  <option value="Cassete">Cassete</option>
                  <option value="Piso Teto">Piso Teto</option>
                  <option value="VRF">VRF</option>
                  <option value="Multi Split">Multi Split</option>
                </select>

                {/* Ordenação Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-sky-50 border border-sky-200 rounded-xl text-xs font-bold text-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="relevance">Ordenar: Relevância</option>
                  <option value="priceAsc">Menor Preço</option>
                  <option value="priceDesc">Maior Preço</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Filter Sidebar */}
              <div className="lg:col-span-3 lg:sticky lg:top-24">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={setFilters}
                  availableBrands={availableBrands}
                />
              </div>

              {/* Right Column: Products Grid */}
              <div className="lg:col-span-9 space-y-8">
                
                {sortedProducts.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto">
                      <SlidersHorizontal className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 max-w-sm mx-auto">
                      <h3 className="font-bold text-slate-800 text-base">Nenhum aparelho encontrado</h3>
                      <p className="text-xs text-slate-400">
                        Não encontramos modelos com a combinação de filtros selecionada. Experimente limpar alguns filtros.
                      </p>
                    </div>
                    <button
                      onClick={() => setFilters({ capacities: [], brands: [], technologies: [], cycles: [], category: '' })}
                      className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={handleOpenProductDetail}
                        isFavorite={favoriteIds.includes(product.id)}
                        onToggleFavorite={handleToggleFavorite}
                        isCompared={comparedProductIds.includes(product.id)}
                        onToggleCompare={handleToggleCompare}
                      />
                    ))}
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* VIEW 3: BRAND SEO DEDICATED PAGE */}
        {currentView === 'brand-seo' && (
          <BrandSEOPage
            brandSlug={selectedBrandSlug}
            onOpenProductDetail={handleOpenProductDetail}
            onBackToCatalog={() => setCurrentView('catalog')}
          />
        )}

        {/* VIEW 4: BUYING GUIDE */}
        {currentView === 'buying-guide' && (
          <BuyingGuide
            onOpenCatalogWithFilter={(filterCategory) => {
              setCurrentView('catalog');
              setFilters({ capacities: [], brands: [], technologies: [], cycles: [], category: filterCategory });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 5: DEDICATED BTU CALCULATOR PAGE */}
        {currentView === 'btu-calc' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-black text-sky-600 uppercase tracking-widest block">Dimensionamento Térmico</span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Calculadora de BTUs Inteligente</h1>
              <p className="text-slate-500 text-sm font-medium">
                Informe os dados do ambiente para estimar a capacidade em BTUs e consulte o guia de áreas da GouveClima.
              </p>
            </div>

            <BtuCalculator onRecommend={handleBtuRecommend} />
          </div>
        )}

        {/* VIEW 6: PRODUCT DETAIL VIEW */}
        {currentView === 'detail' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            allProducts={productsList}
            onBack={() => setCurrentView('catalog')}
            onAddToCart={handleAddToCart}
            onOpenProductDetail={handleOpenProductDetail}
            onBuyNow={(prod, qty, volt, ups) => {
              handleAddToCart(prod, qty, volt, ups);
              setIsCartOpen(true);
            }}
          />
        )}

        {/* VIEW 7: SECURE CHECKOUT VIEW */}
        {currentView === 'checkout' && (
          <CheckoutView
            cart={cart}
            onBackToShopping={() => {
              setCurrentView('catalog');
              setFilters({ capacities: [], brands: [], technologies: [], cycles: [], category: '' });
            }}
            onClearCart={() => setCart([])}
          />
        )}

      </main>

      {/* Footer component */}
      <Footer
        onTabChange={handleTabChange}
        onOpenBrand={handleOpenBrandPage}
        onOpenSeoModal={() => setIsSeoModalOpen(true)}
      />

      {/* Shopping Cart Drawer Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentView('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Sitemap and Robots.txt Technical SEO Modal */}
      <SitemapRobotsModal
        isOpen={isSeoModalOpen}
        onClose={() => setIsSeoModalOpen(false)}
      />

      {/* Consultant Schedule Modal */}
      {showConsultantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="consultant-modal">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setShowConsultantModal(false)} />
          
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 max-w-md w-full relative z-10 shadow-2xl space-y-6 animate-scale">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Falar com Consultor Especializado</h3>
              <p className="text-xs text-slate-500 leading-normal max-w-xs mx-auto font-medium">
                Insira seu contato abaixo. Um consultor de GouveClima entrará em contato via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleConsultantRequest} className="space-y-4">
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase block mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  value={consultantName}
                  onChange={(e) => setConsultantName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800 text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase block mb-1">Celular / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="(61) 98110-8374"
                  value={consultantPhone}
                  onChange={(e) => setConsultantPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800 text-xs font-mono font-medium"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConsultantModal(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold rounded-xl transition-all shadow-md uppercase tracking-wider"
                >
                  Solicitar Contato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Compare Action Bar */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 text-white px-4 sm:px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700/80 flex items-center gap-3 sm:gap-6 animate-slide-up max-w-xl w-[92%] sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-bold whitespace-nowrap">
              Comparando <strong className="text-sky-400">{comparedProducts.length}</strong> de 4
            </span>
          </div>

          <div className="hidden sm:flex items-center -space-x-2">
            {comparedProducts.map((prod) => (
              <div key={prod.id} className="w-8 h-8 rounded-lg bg-white p-1 border border-slate-300 shadow-xs" title={prod.name}>
                <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              Comparar Agora
            </button>
            <button
              onClick={() => setComparedProductIds([])}
              className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors text-xs font-bold cursor-pointer"
              title="Limpar comparação"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Product Comparison Modal */}
      <ProductCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        comparedProducts={comparedProducts}
        onRemoveFromCompare={(id) => setComparedProductIds((prev) => prev.filter((item) => item !== id))}
        onClearAll={() => setComparedProductIds([])}
        onAddToCart={(p) => handleAddToCart(p, 1, '220V', [])}
        onOpenDetail={handleOpenProductDetail}
      />

      {/* Wishlist Favorites Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        favorites={favoriteProducts}
        onRemoveFavorite={(id) => {
          setFavoriteIds((prev) => {
            const updated = prev.filter((item) => item !== id);
            localStorage.setItem('gildene_favorites', JSON.stringify(updated));
            return updated;
          });
        }}
        onAddToCart={(p) => handleAddToCart(p, 1, '220V', [])}
        onOpenDetail={handleOpenProductDetail}
      />

    </div>
  );
}

import React from 'react';
import { ShieldCheck, Lock, CheckCircle, Globe, Instagram, Facebook, Youtube, Linkedin, MessageCircle, Mail, Clock, Truck } from 'lucide-react';

interface FooterProps {
  onTabChange?: (tabId: string) => void;
  onOpenBrand?: (brandId: string) => void;
  onOpenSeoModal?: () => void;
}

export default function Footer({ onTabChange, onOpenBrand, onOpenSeoModal }: FooterProps) {
  const marcasList = [
    { name: 'Midea', id: 'midea' },
    { name: 'Springer Carrier', id: 'springer-carrier' },
    { name: 'Carrier', id: 'carrier' },
    { name: 'LG', id: 'lg' },
    { name: 'Samsung', id: 'samsung' },
    { name: 'Daikin', id: 'daikin' },
    { name: 'Fujitsu', id: 'fujitsu' },
    { name: 'Gree', id: 'gree' },
    { name: 'Elgin', id: 'elgin' },
    { name: 'Hisense', id: 'hisense' },
    { name: 'TCL', id: 'tcl' },
    { name: 'Agratto', id: 'agratto' },
    { name: 'Philco', id: 'philco' },
    { name: 'Electrolux', id: 'electrolux' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800" id="main-footer">
      
      {/* Top Banner with Trust Highlights */}
      <div className="border-b border-slate-800 bg-slate-900/80 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-4 text-center sm:text-left text-xs font-semibold text-slate-300">
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <strong className="block text-white">Produtos 100% originais</strong>
              <span className="text-[10px] text-slate-400 font-normal">Garantia de fábrica</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <CheckCircle className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <strong className="block text-white">Melhores marcas</strong>
              <span className="text-[10px] text-slate-400 font-normal">As melhores do mercado</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <Truck className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <strong className="block text-white">Entrega para todo o Brasil</strong>
              <span className="text-[10px] text-slate-400 font-normal">Com segurança e agilidade</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <Lock className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <strong className="block text-white">Parcele em até 12x</strong>
              <span className="text-[10px] text-slate-400 font-normal">No cartão de crédito</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 col-span-2 md:col-span-1">
            <Clock className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <strong className="block text-white">Atendimento especializado</strong>
              <span className="text-[10px] text-slate-400 font-normal">Tire suas dúvidas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
          
          {/* Col 1: Institucional */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] border-b border-slate-800 pb-2">
              Institucional
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <button onClick={() => onTabChange && onTabChange('quem-somos')} className="hover:text-sky-400 transition-colors">
                  Quem Somos
                </button>
              </li>
              <li><span className="hover:text-sky-400 transition-colors cursor-pointer">Política Comercial</span></li>
              <li><span className="hover:text-sky-400 transition-colors cursor-pointer">Política de Entrega</span></li>
              <li><span className="hover:text-sky-400 transition-colors cursor-pointer">Política de Trocas e Devoluções</span></li>
              <li><span className="hover:text-sky-400 transition-colors cursor-pointer">Política de Privacidade</span></li>
              <li><span className="hover:text-sky-400 transition-colors cursor-pointer">Termos de Uso</span></li>
            </ul>
          </div>

          {/* Col 2: Categorias */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] border-b border-slate-800 pb-2">
              Categorias
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <button onClick={() => onTabChange && onTabChange('catalogo')} className="hover:text-sky-400 transition-colors">
                  Split Hi Wall
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange && onTabChange('catalogo')} className="hover:text-sky-400 transition-colors">
                  Inverter
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange && onTabChange('catalogo')} className="hover:text-sky-400 transition-colors">
                  Multi Split
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange && onTabChange('catalogo')} className="hover:text-sky-400 transition-colors">
                  Piso-Teto
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange && onTabChange('catalogo')} className="hover:text-sky-400 transition-colors">
                  Cassete
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange && onTabChange('catalogo')} className="hover:text-sky-400 transition-colors">
                  VRF
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Marcas */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] border-b border-slate-800 pb-2">
              Marcas
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-slate-400 font-medium">
              {marcasList.map((m) => (
                <button
                  key={m.id}
                  onClick={() => onOpenBrand && onOpenBrand(m.id)}
                  className="text-left hover:text-sky-400 transition-colors line-clamp-1"
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Atendimento */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] border-b border-slate-800 pb-2">
              Atendimento
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>De segunda a sexta, das 08h às 18h</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/message/MIJAF4C4WX2EN1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-400 font-bold"
                >
                  (61) 98110-8374
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href="mailto:contato@gildeneclima.com.br" className="hover:text-sky-400">
                  contato@gildeneclima.com.br
                </a>
              </li>
              <li className="pt-1">
                <span className="inline-block bg-sky-950 text-sky-400 border border-sky-800/80 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                  🎧 Atendimento 100% online
                </span>
              </li>
              <li>
                <span className="text-[11px] text-slate-400">🚚 Entrega para todo o Brasil</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Siga-nos & Site Seguro */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] border-b border-slate-800 pb-2">
              Siga-nos
            </h4>
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com/gildenesolucoesclima"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-sky-400 text-pink-400 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-sky-400 text-blue-400 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-sky-400 text-red-400 flex items-center justify-center transition-all hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-sky-400 text-sky-400 flex items-center justify-center transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-400">
                <Lock className="w-4 h-4" />
                <strong className="text-white text-xs font-bold">Site 100% Seguro</strong>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                Sua navegação e dados sempre protegidos com criptografia SSL de 256 bits.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Section: Formas de Pagamento e Selos de Segurança */}
        <div className="border-t border-slate-800/80 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Formas de Pagamento */}
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
              Formas de Pagamento
            </span>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="bg-white/10 px-2.5 py-1 rounded text-[11px] font-black text-white border border-white/10">VISA</span>
              <span className="bg-white/10 px-2.5 py-1 rounded text-[11px] font-black text-white border border-white/10">Mastercard</span>
              <span className="bg-white/10 px-2.5 py-1 rounded text-[11px] font-black text-white border border-white/10">Elo</span>
              <span className="bg-white/10 px-2.5 py-1 rounded text-[11px] font-black text-white border border-white/10">Hipercard</span>
              <span className="bg-white/10 px-2.5 py-1 rounded text-[11px] font-black text-white border border-white/10">Amex</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded text-[11px] font-black">PIX (Com Desconto)</span>
              <span className="bg-white/10 px-2.5 py-1 rounded text-[11px] font-black text-white border border-white/10">Boleto</span>
            </div>
          </div>

          {/* Selos de Segurança */}
          <div className="space-y-2 md:text-right">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
              Segurança
            </span>
            <div className="flex flex-wrap gap-2 items-center md:justify-end">
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1">
                <Lock className="w-3 h-3" /> SSL CERTIFICADO
              </span>
              <span className="bg-sky-950 text-sky-400 border border-sky-800 px-3 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> SITE SEGURO GOOGLE
              </span>
              <span className="bg-slate-900 text-slate-300 border border-slate-700 px-3 py-1 rounded-lg text-[10px] font-extrabold">
                100% PRODUTOS ORIGINAIS
              </span>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-medium">
          <p>© 2026 GouveClima — Soluções em Climatização. Todos os direitos reservados. CNPJ / DF.</p>
          
        </div>

      </div>
    </footer>
  );
}


import React, { useState } from 'react';
import { FileText, Download, Check, X, Globe, Search, ShieldCheck } from 'lucide-react';
import { PRODUCTS, BRANDS_DATA } from '../data';

interface SitemapRobotsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapRobotsModal: React.FC<SitemapRobotsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'schema'>('sitemap');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate dynamic sitemap.xml
  const baseUrl = 'https://gildeneclima.com.br';
  const today = new Date().toISOString().split('T')[0];

  const brandUrls = Object.keys(BRANDS_DATA).map(
    (brandKey) => `  <url>
    <loc>${baseUrl}/marca/${brandKey}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  );

  const productUrls = PRODUCTS.map(
    (p) => `  <url>
    <loc>${baseUrl}/produto/${p.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
  );

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/calculadora-btus</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/guia-de-compra</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
${brandUrls.join('\n')}
${productUrls.join('\n')}
</urlset>`;

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /checkout
Disallow: /admin

Sitemap: ${baseUrl}/sitemap.xml`;

  const schemaJson = `{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "name": "Gildene Clima",
  "description": "Loja especializada em ar condicionado Inverter, Split, Cassete e VRF.",
  "url": "${baseUrl}",
  "telephone": "+55-61-99999-9999",
  "priceRange": "$$$",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Ar Condicionado Inverter e Climatização",
    "itemListElement": ${JSON.stringify(
      PRODUCTS.map((p, idx) => ({
        '@type': 'OfferCatalog',
        'name': p.name,
        'position': idx + 1,
      })),
      null,
      2
    )}
  }
}`;

  const currentContent = activeTab === 'sitemap' ? sitemapXml : activeTab === 'robots' ? robotsTxt : schemaJson;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeTab === 'sitemap' ? 'sitemap.xml' : activeTab === 'robots' ? 'robots.txt' : 'schema.json';
    const blob = new Blob([currentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-100 flex flex-col overflow-hidden max-h-[85vh]">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Indexação & SEO Index (Gildene Clima v2.0)</h3>
              <p className="text-xs text-slate-400">Arquivos válidos de sitemap.xml, robots.txt e Schema.org JSON-LD</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
              activeTab === 'sitemap'
                ? 'bg-white text-sky-600 border-t-2 border-sky-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            sitemap.xml ({PRODUCTS.length + Object.keys(BRANDS_DATA).length + 3} URLs)
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
              activeTab === 'robots'
                ? 'bg-white text-sky-600 border-t-2 border-sky-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            robots.txt
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
              activeTab === 'schema'
                ? 'bg-white text-sky-600 border-t-2 border-sky-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Schema.org JSON-LD
          </button>
        </div>

        {/* Content viewer */}
        <div className="p-6 flex-1 overflow-y-auto bg-slate-950 font-mono text-xs text-emerald-400 leading-relaxed">
          <pre className="whitespace-pre-wrap break-all">{currentContent}</pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium">
            Sitemap atualizado em tempo real com {PRODUCTS.length} produtos oficiais.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <FileText className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Copiar Conteúdo'}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Baixar Arquivo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapRobotsModal;

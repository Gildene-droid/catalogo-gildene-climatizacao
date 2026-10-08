import { Product, ProductCategory } from './types';
import electroluxImg from './assets/images/electrolux_color_split_1783633440245.jpg';
import greeImg from './assets/images/gree_classic_split_1783633405785.jpg';
import agrattoImg from './assets/images/agratto_zen_split_1783633429633.jpg';
import mideaImg from './assets/images/midea_airvolution_split_1783633417497.jpg';

// Helper to determine recommended area based on BTU
function getRecommendedArea(btu: number): string {
  if (btu <= 9000) return 'Até 15 m²';
  if (btu <= 12000) return 'Até 20 m²';
  if (btu <= 18000) return 'Até 30 m²';
  if (btu <= 24000) return 'Até 40 m²';
  if (btu <= 30000) return 'Até 50 m²';
  if (btu <= 36000) return 'Até 60 m²';
  if (btu <= 48000) return 'Até 80 m²';
  return 'Acima de 80 m²';
}

// Helper to determine estimated monthly consumption
function getEnergyConsumption(btu: number, tech: string): string {
  const baseKwh = (btu / 1000) * 1.6;
  const techFactor = tech === 'Dual Inverter' ? 0.65 : tech === 'Inverter' ? 0.72 : 1.0;
  const kwh = Math.round(baseKwh * techFactor * 10) / 10;
  return `${kwh} kWh/mês`;
}

// Base Brand Configurations
const BRAND_CONFIGS: Record<string, {
  name: string;
  series: string;
  warranty: string;
  hasWifiDefault: boolean;
  officialImg?: string;
  pdfUrl?: string;
}> = {
  'Midea': {
    name: 'Midea',
    series: 'AirVolution',
    warranty: '2 anos (10 anos compressor)',
    hasWifiDefault: true,
    officialImg: mideaImg,
    pdfUrl: 'https://midea.com.br/manuals/midea_airvolution_spec.pdf'
  },
  'Springer Carrier': {
    name: 'Springer Carrier',
    series: 'Xtreme Save',
    warranty: '2 anos total',
    hasWifiDefault: true,
    pdfUrl: 'https://springercarrier.com.br/manuals/xtreme_save_spec.pdf'
  },
  'Carrier': {
    name: 'Carrier',
    series: 'XPower Inverter',
    warranty: '2 anos total',
    hasWifiDefault: true,
    pdfUrl: 'https://carrier.com.br/manuals/xpower_inverter.pdf'
  },
  'LG': {
    name: 'LG',
    series: 'Dual Inverter Voice',
    warranty: '10 anos (Compressor Dual Inverter)',
    hasWifiDefault: true,
    pdfUrl: 'https://lg.com.br/manuals/lg_dual_inverter_voice.pdf'
  },
  'Samsung': {
    name: 'Samsung',
    series: 'WindFree Connect',
    warranty: '10 anos (Compressor Digital Inverter)',
    hasWifiDefault: true,
    pdfUrl: 'https://samsung.com.br/manuals/windfree_connect.pdf'
  },
  'Daikin': {
    name: 'Daikin',
    series: 'R-32 Eco Inverter',
    warranty: '2 anos (10 anos compressor)',
    hasWifiDefault: false,
    pdfUrl: 'https://daikin.com.br/manuals/daikin_r32_eco.pdf'
  },
  'Fujitsu': {
    name: 'Fujitsu',
    series: 'Airstage Inverter',
    warranty: '5 anos credenciado',
    hasWifiDefault: false,
    pdfUrl: 'https://fujitsu.com.br/manuals/airstage_inverter.pdf'
  },
  'Gree': {
    name: 'Gree',
    series: 'G-Classic',
    warranty: '5 anos autorizada',
    hasWifiDefault: true,
    officialImg: greeImg,
    pdfUrl: 'https://gree.com.br/manuals/gree_gclassic.pdf'
  },
  'Elgin': {
    name: 'Elgin',
    series: 'Eco Dream',
    warranty: '3 anos total',
    hasWifiDefault: true,
    pdfUrl: 'https://elgin.com.br/manuals/elgin_eco_dream.pdf'
  },
  'Hisense': {
    name: 'Hisense',
    series: 'Hi-Smart Wi-Fi',
    warranty: '2 anos (10 anos compressor)',
    hasWifiDefault: true,
    pdfUrl: 'https://hisense.com.br/manuals/hisense_hismart.pdf'
  },
  'TCL': {
    name: 'TCL',
    series: 'Gentle Breeze',
    warranty: '2 anos (10 anos compressor)',
    hasWifiDefault: true,
    pdfUrl: 'https://tcl.com.br/manuals/tcl_gentle_breeze.pdf'
  },
  'Agratto': {
    name: 'Agratto',
    series: 'Zen Inverter',
    warranty: '1 ano total',
    hasWifiDefault: false,
    officialImg: agrattoImg,
    pdfUrl: 'https://agratto.com.br/manuals/agratto_zen.pdf'
  },
  'Philco': {
    name: 'Philco',
    series: 'Eco Inverter',
    warranty: '1 ano (10 anos compressor)',
    hasWifiDefault: true,
    pdfUrl: 'https://philco.com.br/manuals/philco_eco_inverter.pdf'
  },
  'Electrolux': {
    name: 'Electrolux',
    series: 'Color Adapt',
    warranty: '1 ano (10 anos compressor)',
    hasWifiDefault: true,
    officialImg: electroluxImg,
    pdfUrl: 'https://electrolux.com.br/manuals/electrolux_color_adapt.pdf'
  }
};

const CATEGORIES_SPECS: {
  category: ProductCategory;
  btus: number[];
  technologies: Array<'Inverter' | 'Dual Inverter' | 'Convencional' | 'Compact Inverter'>;
  cycles: Array<'Frio' | 'Quente e Frio'>;
  basePrices: Record<number, number>;
}[] = [
  {
    category: 'Split Hi Wall',
    btus: [9000, 12000, 18000, 24000, 30000],
    technologies: ['Inverter', 'Dual Inverter', 'Convencional'],
    cycles: ['Frio', 'Quente e Frio'],
    basePrices: {
      9000: 2090,
      12000: 2490,
      18000: 3490,
      24000: 4490,
      30000: 5690
    }
  },
  {
    category: 'Piso Teto',
    btus: [24000, 36000, 48000, 60000],
    technologies: ['Inverter', 'Convencional'],
    cycles: ['Frio', 'Quente e Frio'],
    basePrices: {
      24000: 5290,
      36000: 6890,
      48000: 8990,
      60000: 10890
    }
  },
  {
    category: 'Cassete',
    btus: [18000, 24000, 36000, 48000, 60000],
    technologies: ['Inverter', 'Convencional'],
    cycles: ['Frio', 'Quente e Frio'],
    basePrices: {
      18000: 4890,
      24000: 5990,
      36000: 7490,
      48000: 9290,
      60000: 11490
    }
  },
  {
    category: 'Multi Split',
    btus: [18000, 24000, 30000, 36000],
    technologies: ['Inverter', 'Dual Inverter'],
    cycles: ['Frio', 'Quente e Frio'],
    basePrices: {
      18000: 6890,
      24000: 8990,
      30000: 10890,
      36000: 12990
    }
  },
  {
    category: 'VRF',
    btus: [36000, 48000, 60000],
    technologies: ['Inverter'],
    cycles: ['Quente e Frio', 'Frio'],
    basePrices: {
      36000: 13900,
      48000: 16900,
      60000: 19900
    }
  },
  {
    category: 'Janela',
    btus: [7500, 9000, 12000, 18000],
    technologies: ['Inverter', 'Convencional'],
    cycles: ['Frio', 'Quente e Frio'],
    basePrices: {
      7500: 1590,
      9000: 1890,
      12000: 2290,
      18000: 3190
    }
  },
  {
    category: 'Portátil',
    btus: [9000, 10000, 12000, 14000],
    technologies: ['Convencional', 'Compact Inverter'],
    cycles: ['Frio', 'Quente e Frio'],
    basePrices: {
      9000: 2190,
      10000: 2490,
      12000: 2890,
      14000: 3390
    }
  }
];

export function generateFullCatalog(): Product[] {
  const products: Product[] = [];
  const brandKeys = Object.keys(BRAND_CONFIGS);

  let counter = 1;

  for (const catSpec of CATEGORIES_SPECS) {
    for (const btu of catSpec.btus) {
      for (const brandKey of brandKeys) {
        const brandConfig = BRAND_CONFIGS[brandKey];
        
        // Select technology supported by category & brand
        let tech = catSpec.technologies[counter % catSpec.technologies.length];
        if (brandKey === 'LG' && catSpec.technologies.includes('Dual Inverter')) {
          tech = 'Dual Inverter';
        }

        const cycle = catSpec.cycles[(counter + (brandKey.length % 2)) % catSpec.cycles.length];
        const hasWifi = (counter % 3 !== 0) && brandConfig.hasWifiDefault;
        const recommendedArea = getRecommendedArea(btu);
        const energyConsumption = getEnergyConsumption(btu, tech);

        // Price calculation
        const basePrice = catSpec.basePrices[btu] || 2500;
        const techMultiplier = tech === 'Dual Inverter' ? 1.15 : tech === 'Inverter' ? 1.08 : 0.95;
        const cycleMultiplier = cycle === 'Quente e Frio' ? 1.12 : 1.0;
        const brandMultiplier = ['Daikin', 'Fujitsu', 'LG', 'Samsung'].includes(brandKey) ? 1.08 : 1.0;
        
        const finalPrice = Math.round((basePrice * techMultiplier * cycleMultiplier * brandMultiplier) / 10) * 10;
        const originalPrice = Math.round(finalPrice * 1.15);

        // Construct unique ID and SKU
        const brandSlug = brandKey.toLowerCase().replace(/\s+/g, '-');
        const catSlug = catSpec.category.toLowerCase().replace(/\s+/g, '-');
        const id = `${brandSlug}-${catSlug}-${btu}k-${tech.toLowerCase().replace(/\s+/g, '')}-${cycle === 'Quente e Frio' ? 'qf' : 'frio'}-${counter}`;
        const sku = `GIL-${brandKey.slice(0, 3).toUpperCase()}-${btu}-${counter.toString().padStart(3, '0')}`;

        // Construct clear title
        const name = `Ar Condicionado ${catSpec.category} ${brandConfig.name} ${brandConfig.series} ${tech} ${btu.toLocaleString('pt-BR')} BTUs ${cycle} 220V`;

        // Official image or clean fallback
        const mainImage = brandConfig.officialImg || '';
        const gallery = mainImage ? [mainImage] : [];

        const rating = Math.round((4.5 + (counter % 5) * 0.1) * 10) / 10;
        const reviewsCount = 12 + (counter % 45);

        const product: Product = {
          id,
          name,
          brand: brandConfig.name,
          capacityBTU: btu,
          technology: tech,
          cycle,
          category: catSpec.category,
          price: finalPrice,
          originalPrice,
          image: mainImage,
          gallery,
          description: `O Ar Condicionado ${catSpec.category} ${brandConfig.name} ${brandConfig.series} de ${btu.toLocaleString('pt-BR')} BTUs é a escolha ideal para quem busca climatização rápida, alta eficiência energética e conforto incomparável para ambientes de ${recommendedArea}. Equipado com tecnologia ${tech} e serpentina anticorrosiva de cobre.`,
          features: [
            `Tecnologia ${tech} para redução de até 70% no consumo de energia`,
            `Gás Ecológico R-32 de altíssima eficiência térmica`,
            `Serpentina de cobre com tratamento anticorrosivo Gold Fin/Blue Fin`,
            hasWifi ? 'Conectividade Wi-Fi para controle via aplicativo de smartphone' : 'Função Auto-Diagnóstico de falhas e Timer programável',
            `Recomendado para ambientes de ${recommendedArea}`
          ],
          specs: {
            'Modelo / SKU': sku,
            'Capacidade de Refrigeração': `${btu.toLocaleString('pt-BR')} BTU/h`,
            'Ciclo': cycle,
            'Tecnologia': tech,
            'Categoria': catSpec.category,
            'Área Recomendada': recommendedArea,
            'Consumo Aproximado': energyConsumption,
            'Gás Refrigerante': 'R-32 Ecológico',
            'Selo Procel': tech !== 'Convencional' ? 'Selo Procel A (Inmetro)' : 'Classificação B',
            'Voltagem': '220V Mono',
            'Wi-Fi': hasWifi ? 'Integrado' : 'Opcional via Kit',
            'Garantia do Fabricante': brandConfig.warranty
          },
          rating,
          reviewsCount,
          sku,
          procelBadge: tech !== 'Convencional' ? 'Selo Procel A' : 'Classificação B',
          recommendedArea,
          energyConsumption,
          warranty: brandConfig.warranty,
          hasWifi,
          pdfUrl: brandConfig.pdfUrl,
          energyRating: tech !== 'Convencional' ? 'A' : 'B'
        };

        products.push(product);
        counter++;
      }
    }
  }

  return products;
}

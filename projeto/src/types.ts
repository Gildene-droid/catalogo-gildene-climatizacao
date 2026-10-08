export type ProductCategory = 
  | 'Split Hi Wall' 
  | 'Cassete' 
  | 'Piso Teto' 
  | 'VRF' 
  | 'Multi Split' 
  | 'Comercial' 
  | 'Residencial' 
  | 'Split' 
  | 'Janela' 
  | 'Portátil';

export type ProductBrand = 
  | 'Midea' 
  | 'LG' 
  | 'Samsung' 
  | 'Gree' 
  | 'Daikin' 
  | 'Fujitsu' 
  | 'Elgin' 
  | 'Hitachi' 
  | 'Hisense' 
  | 'TCL' 
  | 'Agratto' 
  | 'Springer Carrier' 
  | 'Electrolux';

export interface Product {
  id: string;
  name: string;
  brand: string;
  capacityBTU: number; // e.g. 9000, 12000, 18000, 24000, 30000, 36000, 60000
  technology: 'Inverter' | 'Dual Inverter' | 'Convencional' | 'Compact Inverter';
  cycle: 'Frio' | 'Quente e Frio';
  category: ProductCategory;
  price: number;
  originalPrice: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specs: {
    [key: string]: string;
  };
  rating: number;
  reviewsCount: number;
  sku?: string;
  procelBadge?: string;
  recommendedArea?: string; // e.g. 'Até 15 m²'
  energyConsumption?: string; // e.g. '15,8 kWh/mês'
  warranty?: string; // e.g. '2 anos / 10 anos compressor'
  hasWifi?: boolean;
  pdfUrl?: string;
  energyRating?: 'A' | 'A+++' | 'B' | 'C';
}

export interface UpsellItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  id: string; // unique cart item id
  product: Product;
  quantity: number;
  voltage: '220V' | '110V';
  selectedUpsells: UpsellItem[];
}

export interface FilterState {
  capacities: number[];
  brands: string[];
  technologies: string[];
  cycles: string[];
  category: string;
  hasWifi?: boolean;
  minPrice?: number;
  maxPrice?: number;
  energyRating?: string;
  areaRange?: string;
}

export interface BrandInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  warrantyInfo: string;
  logoPlaceholder?: string;
  seoKeywords: string[];
}

export interface ShippingInfo {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface BillingInfo {
  email: string;
  fullName: string;
  cpfCnpj: string;
  phone: string;
  paymentMethod: 'cartao' | 'pix' | 'boleto';
  cardNum?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
  installments?: string;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  interest: string;
  status: 'Novo' | 'Em Atendimento' | 'Concluído';
  createdAt: string;
  notes?: string;
}


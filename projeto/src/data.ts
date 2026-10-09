import { applyWarrantyPolicy, getWarrantyPolicy } from './warrantyPolicies';
import { getRecommendedArea } from './btuSizing';
import { Product, UpsellItem, BrandInfo } from './types';
import { generateFullCatalog } from './productsCatalogGenerator';
import { applyProductPhoto } from './productPhotos';
import electroluxImg from './assets/images/electrolux_color_split_1783633440245.jpg';
import greeImg from './assets/images/gree_classic_split_1783633405785.jpg';
import agrattoImg from './assets/images/agratto_zen_split_1783633429633.jpg';
import mideaImg from './assets/images/midea_airvolution_split_1783633417497.jpg';

export const UPSELL_ITEMS: UpsellItem[] = [
  {
    id: 'up_capa',
    name: 'Capa Protetora Impermeável',
    price: 119.00,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'up_ctrl',
    name: 'Controle Universal Premium',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1558885561-56c2a4e2f3bc?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'up_sup',
    name: 'Suporte de Parede Reforçado',
    price: 145.00,
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'up_filtro',
    name: 'Filtro HEPA Antibacteriano',
    price: 54.00,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80'
  }
];

export const BRANDS_DATA: Record<string, BrandInfo> = {
  midea: {
    id: 'midea',
    name: 'Midea',
    tagline: 'Líder Global em Climatização e Soluções Inverter Inteligentes',
    description: 'A Midea é uma das maiores fabricantes de ar-condicionado do mundo. Destaca-se por compressores Inverter de alta eficiência, durabilidade com serpentinas de cobre e a renomada linha AirVolution com condensadora barril.',
    highlights: [
      'Tecnologia Inverter Quattro de altíssima eficiência energética',
      'Serpentina em cobre com proteção Gold Fin/Blue Fin',
      'Gás ecológico R-32 com menor impacto ambiental',
      'Até 70% de economia de energia com Selo Procel A'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['Ar Condicionado Midea', 'Midea AirVolution', 'Split Inverter Midea 12000', 'Midea 9000 BTUs']
  },
  lg: {
    id: 'lg',
    name: 'LG',
    tagline: 'Tecnologia Dual Inverter Voice com Inteligência Artificial ThinQ',
    description: 'A LG revoluciona a climatização residencial com compressores Dual Inverter de duplo rotor, garantindo resfriamento até 40% mais rápido, ultra-silêncio (19 dB) e controle por comando de voz via Alexa e Google Assistente.',
    highlights: [
      'Compressor Dual Inverter com 1 ano de garantia',
      'Controle Wi-Fi integrado com aplicativo LG ThinQ e comando de voz',
      'Consumo energético reduzido em até 70%',
      'Proteção contra picos de tensão e corrosão com GoldFin'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['LG Dual Inverter', 'Ar Condicionado LG ThinQ', 'LG Voice 12000', 'LG Dual Inverter 18000 BTUs']
  },
  samsung: {
    id: 'samsung',
    name: 'Samsung',
    tagline: 'Exclusiva Tecnologia WindFree sem Vento Direto',
    description: 'A Samsung traz a tecnologia patenteada WindFree, espalhando o ar suavemente por microfuros sem criar correntes de ar frio incômodas. Com Wi-Fi SmartThings e compressores Digital Inverter Ultra.',
    highlights: [
      'Tecnologia WindFree: clatimatização sem fluxo de ar direto',
      'Compressor Digital Inverter Ultra com até 77% de economia',
      'Conectividade Wi-Fi e controle por ecossistema SmartThings',
      'Filtro Antibacteriano lavável com proteção contra alérgenos'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['Samsung WindFree', 'Ar Condicionado Samsung Inverter', 'Samsung WindFree 12000 BTUs']
  },
  gree: {
    id: 'gree',
    name: 'Gree',
    tagline: 'A Maior Especialista em Ar-Condicionado do Planeta',
    description: 'Focada 100% em tecnologia de climatização, a Gree produz compressores de extrema robustez com altíssimo índice de eficiência energética, sendo a escolha número 1 em locais com uso intenso.',
    highlights: [
      'Maior durabilidade em ambientes litorâneos e comerciais',
      'Serpentinas de cobre reforçadas anticorrosivas',
      'Tecnologia G-Classic Inverter com rápido resfriamento',
      'Selo Procel Ouro com eficiência topo de linha'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['Gree Inverter', 'Ar Condicionado Gree 9000', 'Gree G-Classic', 'Gree 12000 BTUs']
  },
  daikin: {
    id: 'daikin',
    name: 'Daikin',
    tagline: 'Engenharia Japonesa de Alta Precisão e Silêncio Absoluto',
    description: 'Referência mundial em climatização e criadora do sistema VRV/VRF, a Daikin entrega equipamentos silenciosos, duráveis e equipados com o exclusivo compressor Neodymium Swing.',
    highlights: [
      'Compressor Swing exclusivo da Daikin sem atrito interno',
      'Gás R-32 de alta eficiência térmica',
      'Silêncio extremo para noites de sono perfeitas',
      'Pioneira global em soluções VRF e Inverter Premium'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['Daikin Inverter', 'Ar Condicionado Daikin R32', 'Daikin VRF', 'Daikin 12000 BTUs']
  },
  fujitsu: {
    id: 'fujitsu',
    name: 'Fujitsu General',
    tagline: 'Qualidade Premium Japonesa e Altíssima Eficiência Energética',
    description: 'A Fujitsu General é sinônimo de luxo, máxima economia de energia e confiabilidade absoluta no segmento de condicionadores de ar residenciais e comerciais.',
    highlights: [
      'Sensores inteligentes de presença humana (Human Sensor)',
      'A mais alta pontuação no índice IDRS de economia do Inmetro',
      'Múltiplos filtros com íons de prata e maçã catequina',
      'Ideal para projetos arquitetônicos exigentes'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['Fujitsu Inverter', 'Fujitsu Airstage', 'Ar Condicionado Fujitsu 12000', 'Multi Split Fujitsu']
  },
  elgin: {
    id: 'elgin',
    name: 'Elgin',
    tagline: 'Mais de 70 Anos de Tradição e Confiança no Brasil',
    description: 'Com tradição e custo-benefício imbatível, a Elgin fabrica linhas de ar-condicionado com fluido ecológico R-32, serpentina de cobre e display invisível na evaporadora.',
    highlights: [
      'Excelente relação custo x benefício para residências e comércios',
      'Fluido refrigerante ecológico R-32 em toda a linha Inverter',
      'Classificação A do Inmetro com baixíssimo consumo elétrico',
      'Linha completa de Split, Piso Teto e Cassete'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['Elgin Eco Dream', 'Ar Condicionado Elgin Inverter', 'Elgin Piso Teto', 'Elgin Cassete']
  },
  hitachi: {
    id: 'hitachi',
    name: 'Hitachi',
    tagline: 'Soluções Corporativas e Residenciais de Alta Capacidade',
    description: 'Com tecnologia japonesa de vanguarda, a Hitachi é líder reconhecida em sistemas centrais VRF, Cassete e Piso Teto para grandes escritórios, clínicas e residências de alto padrão.',
    highlights: [
      'Sistemas VRF e Air365 com máxima automação e inteligência',
      'Cassete 4 vias com fluxo de ar 360 graus homogêneo',
      'Tecnologia Inverter de controle vetorial senoidal',
      'Opções de alta capacidade térmica acima de 36.000 BTUs'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['Hitachi VRF', 'Hitachi Cassete', 'Ar Condicionado Hitachi', 'Hitachi Piso Teto']
  },
  hisense: {
    id: 'hisense',
    name: 'Hisense',
    tagline: 'Inovação Tecnológica com Design Moderno e Conectividade',
    description: 'A Hisense se destaca no mercado global por seus aparelhos Hi-Smart Inverter equipados com tripla filtragem, Wi-Fi nativo e compressores silenciosos de rápido resfriamento.',
    highlights: [
      'Filtro 4 em 1 (Vitamina C, Catequina, Íons de Prata e Filtro HEPA)',
      'Modo Super Cool para refrigeração instantânea',
      'Conexão Wi-Fi com app ConnectLife e inteligência artificial',
      'Design slim ultrassutil'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['Hisense Inverter', 'Ar Condicionado Hisense Wi-Fi', 'Hisense 12000 BTUs']
  },
  tcl: {
    id: 'tcl',
    name: 'TCL',
    tagline: 'Tecnologia Freshin e Climatização com Conectividade Total',
    description: 'A TCL entrega inovação com filtros inteligentes, conectividade integrada e ar-condicionado de alta velocidade com baixo consumo energético.',
    highlights: [
      'Modo brisa suave Gentle Breeze com aletas microfuradas',
      'Filtro com Ions de Prata e carvão ativado',
      'Conectividade via Google Assistente e aplicativo TCL Home',
      'Excelente valor de investimento e manutenção simples'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['TCL Inverter', 'Ar Condicionado TCL 12000', 'TCL Gentle Breeze', 'TCL 9000 BTUs']
  },
  agratto: {
    id: 'agratto',
    name: 'Agratto',
    tagline: 'Conforto Térmico Acessível com Qualidade Garantida',
    description: 'A Agratto é referência nacional em ar-condicionado acessível. A linha Zen Inverter conta com serpentina de cobre, gás R-32 e condensadora compacta barril.',
    highlights: [
      'Melhor preço da categoria Inverter com serpentina de cobre',
      'Design limpo que se adapta a qualquer ambiente residencial',
      'Classificação energética A para economia real na conta de luz',
      'Manutenção facilitada e peças de reposição abundantes no Brasil'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['Agratto Zen Inverter', 'Ar Condicionado Agratto 9000', 'Agratto 12000 BTUs']
  },
  'springer-carrier': {
    id: 'springer-carrier',
    name: 'Springer Carrier',
    tagline: 'Pioneirismo e Tradição em Soluções de Climatização Residencial e Comercial',
    description: 'Fruto da união entre a pioneira Carrier e a Springer no Brasil, oferece a consagrada linha Xtreme Save com tecnologia Inverter, alta eficiência energética e extrema durabilidade.',
    highlights: [
      'Liderança e tradição em climatização no Brasil',
      'Tecnologia Inverter Xtreme Save com alta economia de energia',
      'Serpentina em cobre anticorrosiva',
      'Selo Procel A do Inmetro'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['Springer Carrier Inverter', 'Springer Xtreme Save', 'Ar Condicionado Springer Carrier']
  },
  carrier: {
    id: 'carrier',
    name: 'Carrier',
    tagline: 'A Inventora do Ar-Condicionado Moderno',
    description: 'Criada por Willis Carrier, o inventor do ar-condicionado, a Carrier é líder mundial em soluções de alta performance para uso residencial, comercial e industrial.',
    highlights: [
      'Invenção e vanguarda global em climatização',
      'Sistemas Chiller, VRF e Split de altíssima eficiência',
      'Filtros de purificação avançada com ionização',
      'Baixíssimo ruído e resistência a maresia'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['Carrier Inverter', 'Ar Condicionado Carrier', 'Carrier VRF', 'Carrier Cassete']
  },
  philco: {
    id: 'philco',
    name: 'Philco',
    tagline: 'Tecnologia, Conforto e Excelente Custo-Benefício',
    description: 'A Philco desenvolve modelos Split e Inverter modernos com conectividade Wi-Fi, proteção anticorrosiva nas aletas e alta velocidade de refrigeração para residências brasileiras.',
    highlights: [
      'Gás ecológico R-32 de altíssima eficiência térmica',
      'Filtro lavável antibacteriano e anti-fúngico',
      'Modo Turbo e controle via app smartphone',
      'Preço acessível com excelente acabamento'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['Philco Inverter', 'Ar Condicionado Philco 12000', 'Philco Eco Inverter']
  },
  electrolux: {
    id: 'electrolux',
    name: 'Electrolux',
    tagline: 'Design Sueco com Alta Economia Energética e Tripla Filtragem',
    description: 'A Electrolux traz ao Brasil soluções de ar-condicionado com design refinado, controle de umidade, filtros bactericidas e compressores Inverter de última geração com Selo Procel A.',
    highlights: [
      'Sistema de Tripla Filtragem mantendo o ar purificado',
      'Tecnologia Inverter com até 60% de economia energética',
      'Função Eco e Auto-limpeza integrada',
      'Design clean e display invisível na evaporadora'
    ],
    warrantyInfo: '1 ano de garantia.',
    seoKeywords: ['Electrolux Inverter', 'Ar Condicionado Electrolux Color', 'Electrolux 12000 BTUs']
  }
};

export const PRODUCTS: Product[] = [
  {
    id: 'midea-9k-airvolution',
    name: 'Ar Condicionado Split Hi Wall Inverter Midea Airvolution 9.000 BTUs Frio 220V',
    brand: 'Midea',
    capacityBTU: 9000,
    technology: 'Inverter',
    cycle: 'Frio',
    category: 'Split Hi Wall',
    price: 2150.00,
    originalPrice: 2490.00,
    image: mideaImg,
    gallery: [mideaImg],
    description: 'O Ar Condicionado Split Midea AirVolution traz alta tecnologia Inverter com baixo consumo energético e serpentina em cobre de altíssima durabilidade. Ideal para quem busca um resfriamento confiável e duradouro com condensadora cilíndrica.',
    features: [
      'Tecnologia Inverter de alta eficiência energética',
      'Serpentina de cobre robusta e durável',
      'Condensadora cilíndrica vertical (Barril)',
      'Filtro de alta densidade anti-alérgenos'
    ],
    specs: {
      'Capacidade de Refrigeração': '9.000 BTU/h',
      'Ciclo': 'Frio',
      'Tecnologia': 'Inverter',
      'Classificação Energética': 'A',
      'Gás Refrigerante': 'R-32',
      'Garantia': '1 ano de garantia'
    },
    rating: 4.8,
    reviewsCount: 35,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'midea-12k-airvolution',
    name: 'Ar Condicionado Split Hi Wall Inverter Midea Airvolution 12.000 BTUs Frio 220V',
    brand: 'Midea',
    capacityBTU: 12000,
    technology: 'Inverter',
    cycle: 'Frio',
    category: 'Split Hi Wall',
    price: 2450.00,
    originalPrice: 2890.00,
    image: mideaImg,
    gallery: [mideaImg],
    description: 'O Ar Condicionado Split Midea AirVolution de 12.000 BTUs traz alta tecnologia Inverter com baixo consumo energético e serpentina em cobre de altíssima durabilidade. Ideal para quem busca um resfriamento confiável e duradouro com condensadora cilíndrica.',
    features: [
      'Tecnologia Inverter: até 70% de economia',
      'Serpentina de cobre robusta e durável',
      'Condensadora cilíndrica vertical compacta',
      'Baixíssimo nível de ruído em modo noturno'
    ],
    specs: {
      'Capacidade de Refrigeração': '12.000 BTU/h',
      'Ciclo': 'Frio',
      'Tecnologia': 'Inverter',
      'Classificação Energética': 'A',
      'Gás Refrigerante': 'R-32',
      'Garantia': '1 ano de garantia'
    },
    rating: 4.9,
    reviewsCount: 42,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'midea-18k-inverter',
    name: 'Ar Condicionado Split Hi Wall Inverter Midea Airvolution 18.000 BTUs Quente e Frio 220V',
    brand: 'Midea',
    capacityBTU: 18000,
    technology: 'Inverter',
    cycle: 'Quente e Frio',
    category: 'Split Hi Wall',
    price: 3390.00,
    originalPrice: 3890.00,
    image: mideaImg,
    gallery: [mideaImg],
    description: 'Versão potente de 18.000 BTUs Quente e Frio da Midea. Excelente opção para salas de estar amplas, escritórios e consultórios de até 30m².',
    features: [
      'Ciclo Quente e Frio para todas as estações do ano',
      'Inverter Quattro com ajuste milimétrico de rotação',
      'Serpentina em cobre anticorrosiva',
      'Display LED invisível'
    ],
    specs: {
      'Capacidade de Refrigeração': '18.000 BTU/h',
      'Ciclo': 'Quente e Frio',
      'Tecnologia': 'Inverter',
      'Classificação Energética': 'A',
      'Gás Refrigerante': 'R-32'
    },
    rating: 4.9,
    reviewsCount: 24,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'lg-dual-inverter-12k',
    name: 'Ar Condicionado Split Hi Wall LG Dual Inverter Voice 12.000 BTUs Frio 220V',
    brand: 'LG',
    capacityBTU: 12000,
    technology: 'Dual Inverter',
    cycle: 'Frio',
    category: 'Split Hi Wall',
    price: 2699.00,
    originalPrice: 3099.00,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    gallery: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'],
    description: 'Comandado por voz através do app ThinQ. Compressor Dual Inverter com 1 ano de garantia e até 70% de economia de energia, mantendo estabilidade total de temperatura.',
    features: [
      'Conexão Wi-Fi com comando de voz Alexa e Google',
      'Compressor Dual Inverter com maior estabilidade',
      'Super silencioso: 19 dB no sono',
      'Filtro de ar micro poeira eficiente'
    ],
    specs: {
      'Capacidade de Refrigeração': '12.000 BTU/h',
      'Ciclo': 'Frio',
      'Tecnologia': 'Dual Inverter',
      'Classificação Energética': 'A (Selo Ouro)',
      'Garantia': '1 ano de garantia'
    },
    rating: 4.9,
    reviewsCount: 56,
    procelBadge: 'Selo Procel Ouro'
  },
  {
    id: 'lg-dual-inverter-18k-qf',
    name: 'Ar Condicionado Split Hi Wall LG Dual Inverter Voice 18.000 BTUs Quente e Frio 220V',
    brand: 'LG',
    capacityBTU: 18000,
    technology: 'Dual Inverter',
    cycle: 'Quente e Frio',
    category: 'Split Hi Wall',
    price: 3799.00,
    originalPrice: 4299.00,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    gallery: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'],
    description: 'Alta capacidade de 18.000 BTUs com ciclo Quente/Frio. Mantenha o clima ideal no inverno e no verão com inteligência artificial e economia de energia superior.',
    features: [
      'Ciclo Quente e Frio inteligente',
      'Comando de Voz e aplicativo ThinQ',
      'Micro Dust Filter da LG',
      'Serpentina de cobre GoldFin'
    ],
    specs: {
      'Capacidade de Refrigeração': '18.000 BTU/h',
      'Ciclo': 'Quente e Frio',
      'Tecnologia': 'Dual Inverter',
      'Classificação Energética': 'A'
    },
    rating: 5.0,
    reviewsCount: 38,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'samsung-windfree-12k',
    name: 'Ar Condicionado Split Hi Wall Samsung WindFree Connect 12.000 BTUs Frio 220V',
    brand: 'Samsung',
    capacityBTU: 12000,
    technology: 'Inverter',
    cycle: 'Frio',
    category: 'Split Hi Wall',
    price: 2790.00,
    originalPrice: 3190.00,
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=600&q=80',
    gallery: ['https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=600&q=80'],
    description: 'Sem correntes de ar direto incômodas. O ar é disperso suavemente por 23.000 microfuros para máximo conforto térmico no seu dormitório ou sala.',
    features: [
      'Tecnologia WindFree de dispersão uniforme sem vento direto',
      'Conectividade Wi-Fi e app SmartThings',
      'Digital Inverter Ultra de alta eficiência',
      'Filtro lavável antibacteriano'
    ],
    specs: {
      'Capacidade de Refrigeração': '12.000 BTU/h',
      'Ciclo': 'Frio',
      'Tecnologia': 'Inverter',
      'Classificação Energética': 'A',
      'Garantia': '1 ano de garantia'
    },
    rating: 4.8,
    reviewsCount: 31,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'gree-9k-split',
    name: 'Ar Condicionado Split Hi Wall G-Classic Inverter R-32 Gree 9.000 BTUs Frio 220V',
    brand: 'Gree',
    capacityBTU: 9000,
    technology: 'Inverter',
    cycle: 'Frio',
    category: 'Split Hi Wall',
    price: 2150.00,
    originalPrice: 2490.00,
    image: greeImg,
    gallery: [greeImg],
    description: 'O Gree G-Classic Inverter de 9.000 BTUs é o aliado perfeito para ambientes de até 15m². Com tecnologia Inverter, oferece resfriamento super rápido e controle preciso de temperatura com condensadora cilíndrica.',
    features: [
      'Resfriamento turbo acelerado',
      'Condensadora cilíndrica vertical com serpentina em cobre',
      'Função Auto Diagnóstico de falhas',
      'Ideal para quartos e escritórios'
    ],
    specs: {
      'Capacidade de Refrigeração': '9.000 BTU/h',
      'Ciclo': 'Frio',
      'Tecnologia': 'Inverter',
      'Classificação Energética': 'A (Inmetro)',
      'Gás Refrigerante': 'R-32'
    },
    rating: 4.7,
    reviewsCount: 32,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'gree-cassete-36k',
    name: 'Ar Condicionado Cassete Gree Inverter 36.000 BTUs Quente e Frio 220V',
    brand: 'Gree',
    capacityBTU: 36000,
    technology: 'Inverter',
    cycle: 'Quente e Frio',
    category: 'Cassete',
    price: 7490.00,
    originalPrice: 8390.00,
    image: greeImg,
    gallery: [greeImg],
    description: 'Solução embutida no gesso para escritórios, restaurantes e salas corporativas. Fluxo de ar em 4 vias homogêneo com bomba de dreno embutida.',
    features: [
      'Fluxo de ar 360° em 4 vias direcionáveis',
      'Bomba de dreno embutida de série',
      'Inverter comercial com altíssimo rendimento',
      'Painel extra-fino para embutir no teto'
    ],
    specs: {
      'Capacidade de Refrigeração': '36.000 BTU/h',
      'Ciclo': 'Quente e Frio',
      'Tecnologia': 'Inverter',
      'Aplicação': 'Comercial / Residencial Ampla'
    },
    rating: 4.9,
    reviewsCount: 15,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'daikin-12k-r32',
    name: 'Ar Condicionado Split Hi Wall Daikin Inverter R-32 12.000 BTUs Frio 220V',
    brand: 'Daikin',
    capacityBTU: 12000,
    technology: 'Inverter',
    cycle: 'Frio',
    category: 'Split Hi Wall',
    price: 2890.00,
    originalPrice: 3290.00,
    image: 'https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=600&q=80',
    gallery: ['https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=600&q=80'],
    description: 'Liderança tecnológica japonesa. Equipado com compressor Swing exclusivo da Daikin sem vibrações ou atrito interno, oferecendo ultra-silêncio e durabilidade histórica.',
    features: [
      'Compressor Swing sem atrito interno',
      'Fluido ecológico R-32',
      'Funcionamento silencioso nivel estúdio',
      'Tratamento anticorrosivo na aleta da condensadora'
    ],
    specs: {
      'Capacidade de Refrigeração': '12.000 BTU/h',
      'Ciclo': 'Frio',
      'Tecnologia': 'Inverter Premium',
      'Garantia': '1 ano de garantia'
    },
    rating: 5.0,
    reviewsCount: 47,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'fujitsu-12k-airstage',
    name: 'Ar Condicionado Split Hi Wall Fujitsu Airstage Inverter 12.000 BTUs Frio 220V',
    brand: 'Fujitsu',
    capacityBTU: 12000,
    technology: 'Inverter',
    cycle: 'Frio',
    category: 'Split Hi Wall',
    price: 3190.00,
    originalPrice: 3590.00,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    gallery: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'],
    description: 'A mais alta pontuação energética do Inmetro. O Fujitsu Airstage é ideal para clientes exigentes que buscam climatização luxuosa, filtros de íon de prata e durabilidade máxima.',
    features: [
      'Sensor de presença humana para ajuste automático',
      'Máxima economia de eletricidade da categoria',
      'Filtragem com catequina de maçã',
      'Serpentina anticorrosiva reforçada'
    ],
    specs: {
      'Capacidade de Refrigeração': '12.000 BTU/h',
      'Ciclo': 'Frio',
      'Tecnologia': 'Inverter Japonesa',
      'Classificação Energética': 'A (Topo de Categoria)'
    },
    rating: 5.0,
    reviewsCount: 29,
    procelBadge: 'Selo Procel Ouro'
  },
  {
    id: 'elgin-eco-dream',
    name: 'Ar Condicionado Split Hi Wall Elgin Eco Dream Inverter 9.000 BTUs Frio 220V',
    brand: 'Elgin',
    capacityBTU: 9000,
    technology: 'Inverter',
    cycle: 'Frio',
    category: 'Split Hi Wall',
    price: 1980.00,
    originalPrice: 2280.00,
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=600&q=80',
    gallery: ['https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=600&q=80'],
    description: 'O Elgin Eco Dream conta com um design moderno e elegante. Seu compressor Inverter inteligente garante excelente performance com baixíssimo consumo elétrico.',
    features: [
      'Fluido ecológico R-32',
      'Serpentina de cobre de alta transferência térmica',
      'Filtro com carvão ativo contra odores',
      'Visor de temperatura discreto na evaporadora'
    ],
    specs: {
      'Capacidade de Refrigeração': '9.000 BTU/h',
      'Ciclo': 'Frio',
      'Tecnologia': 'Inverter',
      'Classificação Energética': 'A',
      'Garantia': '1 ano de garantia'
    },
    rating: 4.6,
    reviewsCount: 19,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'elgin-piso-teto-36k',
    name: 'Ar Condicionado Piso Teto Elgin Eco Inverter 36.000 BTUs Frio 220V',
    brand: 'Elgin',
    capacityBTU: 36000,
    technology: 'Inverter',
    cycle: 'Frio',
    category: 'Piso Teto',
    price: 6890.00,
    originalPrice: 7590.00,
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80',
    gallery: ['https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80'],
    description: 'Instalação flexível no teto ou no piso. Potência comercial de 36.000 BTUs para lojas, salões de festas e recepções.',
    features: [
      'Insuflamento de ar de longo alcance',
      'Instalação versátil no piso ou fixado no teto',
      'Compressor Inverter de alta vazão',
      'Gás ecológico R-32'
    ],
    specs: {
      'Capacidade de Refrigeração': '36.000 BTU/h',
      'Ciclo': 'Frio',
      'Tecnologia': 'Inverter',
      'Categoria': 'Piso Teto Comercial'
    },
    rating: 4.8,
    reviewsCount: 11,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'hitachi-vrf-unit',
    name: 'Sistema VRF Inteligente Hitachi Air365 Módulos de Alta Capacidade',
    brand: 'Hitachi',
    capacityBTU: 60000,
    technology: 'Inverter',
    cycle: 'Quente e Frio',
    category: 'VRF',
    price: 18900.00,
    originalPrice: 21500.00,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    gallery: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'],
    description: 'Sistema VRF corporativo Hitachi. Permite conectar dezenas de evaporadoras (Hi-Wall, Cassete, Duto) a uma única central condensadora inteligente com controle individualizado.',
    features: [
      'Controle de fluxo de fluido refrigerante variável',
      'Conexão modular para prédios e grandes projetos',
      'Máxima eficiência em parcial de carga',
      'Automação BMS e supervisão centralizada'
    ],
    specs: {
      'Capacidade Nominal': '60.000+ BTU/h (Expansível)',
      'Ciclo': 'Quente e Frio',
      'Tecnologia': 'VRF / VRV Inverter',
      'Aplicação': 'Grandes Projetos Corporativos'
    },
    rating: 5.0,
    reviewsCount: 9,
    procelBadge: 'Selo Procel Ouro'
  },
  {
    id: 'hisense-12k-smart',
    name: 'Ar Condicionado Split Hi Wall Hisense Hi-Smart Inverter 12.000 BTUs Frio 220V',
    brand: 'Hisense',
    capacityBTU: 12000,
    technology: 'Inverter',
    cycle: 'Frio',
    category: 'Split Hi Wall',
    price: 2290.00,
    originalPrice: 2590.00,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    gallery: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'],
    description: 'Aparelho Hi-Smart da Hisense com Wi-Fi nativo e app ConnectLife. Design limpo com display invisível e filtro quádruplo contra poeira e vírus.',
    features: [
      'Conectividade Wi-Fi integrada de fábrica',
      'Sistema de filtragem 4 em 1 com Vitamina C',
      'Resfriamento ultrarrápido em segundos',
      'Funcionamento econômico silencioso'
    ],
    specs: {
      'Capacidade de Refrigeração': '12.000 BTU/h',
      'Ciclo': 'Frio',
      'Tecnologia': 'Inverter',
      'Garantia': '1 ano de garantia'
    },
    rating: 4.7,
    reviewsCount: 18,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'tcl-12k-gentle',
    name: 'Ar Condicionado Split Hi Wall TCL Gentle Breeze Inverter 12.000 BTUs Frio 220V',
    brand: 'TCL',
    capacityBTU: 12000,
    technology: 'Inverter',
    cycle: 'Frio',
    category: 'Split Hi Wall',
    price: 2190.00,
    originalPrice: 2490.00,
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=600&q=80',
    gallery: ['https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=600&q=80'],
    description: 'Com aletas perfuradas Gentle Breeze, o TCL proporciona resfriamento sem vento abrupto. Excelente conectividade com comandos Google Assistant e Alexa.',
    features: [
      'Aletas microporosas Gentle Breeze',
      'Controle por voz e aplicativo TCL Home',
      'Serpentina em cobre anticorrosivo',
      'Limpeza automática por congelamento e secagem'
    ],
    specs: {
      'Capacidade de Refrigeração': '12.000 BTU/h',
      'Ciclo': 'Frio',
      'Tecnologia': 'Inverter',
      'Classificação Energética': 'A'
    },
    rating: 4.6,
    reviewsCount: 22,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'agratto-12k-split',
    name: 'Ar Condicionado Split Hi Wall Inverter R-32 Zen Agratto 9.000 BTUs Frio 220V',
    brand: 'Agratto',
    capacityBTU: 9000,
    technology: 'Inverter',
    cycle: 'Frio',
    category: 'Split Hi Wall',
    price: 1990.00,
    originalPrice: 2300.00,
    image: agrattoImg,
    gallery: [agrattoImg],
    description: 'Design moderno com excelente custo-benefício. O Agratto Zen possui condensadora cilíndrica vertical com serpentina de cobre para maior durabilidade e proteção.',
    features: [
      'Tubos de cobre para alta durabilidade',
      'Condensadora cilíndrica vertical (Barril)',
      'Excelente relação custo x benefício',
      'Filtro antibacteriano lavável'
    ],
    specs: {
      'Capacidade de Refrigeração': '9.000 BTU/h',
      'Ciclo': 'Frio',
      'Tecnologia': 'Inverter',
      'Classificação Energética': 'A (Inmetro)',
      'Gás Refrigerante': 'R-32'
    },
    rating: 4.5,
    reviewsCount: 29,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'electrolux-12k-split',
    name: 'Ar Condicionado Split Hi Wall Inverter R-32 Electrolux Color Adapt Wi-Fi 12.000 BTUs Frio 220V',
    brand: 'Electrolux',
    capacityBTU: 12000,
    technology: 'Inverter',
    cycle: 'Frio',
    category: 'Split Hi Wall',
    price: 2489.90,
    originalPrice: 2890.00,
    image: electroluxImg,
    gallery: [electroluxImg],
    description: 'O Ar Condicionado Split HW Inverter Electrolux de 12.000 BTUs combina alta performance com até 70% de economia de energia. Equipado com tecnologia Inverter inteligente, ele mantém a temperatura estável e conta com um sistema de filtragem tripla para eliminar até 99% das impurezas do ar com sua condensadora cilíndrica.',
    features: [
      'Tecnologia Inverter: até 70% mais econômico',
      'Condensadora cilíndrica vertical (Barril)',
      'Gás Ecológico R32 (não agride a camada de ozônio)',
      'Função Auto-Limpeza integrada',
      'Super silencioso: apenas 19 dB no modo sono'
    ],
    specs: {
      'Capacidade de Refrigeração': '12.000 BTU/h',
      'Ciclo': 'Frio',
      'Tecnologia': 'Inverter',
      'Classificação Energética': 'A (Inmetro)',
      'Gás Refrigerante': 'R-32',
      'Garantia': '1 ano de garantia'
    },
    rating: 4.8,
    reviewsCount: 48,
    procelBadge: 'Selo Procel A'
  },
  {
    id: 'lg-multi-split-24k',
    name: 'Ar Condicionado Multi Split LG Inverter 24.000 BTUs Bi-Split (2x 12k) Quente e Frio 220V',
    brand: 'LG',
    capacityBTU: 24000,
    technology: 'Dual Inverter',
    cycle: 'Quente e Frio',
    category: 'Multi Split',
    price: 8990.00,
    originalPrice: 9990.00,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    gallery: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'],
    description: 'Climatize 2 ambientes independentes com apenas 1 condensadora externa. Ideal para apartamentos com espaço reduzido na varanda técnica.',
    features: [
      'Apenas 1 unidade externa para 2 evaporadoras',
      'Controle individual de temperatura em cada quarto',
      'Economia de espaço físico na varanda',
      'Tecnologia LG Dual Inverter'
    ],
    specs: {
      'Capacidade da Condensadora': '24.000 BTU/h',
      'Configuração': 'Bi-Split (2 Unidades 12.000 BTUs)',
      'Ciclo': 'Quente e Frio',
      'Tecnologia': 'Inverter'
    },
    rating: 4.9,
    reviewsCount: 16,
    procelBadge: 'Selo Procel A'
  },
  ...generateFullCatalog()
].map((product: Product) => {
  const area = getRecommendedArea(product.capacityBTU);
  product = {
    ...product,
    warranty: '1 ano de garantia',
    recommendedArea: area,
    description: product.description.replace(/até\s+\d+\s*m[²2]/gi, area),
    features: product.features.map(text => text.replace(/até\s+\d+\s*m[²2]/gi, area)),
    specs: Object.fromEntries(Object.entries(product.specs).map(([key, value]) => [key,
      /garantia/i.test(key) ? '1 ano de garantia' : /área|area/i.test(key) ? area : value
    ])),
  };

  if (product.brand === 'LG' && product.category === 'Split Hi Wall') {
    return applyWarrantyPolicy(applyProductPhoto(product));
  }

  const removeDual = (text: string) => text.replace(/\bdual\s+/gi, '');
  return applyWarrantyPolicy(applyProductPhoto({
    ...product,
    name: removeDual(product.name),
    technology: product.technology === 'Dual Inverter' ? 'Inverter' : product.technology,
    description: removeDual(product.description),
    features: product.features.map(removeDual),
    specs: Object.fromEntries(Object.entries(product.specs).map(([key, value]) => [key, removeDual(value)])),
    ...(product.warranty ? { warranty: removeDual(product.warranty) } : {}),
  }));
});

export const MOCK_CEPS: { [key: string]: { logradouro: string; bairro: string; cidade: string; uf: string } } = {
  '01311-000': { logradouro: 'Avenida Paulista', bairro: 'Bela Vista', cidade: 'São Paulo', uf: 'SP' },
  '70070-600': { logradouro: 'SBS Quadra 4', bairro: 'Asa Sul', cidade: 'Brasília', uf: 'DF' },
  '22021-001': { logradouro: 'Avenida Atlântica', bairro: 'Copacabana', cidade: 'Rio de Janeiro', uf: 'RJ' },
  '30140-061': { logradouro: 'Rua da Bahia', bairro: 'Centro', cidade: 'Belo Horizonte', uf: 'MG' },
  '80010-000': { logradouro: 'Rua XV de Novembro', bairro: 'Centro', cidade: 'Curitiba', uf: 'PR' },
  '90010-000': { logradouro: 'Rua dos Andradas', bairro: 'Centro', cidade: 'Porto Alegre', uf: 'RS' },
  '40020-000': { logradouro: 'Rua Chile', bairro: 'Centro', cidade: 'Salvador', uf: 'BA' }
};

export function getAddressByCep(cep: string) {
  const formattedCep = cep.replace(/\D/g, '');
  const dashFormatted = formattedCep.slice(0, 5) + '-' + formattedCep.slice(5);
  
  if (MOCK_CEPS[dashFormatted]) {
    return MOCK_CEPS[dashFormatted];
  }
  if (MOCK_CEPS[cep]) {
    return MOCK_CEPS[cep];
  }
  
  if (formattedCep.length === 8) {
    return {
      logradouro: 'Rua das Flores, ' + (parseInt(formattedCep.slice(4)) % 500 + 10),
      bairro: 'Jardim Primavera',
      cidade: formattedCep.startsWith('0') ? 'São Paulo' : formattedCep.startsWith('7') ? 'Brasília' : 'Belo Horizonte',
      uf: formattedCep.startsWith('0') ? 'SP' : formattedCep.startsWith('7') ? 'DF' : 'MG'
    };
  }
  return null;
}

import { Product } from './types';

// Product photos retrieved from Leveros and CentralAr. Match by model line and variant.
const photos = [
  {
    "id": "midea-9k-airvolution",
    "page": "https://www.leveros.com.br/ar-condicionado-split-hw-inverter-midea-ai-airvolution-9-000-btus-r-32-so-frio-220v",
    "imageURL": "https://www.leveros.com.br/upload/produto/imagem/m_ar-condicionado-split-hw-inverter-midea-ai-airvolution-9-000-btus-r-32-so-frio-220v-69003.jpg",
    "image": "fotos/midea-9k-airvolution.jpg",
    "sourceTitle": "Ar-Condicionado Split HW Inverter Midea AI AirVolution 9.000 BTUs R-32 Só Frio 220V",
    "bytes": 57709,
    "brand": "Midea",
    "series": "AirVolution",
    "capacityBTU": 9000,
    "cycle": "Frio",
    "technology": "Inverter",
    "category": "Split Hi Wall"
  },
  {
    "id": "midea-12k-airvolution",
    "page": "https://www.leveros.com.br/ar-condicionado-split-hw-inverter-midea-ai-airvolution-12-000-btus-r-32-so-frio-220v",
    "imageURL": "https://www.leveros.com.br/upload/produto/imagem/m_ar-condicionado-split-hw-inverter-midea-ai-airvolution-12-000-btus-r-32-so-frio-220v-69061.jpg",
    "image": "fotos/midea-12k-airvolution.jpg",
    "sourceTitle": "Ar-Condicionado Split HW Inverter Midea AI AirVolution 12.000 BTUs R-32 Só Frio 220V",
    "bytes": 57654,
    "brand": "Midea",
    "series": "AirVolution",
    "capacityBTU": 12000,
    "cycle": "Frio",
    "technology": "Inverter",
    "category": "Split Hi Wall"
  },
  {
    "id": "lg-dual-inverter-12k",
    "page": "https://www.centralar.com.br/p/ar-condicionado-split-hw-inverter-lg-dual-voice-ia-12000-btus-frio-220v-bifasico-s3-q12ja31k",
    "imageURL": "https://cdn2.centralar.com.br/centralar/mds/produtos/lg/inverter/3336/1000x1000/ar-condicionado-voice-lg-220v-S4NQ12JA314_01.jpg",
    "image": "fotos/lg-dual-inverter-12k.jpg",
    "sourceTitle": "Ar Condicionado Split Hi Wall - Inverter R-32 - LG - Dual Inverter Voice + IA - 12.000 BTUs - Frio - 220V",
    "bytes": 108760,
    "brand": "LG",
    "series": "Dual Inverter Voice",
    "capacityBTU": 12000,
    "cycle": "Frio",
    "technology": "Dual Inverter",
    "category": "Split Hi Wall"
  },
  {
    "id": "lg-dual-inverter-18k-qf",
    "page": "https://www.leveros.com.br/ar-condicionado-split-hw-lg-dual-inverter-voice-18-000-btus-r-32-quentefrio-220v-2",
    "imageURL": "https://www.leveros.com.br/upload/produto/imagem/m_ar-condicionado-split-hw-lg-dual-inverter-voice-18-000-btus-r-32-quente-frio-220v.jpg",
    "image": "fotos/lg-dual-inverter-18k-qf.jpg",
    "sourceTitle": "Ar-Condicionado Split HW LG Dual Inverter Voice 18.000 BTUs R-32 Quente/Frio 220V",
    "bytes": 69874,
    "brand": "LG",
    "series": "Dual Inverter Voice",
    "capacityBTU": 18000,
    "cycle": "Quente e Frio",
    "technology": "Dual Inverter",
    "category": "Split Hi Wall"
  },
  {
    "id": "samsung-windfree-12k",
    "page": "https://outlet.centralar.com.br/p/ar-condicionado-split-inverter-windfree-connect-samsung-12000-btus-frio-220v-monofasico-ar12cvfamwknaz-outlet-8263.html",
    "imageURL": "https://cdn2.centralar.com.br/centralar/mds/produtos/samsung/inverter/3179%20-%203180%20-%203181%20HW%20WindFree%20Connect%20FR%20linha%2023_24/3180/1000x1000/conjunto.jpg",
    "image": "fotos/samsung-windfree-12k.jpg",
    "sourceTitle": "Ar Condicionado Split Inverter Windfree Connect Samsung 12000 Btus Frio 220V Monofásico AR12CVFAMWKNAZ - OUTLET",
    "bytes": 153272,
    "brand": "Samsung",
    "series": "WindFree Connect",
    "capacityBTU": 12000,
    "cycle": "Frio",
    "technology": "Inverter",
    "category": "Split Hi Wall"
  },
  {
    "id": "gree-9k-split",
    "page": "https://outlet.centralar.com.br/p/ar-condicionado-split-hi-wall-inverter-r-32-g-classic-gree-9000-btus-frio-220v-monofasico-gwc09ata-d6dna2c-i-outlet",
    "imageURL": "https://castaticstorage.blob.core.windows.net/centralar/mds/produtos/gree/inverter/10076/1000%20x%201000/ar-condicionado-gree-split-inverter.jpg",
    "image": "fotos/gree-9k-split.jpg",
    "sourceTitle": "Ar Condicionado Split Hi Wall - Inverter R-32 - G-classic - Gree - 9.000 BTUs - Frio - 220V Monofásico OUTLET",
    "bytes": 270312,
    "brand": "Gree",
    "series": "G-Classic",
    "capacityBTU": 9000,
    "cycle": "Frio",
    "technology": "Inverter",
    "category": "Split Hi Wall"
  },
  {
    "id": "daikin-12k-r32",
    "page": "https://www.leveros.com.br/ar-condicionado-split-hw-r-32-inverter-daikin-ecoswing-12-000-btus-so-frio-220v",
    "imageURL": "https://www.leveros.com.br/upload/produto/imagem/m_ar-condicionado-split-hw-r-32-inverter-daikin-ecoswing-12-000-btus-s-frio-220v.jpg",
    "image": "fotos/daikin-12k-r32.jpg",
    "sourceTitle": "Ar-Condicionado Split HW R-32 Inverter Daikin Ecoswing 12.000 BTUs Só Frio 220V",
    "bytes": 63068,
    "brand": "Daikin",
    "series": "R-32 Eco Inverter",
    "capacityBTU": 12000,
    "cycle": "Frio",
    "technology": "Inverter",
    "category": "Split Hi Wall"
  },
  {
    "id": "fujitsu-12k-airstage",
    "page": "https://www.leveros.com.br/ar-condicionado-split-hw-inverter-airstage-essencial-fujitsu-12-000-btus-r-32-so-frio-220v",
    "imageURL": "https://www.leveros.com.br/upload/produto/imagem/m_ar-condicionado-split-hw-inverter-airstage-essenc-fujitsu-12-000-btus-r-32-so-frio-220v-69843.jpg",
    "image": "fotos/fujitsu-12k-airstage.jpg",
    "sourceTitle": "Ar-Condicionado Split HW Inverter Airstage Essencial Fujitsu 12.000 BTUs R-32 Só Frio 220V",
    "bytes": 134250,
    "brand": "Fujitsu",
    "series": "Airstage Inverter",
    "capacityBTU": 12000,
    "cycle": "Frio",
    "technology": "Inverter",
    "category": "Split Hi Wall"
  },
  {
    "id": "elgin-eco-dream",
    "page": "https://www.leveros.com.br/ar-condicionado-split-hw-elgin-eco-dream-inverter-wi-fi-9-000-btus-r-32-so-frio-220v",
    "imageURL": "https://www.leveros.com.br/upload/produto/imagem/m_ar-condicionado-split-hw-elgin-eco-dream-inverter-wi-fi-9-000-btus-r-32-s-frio-220v.jpg",
    "image": "fotos/elgin-eco-dream.jpg",
    "sourceTitle": "Ar-Condicionado Inverter Split Hi Wall Elgin Eco Dream Wi-Fi 9.000 BTUs R-32 Só Frio 220V",
    "bytes": 59802,
    "brand": "Elgin",
    "series": "Eco Dream",
    "capacityBTU": 9000,
    "cycle": "Frio",
    "technology": "Inverter",
    "category": "Split Hi Wall"
  },
  {
    "id": "elgin-piso-teto-36k",
    "page": "https://www.leveros.com.br/ar-condicionado-split-piso-teto-inverter-eco-r-32-elgin-36-000-btus-so-frio-220v-monofasico",
    "imageURL": "https://www.leveros.com.br/upload/produto/imagem/m_ar-condicionado-split-piso-teto-inverter-eco-r-32-elgin-36-000-btus-s-frio-220v-monof-sico.jpg",
    "image": "fotos/elgin-piso-teto-36k.jpg",
    "sourceTitle": "Ar-Condicionado Split Piso Teto Inverter Eco R-32 Elgin 36.000 BTUs Só Frio 220V Monofásico",
    "bytes": 81838,
    "brand": "Elgin",
    "series": "Eco",
    "capacityBTU": 36000,
    "cycle": "Frio",
    "technology": "Inverter",
    "category": "Piso Teto"
  },
  {
    "id": "agratto-12k-split",
    "page": "https://www.leveros.com.br/ar-condicionado-split-hw-inverter-agratto-zen-9-000-btus-r-32-so-frio-220v",
    "imageURL": "https://www.leveros.com.br/upload/produto/imagem/m_ar-condicionado-split-hw-inverter-agratto-zen-9-000-btus-r-32-so-frio-220v-69200.jpg",
    "image": "fotos/agratto-12k-split.jpg",
    "sourceTitle": "Ar-Condicionado Split HW Inverter Agratto Zen 9.000 BTUs R-32 Só Frio 220V",
    "bytes": 52508,
    "brand": "Agratto",
    "series": "Zen Inverter",
    "capacityBTU": 9000,
    "cycle": "Frio",
    "technology": "Inverter",
    "category": "Split Hi Wall"
  },
  {
    "id": "electrolux-12k-split",
    "page": "https://www.centralar.com.br/p/ar-condicionado-split-hi-wall-inverter-r-32-electrolux-color-adapt-wi-fi-12000-btus-frio-220v-yi12f",
    "imageURL": "https://castaticstorage.blob.core.windows.net/centralar/mds/produtos/electrolux/inverter/3503/1000x1000/conjunto-evap-cond-electrolux.jpg",
    "image": "fotos/electrolux-12k-split.jpg",
    "sourceTitle": "Ar Condicionado Split Hi Wall - Inverter R-32 - Electrolux - Color Adapt  - Wi-fi - 12.000 BTUs - Frio - 220V",
    "bytes": 61418,
    "brand": "Electrolux",
    "series": "Color Adapt",
    "capacityBTU": 12000,
    "cycle": "Frio",
    "technology": "Inverter",
    "category": "Split Hi Wall"
  },
  {
    "id": "lg-multi-split-24k",
    "page": "https://www.leveros.com.br/ar-condicionado-multi-split-inverter-lg-24-000-btus-2x-evap-hw-12-000-quentefrio-220v",
    "imageURL": "https://www.leveros.com.br/upload/produto/imagem/m_ar-condicionado-multi-split-inverter-lg-24-000-btus-2x-evap-hw-12-000-quente-frio-220v.jpg",
    "image": "fotos/lg-multi-split-24k.jpg",
    "sourceTitle": "Ar-Condicionado Multi Split Inverter LG 24.000 BTUs (2x Evap HW 12.000) Quente/Frio 220V",
    "bytes": 83865,
    "brand": "LG",
    "series": "",
    "capacityBTU": 24000,
    "cycle": "Quente e Frio",
    "technology": "Inverter",
    "category": "Multi Split"
  }
];

export function applyProductPhoto(product: Product): Product {
  const photo = photos.find(p => p.id === product.id) || photos.find(p =>
    p.series && product.name.toLowerCase().includes(p.series.toLowerCase()) &&
    p.brand === product.brand && p.category === product.category &&
    p.capacityBTU === product.capacityBTU && p.cycle === product.cycle && p.technology === product.technology);
  const image = photo ? `${import.meta.env.BASE_URL}${photo.image}` : '';
  return {...product, image, gallery: image ? [image] : []};
}

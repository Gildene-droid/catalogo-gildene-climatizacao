import type { Product } from './types';
export function applyVerifiedModel(product: Product): Product {
  if (product.brand !== 'Midea' || product.category !== 'Split Hi Wall' || product.cycle !== 'Frio' || !/AirVolution/i.test(product.name) || ![12000,18000].includes(product.capacityBTU)) return product;
  const size = product.capacityBTU === 12000 ? '12' : '18';
  const evaporator = `42EFVCA${size}M5`, condenser = `38TAVCA${size}M5`;
  const source = `https://www.leveros.com.br/ar-condicionado-split-hw-inverter-midea-ai-airvolution-${size}-000-btus-r-32-so-frio-220v`;
  const warranty = 'Até 2 anos no aparelho, conforme condições de instalação';
  return {...product,
    name: `Ar Condicionado Midea AI AirVolution Inverter ${product.capacityBTU.toLocaleString('pt-BR')} BTUs Frio 220V — ${evaporator}`,
    technology: 'Inverter', sku: `${evaporator} / ${condenser}`, warranty, warrantySource: source,
    warrantyDetails: '3 meses legais mais 21 meses contratuais, com instalação por empresa credenciada ou técnico certificado Midea Carrier, uso conforme manual e nota fiscal. Prazo adicional específico do compressor não confirmado nesta ficha. Consulta em 09/10/2026.',
    description: 'Split Hi Wall Midea AI AirVolution Inverter, ciclo Frio, 220V, fluido R-32 e conectividade Wi-Fi. Consulte disponibilidade, preço e dimensionamento antes de comprar.',
    features: ['Tecnologia Inverter', 'Fluido R-32', 'Conectividade Wi-Fi', 'Garantia condicionada à instalação e ao certificado'],
    specs: {'Evaporadora':evaporator,'Condensadora':condenser,'Capacidade':`${product.capacityBTU.toLocaleString('pt-BR')} BTU/h`,'Ciclo':'Frio','Tensão':'220V','Fluido refrigerante':'R-32','Garantia do aparelho':warranty,'Garantia adicional do compressor':'Confirmar com o consultor de vendas'},
    energyConsumption:undefined, hasWifi:true, rating:0, reviewsCount:0,
  };
}

import React, { useEffect } from 'react';
import { Product } from '../types';

interface SeoHeadProps {
  title?: string;
  description?: string;
  product?: Product | null;
  pageType?: 'home' | 'catalog' | 'detail' | 'brand' | 'guide' | 'calc';
  brandName?: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = 'GouveClima | Ar Condicionado, Climatização e Soluções Inverter',
  description = 'Especialista em vendas e soluções de ar condicionado Inverter, Split Hi Wall, Cassete, Piso Teto e VRF. As melhores marcas com preços de fábrica e atendimento via WhatsApp.',
  product,
  pageType = 'home',
  brandName,
}) => {
  useEffect(() => {
    // Dynamic document title update
    let dynamicTitle = title;
    if (pageType === 'detail' && product) {
      dynamicTitle = `${product.name} | GouveClima`;
    } else if (pageType === 'brand' && brandName) {
      dynamicTitle = `Ar Condicionado ${brandName} Inverter - Catálogo e Preços | GouveClima`;
    } else if (pageType === 'guide') {
      dynamicTitle = 'Guia Definitivo de Compra de Ar Condicionado 2026 | GouveClima';
    } else if (pageType === 'calc') {
      dynamicTitle = 'Calculadora de BTUs Grátis para Ar Condicionado | GouveClima';
    }

    document.title = dynamicTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', product ? product.description : description);
  }, [title, description, product, pageType, brandName]);

  // Generate Organization & WebSite JSON-LD
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    'name': 'GouveClima',
    'alternateName': 'GouveClima Ar Condicionado',
    'url': 'https://gildene-droid.github.io/catalogo-gildene-climatizacao/',
    'telephone': '+55-61-99999-9999',
    'priceRange': '$$$',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Brasília',
      'addressRegion': 'DF',
      'addressCountry': 'BR'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'opens': '08:00',
      'closes': '18:00'
    },
    'sameAs': [
      'https://wa.me/message/MIJAF4C4WX2EN1'
    ]
  };

  const productSchema = product
    ? {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        'name': product.name,
        'image': [product.image],
        'description': product.description,
        'sku': product.id,
        'brand': {
          '@type': 'Brand',
          'name': product.brand
        },
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'BRL',
          'price': product.price,
          'itemCondition': 'https://schema.org/NewCondition',
          'availability': 'https://schema.org/InStock',
          'seller': {
            '@type': 'Organization',
            'name': 'GouveClima'
          }
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': product.rating,
          'reviewCount': product.reviewsCount
        }
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyClean(organizationSchema) }}
      />
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stringifyClean(productSchema) }}
        />
      )}
    </>
  );
};

function stringifyClean(obj: any) {
  return JSON.stringify(obj, null, 2);
}

export default SeoHead;

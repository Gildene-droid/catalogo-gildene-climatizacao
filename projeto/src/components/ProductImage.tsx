import React, { useState } from 'react';
import { Wind } from 'lucide-react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({src, alt, className = '', containerClassName = ''}) => {
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const usable = src && !src.includes('images.unsplash.com') && failedSrc !== src;
  return (
    <div className={`w-full h-full min-h-[160px] bg-white rounded-xl flex items-center justify-center p-3 ${containerClassName}`}>
      {usable ? (
        <img key={src} src={src} alt={alt} loading="lazy" decoding="async"
          className={`w-full h-full max-h-full ${className}`}
          style={{objectFit: 'contain', objectPosition: 'center'}}
          onError={() => setFailedSrc(src)} />
      ) : (
        <div className="flex flex-col items-center text-center text-slate-500">
          <Wind className="w-8 h-8 text-sky-500 mb-2" aria-hidden="true" />
          <span className="text-xs font-semibold">Foto em atualização</span>
        </div>
      )}
    </div>
  );
};

export default ProductImage;

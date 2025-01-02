import React from 'react';
import { usePrice } from '../../hooks/usePrice';

interface Props {
  productId: string;
  className?: string;
}

export default function PriceDisplay({ productId, className = '' }: Props) {
  const { price, discount, finalPrice, loading } = usePrice(productId);

  if (loading || !price) return null;

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">
          ${finalPrice?.toFixed(2)}
        </span>
        {discount > 0 && (
          <span className="text-sm text-gray-500 line-through">
            ${price.toFixed(2)}
          </span>
        )}
      </div>
      {discount > 0 && (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
          {discount}% OFF
        </span>
      )}
    </div>
  );
}
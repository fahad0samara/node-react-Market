import React from 'react';
import { Tag } from 'lucide-react';
import useDynamicPricing from '../hooks/useDynamicPricing';

interface Props {
  productId: string;
  originalPrice: number;
  className?: string;
}

export default function DynamicPrice({ productId, originalPrice, className = '' }: Props) {
  const { prices, loading, fetchPrice, calculateDiscount } = useDynamicPricing();

  React.useEffect(() => {
    fetchPrice(productId);
  }, [productId]);

  const currentPrice = prices[productId] || originalPrice;
  const discount = calculateDiscount(originalPrice, currentPrice);

  if (loading) {
    return <div className="animate-pulse h-6 w-24 bg-gray-200 rounded" />;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-2xl font-bold">${currentPrice.toFixed(2)}</span>
      {discount > 0 && (
        <>
          <span className="text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
          <span className="flex items-center gap-1 text-green-500">
            <Tag className="w-4 h-4" />
            {discount}% OFF
          </span>
        </>
      )}
    </div>
  );
}
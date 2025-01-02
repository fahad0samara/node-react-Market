import React from 'react';
import { useStock } from '../../hooks/useStock';

interface Props {
  productId: string;
  className?: string;
}

export default function StockBadge({ productId, className = '' }: Props) {
  const { isInStock, isLowStock, loading } = useStock(productId);

  if (loading) return null;

  return (
    <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${className} ${
      !isInStock ? 'bg-red-100 text-red-800' :
      isLowStock ? 'bg-yellow-100 text-yellow-800' :
      'bg-green-100 text-green-800'
    }`}>
      {!isInStock ? 'Out of Stock' :
       isLowStock ? 'Low Stock' :
       'In Stock'}
    </div>
  );
}
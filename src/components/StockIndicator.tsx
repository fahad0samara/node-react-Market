import React from 'react';
import { AlertTriangle } from 'lucide-react';
import useInventory from '../hooks/useInventory';

interface Props {
  productId: string;
  className?: string;
}

export default function StockIndicator({ productId, className = '' }: Props) {
  const { stockLevels, isLowStock, fetchStockLevel } = useInventory();

  React.useEffect(() => {
    fetchStockLevel(productId);
  }, [productId]);

  const stockLevel = stockLevels[productId] || 0;
  const lowStock = isLowStock(productId);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {stockLevel > 0 ? (
        <>
          <span className={`h-2 w-2 rounded-full ${
            lowStock ? 'bg-yellow-400' : 'bg-green-400'
          }`} />
          <span className={lowStock ? 'text-yellow-600' : 'text-green-600'}>
            {lowStock ? 'Low Stock' : 'In Stock'}
          </span>
          {lowStock && (
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          )}
        </>
      ) : (
        <>
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="text-red-600">Out of Stock</span>
        </>
      )}
    </div>
  );
}
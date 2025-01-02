import React from 'react';
import { Check, X } from 'lucide-react';
import useCompare from '../hooks/useCompare';

export default function ProductComparison() {
  const { items } = useCompare();

  const features = [
    'Brand',
    'Price',
    'Rating',
    'Stock',
    'Free Shipping',
    'Warranty',
    ...new Set(items.flatMap(item => 
      item.specifications?.map(spec => spec.name) || []
    ))
  ];

  const getValue = (product, feature) => {
    switch (feature) {
      case 'Brand':
        return product.brand;
      case 'Price':
        return `$${product.price}`;
      case 'Rating':
        return `${product.rating}/5`;
      case 'Stock':
        return product.countInStock > 0 ? 'In Stock' : 'Out of Stock';
      case 'Free Shipping':
        return product.shipping?.freeShipping ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />;
      case 'Warranty':
        return product.warranty?.available ? product.warranty.duration : 'No warranty';
      default:
        const spec = product.specifications?.find(s => s.name === feature);
        return spec?.value || '-';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 border bg-gray-50"></th>
            {items.map(product => (
              <th key={product._id} className="p-4 border bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover mx-auto rounded-lg"
                />
                <h3 className="mt-2 font-medium">{product.name}</h3>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map(feature => (
            <tr key={feature}>
              <td className="p-4 border font-medium bg-gray-50">{feature}</td>
              {items.map(product => (
                <td key={product._id} className="p-4 border text-center">
                  {getValue(product, feature)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import React from 'react';
import { BarChart, Star, ShoppingBag, Eye } from 'lucide-react';

interface Props {
  productId: string;
  views: number;
  purchases: number;
  rating: number;
  numReviews: number;
}

export default function ProductMetrics({ productId, views, purchases, rating, numReviews }: Props) {
  const conversionRate = ((purchases / views) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 text-blue-500 mb-2">
          <Eye className="w-5 h-5" />
          <span className="font-medium">Views</span>
        </div>
        <p className="text-2xl font-bold">{views.toLocaleString()}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 text-green-500 mb-2">
          <ShoppingBag className="w-5 h-5" />
          <span className="font-medium">Purchases</span>
        </div>
        <p className="text-2xl font-bold">{purchases.toLocaleString()}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 text-yellow-500 mb-2">
          <Star className="w-5 h-5" />
          <span className="font-medium">Rating</span>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-2xl font-bold">{rating.toFixed(1)}</p>
          <p className="text-gray-500">({numReviews} reviews)</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 text-purple-500 mb-2">
          <BarChart className="w-5 h-5" />
          <span className="font-medium">Conversion</span>
        </div>
        <p className="text-2xl font-bold">{conversionRate}%</p>
      </div>
    </div>
  );
}
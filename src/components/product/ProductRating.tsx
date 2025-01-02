import React from 'react';
import { Star } from 'lucide-react';

interface Props {
  rating: number;
  reviews?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export default function ProductRating({ 
  rating, 
  reviews, 
  size = 'md',
  showCount = true 
}: Props) {
  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSizes[size]} ${
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
      {showCount && reviews !== undefined && (
        <span className={`${textSizes[size]} text-gray-600 ml-2`}>
          ({reviews})
        </span>
      )}
    </div>
  );
}
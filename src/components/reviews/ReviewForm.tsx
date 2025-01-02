import { useState } from 'react';
import Rating from './Rating';
import Button from '../ui/Button';

interface Props {
  onSubmit: (data: { rating: number; comment: string }) => void;
  loading?: boolean;
}

export default function ReviewForm({ onSubmit, loading }: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, comment });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <Rating value={rating} onChange={setRating} size="lg" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Review
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border rounded-md focus:ring-orange-500 focus:border-orange-500"
          rows={4}
          placeholder="Share your experience with this product..."
          required
        />
      </div>

      <Button type="submit" loading={loading}>
        Submit Review
      </Button>
    </form>
  );
}
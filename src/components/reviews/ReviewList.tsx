import { formatDistanceToNow } from 'date-fns';
import Rating from './Rating';
import { ThumbsUp } from 'lucide-react';

interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

interface Props {
  reviews: Review[];
  onHelpful: (reviewId: string) => void;
}

export default function ReviewList({ reviews, onHelpful }: Props) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {review.user.avatar ? (
                <img
                  src={review.user.avatar}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-600">
                    {review.user.name[0]}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium">{review.user.name}</p>
                <Rating value={review.rating} readonly size="sm" />
              </div>
            </div>
            <button
              onClick={() => onHelpful(review.id)}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{review.helpful}</span>
            </button>
          </div>
          <p className="text-gray-600">{review.comment}</p>
          <p className="text-sm text-gray-500 mt-2">
            {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
          </p>
        </div>
      ))}
    </div>
  );
}
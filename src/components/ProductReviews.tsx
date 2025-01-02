import React from 'react';
import { Star, ThumbsUp, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface Review {
  _id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  helpful: number;
  images?: string[];
  createdAt: string;
}

interface Props {
  reviews: Review[];
  onHelpful: (reviewId: string) => void;
}

export default function ProductReviews({ reviews, onHelpful }: Props) {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <motion.div
          key={review._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {review.user.avatar ? (
                <img
                  src={review.user.avatar}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-600">
                    {review.user.name[0]}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium">{review.user.name}</p>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-sm text-gray-500">
                    {format(new Date(review.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => onHelpful(review._id)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{review.helpful}</span>
            </button>
          </div>

          <p className="text-gray-600 mb-4">{review.comment}</p>

          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mb-4">
              {review.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className="relative group"
                >
                  <img
                    src={image}
                    alt={`Review ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      ))}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Review"
            className="max-w-3xl max-h-[80vh] object-contain"
          />
        </div>
      )}
    </div>
  );
}
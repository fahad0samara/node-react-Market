import React from 'react';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import useCartStore from '../../store/cartStore';
import useWishlist from '../../hooks/useWishlist';
import toast from 'react-hot-toast';

interface Props {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    rating: number;
    numReviews: number;
    countInStock: number;
    category: string;
  };
}

export default function ProductInfo({ product }: Props) {
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleAddToCart = () => {
    if (product.countInStock > 0) {
      addToCart(product);
      toast.success('Added to cart!');
    }
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.success('Added to wishlist!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-sm text-gray-600">
              ({product.numReviews} reviews)
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleAddToWishlist}
            className={`p-2 rounded-full ${
              isInWishlist(product._id)
                ? 'bg-red-50 text-red-500'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="text-2xl font-bold text-gray-900">
        ${product.price.toFixed(2)}
      </div>

      <p className="text-gray-600">{product.description}</p>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Category: <span className="font-medium">{product.category}</span>
        </p>
        <p className="text-sm text-gray-600">
          Availability: 
          <span className={`font-medium ${
            product.countInStock > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.countInStock > 0 ? ' In Stock' : ' Out of Stock'}
          </span>
        </p>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        disabled={product.countInStock === 0}
        className={`w-full py-3 px-8 flex items-center justify-center gap-2 rounded-md text-white font-medium
          ${
            product.countInStock > 0
              ? 'bg-orange-500 hover:bg-orange-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
      >
        <ShoppingCart className="w-5 h-5" />
        {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </motion.button>
    </div>
  );
}
import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    numReviews: number;
    countInStock: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

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

  const handleAddToCart = () => {
    if (product.countInStock > 0) {
      addItem(product);
      toast.success('Added to cart!');
    } else {
      toast.error('Product is out of stock');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden group"
    >
      <div className="relative">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <button
          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          onClick={() => toast.success('Added to wishlist!')}
        >
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>
      
      <div className="p-4">
        <Link 
          to={`/products/${product._id}`}
          className="text-lg font-medium text-gray-900 hover:text-orange-500 line-clamp-2"
        >
          {product.name}
        </Link>
        
        <div className="flex items-center mt-2">
          {renderStars(product.rating)}
          <span className="ml-2 text-sm text-gray-600">
            ({product.numReviews})
          </span>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.countInStock > 0 ? (
            <span className="text-sm text-green-600">In Stock</span>
          ) : (
            <span className="text-sm text-red-600">Out of Stock</span>
          )}
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={product.countInStock === 0}
          className={`mt-3 w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-all duration-200
            ${product.countInStock > 0
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </motion.div>
  );
}
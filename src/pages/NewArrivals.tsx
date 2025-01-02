import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useAxiosPrivate } from '../hooks/useAxiosPrivate';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  createdAt: string;
}

export default function NewArrivals() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sortBy, setSortBy] = React.useState('newest');
  const axiosPrivate = useAxiosPrivate();

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPrivate.get('/products/new-arrivals', {
          params: { sort: sortBy }
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sparkles className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl font-bold">New Arrivals</h1>
        </div>

        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative">
              <ProductCard product={product} />
              <div className="absolute top-2 left-2">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  New
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No new arrivals found</p>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { useAxiosPrivate } from '../hooks/useAxiosPrivate';

export default function RecentlyViewed() {
  const [products, setProducts] = React.useState([]);
  const axiosPrivate = useAxiosPrivate();

  React.useEffect(() => {
    const viewedProducts = JSON.parse(localStorage.getItem('viewedProducts') || '[]');
    
    if (viewedProducts.length > 0) {
      const fetchProducts = async () => {
        try {
          const response = await axiosPrivate.post('/products/batch', {
            ids: viewedProducts
          });
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching recently viewed products:', error);
        }
      };

      fetchProducts();
    }
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-semibold">Recently Viewed</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
import React from 'react';
import { PackageSearch } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { useAxiosPrivate } from '../hooks/useAxiosPrivate';

interface Props {
  productId: string;
  category: string;
}

export default function RelatedProducts({ productId, category }: Props) {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const axiosPrivate = useAxiosPrivate();

  React.useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axiosPrivate.get(`/products/related`, {
          params: { productId, category }
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching related products:', error);
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [productId, category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <PackageSearch className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-semibold">Related Products</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
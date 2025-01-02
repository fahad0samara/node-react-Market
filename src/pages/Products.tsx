import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAxiosPrivate } from '../hooks/useAxiosPrivate';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  numReviews: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const axiosPrivate = useAxiosPrivate();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPrivate.get('/products', {
          params: { search, category, minPrice, maxPrice }
        });
        setProducts(response.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(response.data.map((p: Product) => p.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, minPrice, maxPrice]);

  const updateFilter = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }
    setSearchParams(current);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <select
                  value={category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                    className="w-1/2 p-2 border rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    className="w-1/2 p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
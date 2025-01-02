import React from 'react';
import { useParams } from 'react-router-dom';
import { useAxiosPrivate } from '../hooks/useAxiosPrivate';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductSpecifications from '../components/product/ProductSpecifications';
import ProductWarranty from '../components/product/ProductWarranty';
import DeliveryInfo from '../components/product/DeliveryInfo';
import SizeGuide from '../components/product/SizeGuide';
import ProductCustomization from '../components/product/ProductCustomization';
import BulkOrderForm from '../components/product/BulkOrderForm';
import ProductReviews from '../components/ProductReviews';
import ProductMetrics from '../components/ProductMetrics';
import RelatedProducts from '../components/RelatedProducts';
import { trackProductView } from '../utils/analytics';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  specifications: Array<{ name: string; value: string }>;
  reviews: any[];
  metrics: {
    views: number;
    purchases: number;
  };
  warranty: {
    available: boolean;
    duration: string;
    description: string;
  };
  shipping: {
    freeShipping: boolean;
    estimatedDays: number;
    availableLocations: string[];
  };
  sizes?: Array<{
    name: string;
    chest: string;
    waist: string;
    hips: string;
  }>;
  customization?: {
    options: Array<{
      type: 'color' | 'text' | 'image';
      name: string;
      options?: string[];
      maxLength?: number;
      maxSize?: number;
    }>;
  };
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [customizations, setCustomizations] = React.useState<Record<string, string>>({});
  const axiosPrivate = useAxiosPrivate();

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosPrivate.get(`/products/${id}`);
        setProduct(response.data);
        trackProductView(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleHelpfulReview = async (reviewId: string) => {
    try {
      await axiosPrivate.post(`/products/${id}/reviews/${reviewId}/helpful`);
      const response = await axiosPrivate.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error marking review as helpful:', error);
    }
  };

  const handleCustomizationChange = (values: Record<string, string>) => {
    setCustomizations(values);
  };

  const handleBulkOrder = async (quantity: number) => {
    try {
      await axiosPrivate.post(`/products/${id}/bulk-order`, {
        quantity,
        customizations
      });
      toast.success('Bulk order request submitted successfully');
    } catch (error) {
      toast.error('Failed to submit bulk order request');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <ProductGallery
            images={product.images.length > 0 ? product.images : [product.image]}
            mainImage={product.image}
          />
          {product.sizes && (
            <div className="text-center">
              <SizeGuide sizes={product.sizes} category={product.category} />
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <ProductInfo product={product} />
          
          {product.customization?.options && (
            <ProductCustomization
              options={product.customization.options}
              onCustomizationChange={handleCustomizationChange}
            />
          )}

          <ProductWarranty warranty={product.warranty} />
          <DeliveryInfo shipping={product.shipping} />
          
          <BulkOrderForm
            price={product.price}
            onSubmit={handleBulkOrder}
          />
        </div>
      </div>

      <div className="space-y-12">
        <ProductMetrics
          productId={product._id}
          views={product.metrics.views}
          purchases={product.metrics.purchases}
          rating={product.rating}
          numReviews={product.numReviews}
        />

        <ProductSpecifications specifications={product.specifications} />

        <ProductReviews
          reviews={product.reviews}
          onHelpful={handleHelpfulReview}
        />

        <RelatedProducts
          productId={product._id}
          category={product.category}
        />
      </div>
    </div>
  );
}
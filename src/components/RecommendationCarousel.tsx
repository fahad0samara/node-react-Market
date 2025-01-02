import React from 'react';
import { Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';
import useRecommendations from '../hooks/useRecommendations';
import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  userId?: string;
  productId?: string;
  title?: string;
}

export default function RecommendationCarousel({ userId, productId, title = 'Recommended for You' }: Props) {
  const { recommendations, loading, fetchRecommendations, fetchSimilarProducts, fetchPersonalized } = useRecommendations();

  React.useEffect(() => {
    if (userId) {
      fetchRecommendations(userId);
    } else if (productId) {
      fetchSimilarProducts(productId);
    } else {
      fetchPersonalized();
    }
  }, [userId, productId]);

  if (loading || recommendations.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {recommendations.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
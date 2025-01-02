import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Tag, TrendingUp } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import ProductCard from '../components/ProductCard';
import { useAxiosPrivate } from '../hooks/useAxiosPrivate';

interface Deal {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  discountPercentage: number;
  endsAt: string;
  rating: number;
  numReviews: number;
  countInStock: number;
}

export default function Deals() {
  const [flashDeals, setFlashDeals] = React.useState<Deal[]>([]);
  const [weeklyDeals, setWeeklyDeals] = React.useState<Deal[]>([]);
  const [clearance, setClearance] = React.useState<Deal[]>([]);
  const [loading, setLoading] = React.useState(true);
  const axiosPrivate = useAxiosPrivate();

  React.useEffect(() => {
    const fetchDeals = async () => {
      try {
        const [flashResponse, weeklyResponse, clearanceResponse] = await Promise.all([
          axiosPrivate.get('/products/deals/flash'),
          axiosPrivate.get('/products/deals/weekly'),
          axiosPrivate.get('/products/deals/clearance'),
        ]);

        setFlashDeals(flashResponse.data);
        setWeeklyDeals(weeklyResponse.data);
        setClearance(clearanceResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching deals:', error);
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Flash Deals */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <Timer className="w-8 h-8 text-orange-500" />
          <h2 className="text-2xl font-bold">Flash Deals</h2>
          <div className="ml-auto flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full">
            <span>Ends in:</span>
            <span className="font-mono">04:32:11</span>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Grid]}
          slidesPerView={1}
          grid={{ rows: 1 }}
          spaceBetween={20}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {flashDeals.map((deal) => (
            <SwiperSlide key={deal._id}>
              <ProductCard product={deal} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Weekly Deals */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <Tag className="w-8 h-8 text-orange-500" />
          <h2 className="text-2xl font-bold">Weekly Deals</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {weeklyDeals.map((deal) => (
            <motion.div
              key={deal._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ProductCard product={deal} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Clearance */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <TrendingUp className="w-8 h-8 text-orange-500" />
          <h2 className="text-2xl font-bold">Clearance Sale</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clearance.map((deal) => (
            <motion.div
              key={deal._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ProductCard product={deal} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
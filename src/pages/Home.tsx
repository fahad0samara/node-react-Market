import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, Clock, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    title: 'Wide Selection',
    description: 'Browse through thousands of products',
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Fast Delivery',
    description: 'Get your items delivered quickly',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Secure Shopping',
    description: 'Your transactions are protected',
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: '24/7 Support',
    description: 'We\'re here to help anytime',
  },
];

const deals = [
  {
    id: 1,
    title: 'Premium Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    discount: '30% OFF',
  },
  {
    id: 2,
    title: 'Smart Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    discount: '25% OFF',
  },
  {
    id: 3,
    title: 'Backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    discount: '20% OFF',
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="h-[500px] rounded-2xl overflow-hidden"
      >
        {deals.map((deal) => (
          <SwiperSlide key={deal.id}>
            <div className="relative h-full">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="text-white ml-16 max-w-xl">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold mb-4"
                  >
                    {deal.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl mb-6"
                  >
                    {deal.discount}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-md text-lg font-medium transition-colors"
                    >
                      Shop Now
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200"
          >
            <div className="inline-block p-3 bg-orange-100 rounded-full text-orange-500 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Categories Section */}
      <section className="bg-white rounded-2xl p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books'].map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link
                to={`/products?category=${category}`}
                className="block p-4 text-center rounded-lg bg-gray-50 hover:bg-orange-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-orange-500">
                  {category}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-12 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-6">
            Get updates about new products and special offers!
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-white text-orange-500 rounded-md hover:bg-gray-100 transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
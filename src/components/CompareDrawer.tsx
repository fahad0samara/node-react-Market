import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCompare from '../hooks/useCompare';

export default function CompareDrawer() {
  const { items, removeItem, clearCompare } = useCompare();
  const [isOpen, setIsOpen] = React.useState(false);

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50"
        >
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Compare Products</h3>
              <div className="flex gap-4">
                <button
                  onClick={clearCompare}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map((item) => (
                <div key={item._id} className="relative">
                  <button
                    onClick={() => removeItem(item._id)}
                    className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <p className="mt-2 text-sm font-medium line-clamp-2">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {/* Navigate to compare page */}}
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2"
            >
              Compare Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-orange-600"
        >
          Compare ({items.length})
        </motion.button>
      )}
    </AnimatePresence>
  );
}
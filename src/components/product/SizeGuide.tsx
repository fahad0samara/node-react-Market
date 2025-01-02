import React from 'react';
import { Ruler, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Size {
  name: string;
  chest: string;
  waist: string;
  hips: string;
}

interface Props {
  sizes: Size[];
  category: string;
}

export default function SizeGuide({ sizes, category }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!sizes.length) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <Ruler className="w-4 h-4" />
        Size Guide
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-2xl mx-auto bg-white rounded-lg shadow-xl z-50 p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Size Guide - {category}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">Size</th>
                      <th className="py-2 px-4 text-left">Chest</th>
                      <th className="py-2 px-4 text-left">Waist</th>
                      <th className="py-2 px-4 text-left">Hips</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="py-2 px-4 font-medium">{size.name}</td>
                        <td className="py-2 px-4">{size.chest}</td>
                        <td className="py-2 px-4">{size.waist}</td>
                        <td className="py-2 px-4">{size.hips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                <p>Measurements are in inches. For the best fit, measure yourself and compare to the size guide above.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
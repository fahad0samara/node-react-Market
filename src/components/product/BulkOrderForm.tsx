import React from 'react';
import { Package, Calculator, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  price: number;
  minQuantity?: number;
  onSubmit: (quantity: number) => void;
}

export default function BulkOrderForm({ price, minQuantity = 10, onSubmit }: Props) {
  const [quantity, setQuantity] = React.useState(minQuantity);
  const [showCalculator, setShowCalculator] = React.useState(false);

  const calculateDiscount = (qty: number) => {
    if (qty >= 100) return 0.25; // 25% off for 100+ units
    if (qty >= 50) return 0.15; // 15% off for 50+ units
    if (qty >= 25) return 0.10; // 10% off for 25+ units
    return 0;
  };

  const totalPrice = quantity * price * (1 - calculateDiscount(quantity));
  const savings = quantity * price - totalPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-lg p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <Package className="w-5 h-5 text-orange-500" />
          Bulk Order
        </h3>
        <button
          onClick={() => setShowCalculator(!showCalculator)}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
        >
          <Calculator className="w-4 h-4" />
          {showCalculator ? 'Hide Calculator' : 'Show Calculator'}
        </button>
      </div>

      {showCalculator && (
        <div className="bg-gray-50 p-4 rounded-md space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">25+ units:</span>
              <span className="float-right font-medium">10% off</span>
            </div>
            <div>
              <span className="text-gray-600">50+ units:</span>
              <span className="float-right font-medium">15% off</span>
            </div>
            <div>
              <span className="text-gray-600">100+ units:</span>
              <span className="float-right font-medium">25% off</span>
            </div>
            <div className="col-span-2 flex items-center gap-2 text-green-600">
              <Truck className="w-4 h-4" />
              <span>Free shipping on bulk orders</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity (Minimum {minQuantity} units)
          </label>
          <input
            type="number"
            min={minQuantity}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(minQuantity, parseInt(e.target.value)))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="bg-orange-50 p-3 rounded-md">
          <div className="flex justify-between text-sm mb-1">
            <span>Unit Price:</span>
            <span>${price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Quantity:</span>
            <span>{quantity} units</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Discount:</span>
            <span className="text-green-600">
              {(calculateDiscount(quantity) * 100).toFixed(0)}% off
            </span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Savings:</span>
            <span className="text-green-600">${savings.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium pt-2 border-t">
            <span>Total Price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => onSubmit(quantity)}
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Request Bulk Order
        </button>
      </div>
    </motion.div>
  );
}
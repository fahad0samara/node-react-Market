import React from 'react';
import { formatPrice } from '../../utils/price';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Props {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function OrderSummary({ items, subtotal, shipping, tax, total }: Props) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-grow">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between font-medium text-lg border-t pt-2">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
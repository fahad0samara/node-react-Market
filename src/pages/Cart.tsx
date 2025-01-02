import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';

export default function Cart() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const { user } = useAuthStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to="/products"
          className="inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            
            <div className="flex-grow ml-4">
              <Link
                to={`/products/${item._id}`}
                className="text-lg font-medium hover:text-orange-500"
              >
                {item.name}
              </Link>
              <div className="text-gray-600">${item.price.toFixed(2)}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                className="p-1 hover:text-orange-500"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="p-1 hover:text-orange-500"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="ml-6 text-lg font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              onClick={() => removeItem(item._id)}
              className="ml-6 p-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Link
          to="/products"
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
        >
          Continue Shopping
        </Link>
        {user ? (
          <Link
            to="/checkout"
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
          >
            Proceed to Checkout
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
          >
            Login to Checkout
          </Link>
        )}
      </div>
    </div>
  );
}
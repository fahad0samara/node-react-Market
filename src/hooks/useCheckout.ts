import { useState } from 'react';
import { useAxiosPrivate } from './useAxiosPrivate';
import { calculateTotal } from '../utils/price';

interface CheckoutItem {
  productId: string;
  quantity: number;
  price: number;
}

interface ShippingDetails {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axiosPrivate = useAxiosPrivate();

  const calculateOrderTotal = (items: CheckoutItem[], shippingCost: number = 0) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return calculateTotal(subtotal, shippingCost);
  };

  const processCheckout = async (
    items: CheckoutItem[],
    shippingDetails: ShippingDetails,
    paymentMethod: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPrivate.post('/orders', {
        items,
        shippingDetails,
        paymentMethod,
      });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Checkout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    calculateOrderTotal,
    processCheckout,
  };
}
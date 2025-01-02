import { useState, useEffect } from 'react';
import { useAxiosPrivate } from './useAxiosPrivate';

export function usePrice(productId: string) {
  const [price, setPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axiosPrivate.get(`/products/${productId}/price`);
        setPrice(response.data.price);
        setDiscount(response.data.discount || 0);
      } catch (error) {
        console.error('Error fetching price:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [productId]);

  const finalPrice = price ? price * (1 - discount / 100) : null;

  return { price, discount, finalPrice, loading };
}
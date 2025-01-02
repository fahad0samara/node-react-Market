import { useState, useEffect } from 'react';
import { useAxiosPrivate } from './useAxiosPrivate';

export function useStock(productId: string) {
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axiosPrivate.get(`/products/${productId}/stock`);
        setStock(response.data.stock);
      } catch (error) {
        console.error('Error fetching stock:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [productId]);

  const isInStock = stock > 0;
  const isLowStock = stock > 0 && stock <= 5;

  return { stock, isInStock, isLowStock, loading };
}
import { useState, useEffect } from 'react';
import { useAxiosPrivate } from './useAxiosPrivate';

interface TrackingInfo {
  status: 'processing' | 'shipped' | 'delivered';
  shippedAt?: string;
  deliveredAt?: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  carrier?: string;
  events?: Array<{
    date: string;
    location: string;
    description: string;
  }>;
}

export function useOrderTracking(orderId: string) {
  const [tracking, setTracking] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const response = await axiosPrivate.get(`/orders/${orderId}/tracking`);
        setTracking(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch tracking info');
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, [orderId]);

  return { tracking, loading, error };
}
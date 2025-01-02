import { useState } from 'react';
import { useAxiosPrivate } from './useAxiosPrivate';
import toast from 'react-hot-toast';

export function useReviews(productId: string) {
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const submitReview = async (data: { rating: number; comment: string }) => {
    setLoading(true);
    try {
      await axiosPrivate.post(`/products/${productId}/reviews`, data);
      toast.success('Review submitted successfully');
    } catch (error) {
      toast.error('Failed to submit review');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const markHelpful = async (reviewId: string) => {
    try {
      await axiosPrivate.post(`/products/${productId}/reviews/${reviewId}/helpful`);
    } catch (error) {
      toast.error('Failed to mark review as helpful');
      throw error;
    }
  };

  return {
    loading,
    submitReview,
    markHelpful
  };
}
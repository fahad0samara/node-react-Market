import { create } from 'zustand';
import { useAxiosPrivate } from './useAxiosPrivate';

interface DynamicPricingState {
  prices: Record<string, number>;
  loading: boolean;
  error: string | null;
  fetchPrice: (productId: string) => Promise<void>;
  updatePrice: (productId: string, price: number) => Promise<void>;
  calculateDiscount: (originalPrice: number, currentPrice: number) => number;
}

const useDynamicPricing = create<DynamicPricingState>((set, get) => {
  const axiosPrivate = useAxiosPrivate();

  return {
    prices: {},
    loading: false,
    error: null,
    fetchPrice: async (productId: string) => {
      set({ loading: true, error: null });
      try {
        const response = await axiosPrivate.get(`/products/${productId}/price`);
        set(state => ({
          prices: {
            ...state.prices,
            [productId]: response.data.price
          },
          loading: false
        }));
      } catch (error) {
        set({ error: 'Failed to fetch price', loading: false });
      }
    },
    updatePrice: async (productId: string, price: number) => {
      set({ loading: true, error: null });
      try {
        await axiosPrivate.put(`/products/${productId}/price`, { price });
        set(state => ({
          prices: {
            ...state.prices,
            [productId]: price
          },
          loading: false
        }));
      } catch (error) {
        set({ error: 'Failed to update price', loading: false });
      }
    },
    calculateDiscount: (originalPrice: number, currentPrice: number) => {
      return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    }
  };
});
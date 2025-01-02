import { create } from 'zustand';
import { useAxiosPrivate } from './useAxiosPrivate';

interface RecommendationState {
  recommendations: any[];
  loading: boolean;
  error: string | null;
  fetchRecommendations: (userId: string) => Promise<void>;
  fetchSimilarProducts: (productId: string) => Promise<void>;
  fetchPersonalized: () => Promise<void>;
}

const useRecommendations = create<RecommendationState>((set) => {
  const axiosPrivate = useAxiosPrivate();

  return {
    recommendations: [],
    loading: false,
    error: null,
    fetchRecommendations: async (userId: string) => {
      set({ loading: true, error: null });
      try {
        const response = await axiosPrivate.get(`/recommendations/${userId}`);
        set({ recommendations: response.data, loading: false });
      } catch (error) {
        set({ error: 'Failed to fetch recommendations', loading: false });
      }
    },
    fetchSimilarProducts: async (productId: string) => {
      set({ loading: true, error: null });
      try {
        const response = await axiosPrivate.get(`/products/${productId}/similar`);
        set({ recommendations: response.data, loading: false });
      } catch (error) {
        set({ error: 'Failed to fetch similar products', loading: false });
      }
    },
    fetchPersonalized: async () => {
      set({ loading: true, error: null });
      try {
        const response = await axiosPrivate.get('/recommendations/personalized');
        set({ recommendations: response.data, loading: false });
      } catch (error) {
        set({ error: 'Failed to fetch personalized recommendations', loading: false });
      }
    }
  };
});
import { create } from 'zustand';
import { useAxiosPrivate } from './useAxiosPrivate';

interface InventoryState {
  stockLevels: Record<string, number>;
  lowStockThreshold: number;
  loading: boolean;
  error: string | null;
  fetchStockLevel: (productId: string) => Promise<void>;
  updateStockLevel: (productId: string, quantity: number) => Promise<void>;
  setLowStockThreshold: (threshold: number) => void;
  isLowStock: (productId: string) => boolean;
}

const useInventory = create<InventoryState>((set, get) => {
  const axiosPrivate = useAxiosPrivate();

  return {
    stockLevels: {},
    lowStockThreshold: 5,
    loading: false,
    error: null,
    fetchStockLevel: async (productId: string) => {
      set({ loading: true, error: null });
      try {
        const response = await axiosPrivate.get(`/products/${productId}/stock`);
        set(state => ({
          stockLevels: {
            ...state.stockLevels,
            [productId]: response.data.stockLevel
          },
          loading: false
        }));
      } catch (error) {
        set({ error: 'Failed to fetch stock level', loading: false });
      }
    },
    updateStockLevel: async (productId: string, quantity: number) => {
      set({ loading: true, error: null });
      try {
        await axiosPrivate.put(`/products/${productId}/stock`, { quantity });
        set(state => ({
          stockLevels: {
            ...state.stockLevels,
            [productId]: quantity
          },
          loading: false
        }));
      } catch (error) {
        set({ error: 'Failed to update stock level', loading: false });
      }
    },
    setLowStockThreshold: (threshold: number) => {
      set({ lowStockThreshold: threshold });
    },
    isLowStock: (productId: string) => {
      const { stockLevels, lowStockThreshold } = get();
      return (stockLevels[productId] || 0) <= lowStockThreshold;
    }
  };
});
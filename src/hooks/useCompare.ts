import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';

interface CompareState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
}

const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => ({
          items: state.items.length < 4 ? [...state.items, product] : state.items,
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        })),
      isInCompare: (productId) =>
        get().items.some((item) => item._id === productId),
      clearCompare: () => set({ items: [] }),
    }),
    {
      name: 'compare-storage',
    }
  )
);

export default useCompare;
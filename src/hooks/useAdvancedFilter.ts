import { create } from 'zustand';

interface FilterState {
  filters: {
    price: { min: number; max: number };
    categories: string[];
    brands: string[];
    ratings: number[];
    availability: boolean | null;
    sortBy: string;
  };
  setFilter: (key: string, value: any) => void;
  resetFilters: () => void;
  getQueryString: () => string;
}

const initialState = {
  price: { min: 0, max: Infinity },
  categories: [],
  brands: [],
  ratings: [],
  availability: null,
  sortBy: 'newest'
};

const useAdvancedFilter = create<FilterState>((set, get) => ({
  filters: initialState,
  setFilter: (key, value) => {
    set(state => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    }));
  },
  resetFilters: () => {
    set({ filters: initialState });
  },
  getQueryString: () => {
    const { filters } = get();
    const params = new URLSearchParams();

    if (filters.price.min > 0) params.append('minPrice', filters.price.min.toString());
    if (filters.price.max < Infinity) params.append('maxPrice', filters.price.max.toString());
    if (filters.categories.length) params.append('categories', filters.categories.join(','));
    if (filters.brands.length) params.append('brands', filters.brands.join(','));
    if (filters.ratings.length) params.append('ratings', filters.ratings.join(','));
    if (filters.availability !== null) params.append('inStock', filters.availability.toString());
    if (filters.sortBy) params.append('sort', filters.sortBy);

    return params.toString();
  }
}));
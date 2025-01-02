import { create } from 'zustand';
import { useAxiosPrivate } from './useAxiosPrivate';
import debounce from '../utils/debounce';

interface SearchState {
  query: string;
  results: any[];
  loading: boolean;
  suggestions: string[];
  recentSearches: string[];
  setQuery: (query: string) => void;
  addRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
}

const useSearch = create<SearchState>((set, get) => {
  const axiosPrivate = useAxiosPrivate();

  const searchProducts = debounce(async (query: string) => {
    if (!query) {
      set({ results: [], loading: false });
      return;
    }

    set({ loading: true });
    try {
      const response = await axiosPrivate.get(`/products/search?q=${query}`);
      set({ 
        results: response.data.products,
        suggestions: response.data.suggestions,
        loading: false 
      });
    } catch (error) {
      console.error('Search error:', error);
      set({ loading: false });
    }
  }, 300);

  return {
    query: '',
    results: [],
    loading: false,
    suggestions: [],
    recentSearches: JSON.parse(localStorage.getItem('recentSearches') || '[]'),
    setQuery: (query: string) => {
      set({ query });
      searchProducts(query);
    },
    addRecentSearch: (term: string) => {
      const searches = get().recentSearches;
      const updatedSearches = [
        term,
        ...searches.filter(s => s !== term)
      ].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      set({ recentSearches: updatedSearches });
    },
    clearRecentSearches: () => {
      localStorage.removeItem('recentSearches');
      set({ recentSearches: [] });
    }
  };
});
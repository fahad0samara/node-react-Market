import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../utils/axios';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  clearError: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      login: async (email, password) => {
        try {
          set({ loading: true, error: null });
          const response = await api.post('/auth/login', {
            email,
            password,
          });
          set({ user: response.data.user, token: response.data.token, loading: false });
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'An error occurred',
            loading: false 
          });
          throw error;
        }
      },
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('auth-storage');
      },
      register: async (name, email, password) => {
        try {
          set({ loading: true, error: null });
          const response = await api.post('/auth/register', {
            name,
            email,
            password,
          });
          set({ user: response.data.user, token: response.data.token, loading: false });
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'An error occurred',
            loading: false 
          });
          throw error;
        }
      },
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
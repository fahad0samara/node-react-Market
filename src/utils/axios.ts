import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-storage');
    if (token) {
      const parsedToken = JSON.parse(token).state.token;
      if (parsedToken) {
        config.headers.Authorization = `Bearer ${parsedToken}`;
      }
    }
    return config;
  },
  (error) => {
    toast.error('Request failed');
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
    return Promise.reject(error);
  }
);

export default api;
import axios from 'axios';
import { storage } from './storage';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retry failed requests
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    
    if (!config || !config.retry) {
      config.retry = 0;
    }

    if (config.retry >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    config.retry += 1;
    
    if (response?.status === 401) {
      storage.remove('auth');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    return api(config);
  }
);

export default api;
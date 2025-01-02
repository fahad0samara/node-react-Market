import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
    historyApiFallback: true,
    middleware: [
      (req, res, next) => {
        // Redirect all non-API requests to index.html
        if (!req.url.includes('/api')) {
          req.url = '/index.html';
        }
        next();
      },
    ],
  },
});
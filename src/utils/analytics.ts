import { Product } from '../types/product';

export const trackProductView = (product: Product) => {
  // Track product views for recommendations
  const viewedProducts = JSON.parse(localStorage.getItem('viewedProducts') || '[]');
  const updatedViews = [product._id, ...viewedProducts.filter((id: string) => id !== product._id)].slice(0, 20);
  localStorage.setItem('viewedProducts', JSON.stringify(updatedViews));
};

export const trackPurchase = (products: Product[]) => {
  // Track purchases for analytics
  const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
  const updatedPurchases = [...purchases, ...products.map(p => ({ 
    productId: p._id, 
    timestamp: new Date().toISOString() 
  }))];
  localStorage.setItem('purchases', JSON.stringify(updatedPurchases));
};

export const getRecommendations = async (userId: string) => {
  const viewedProducts = JSON.parse(localStorage.getItem('viewedProducts') || '[]');
  const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
  
  // Combine view and purchase history for better recommendations
  return [...new Set([...viewedProducts, ...purchases.map(p => p.productId)])];
};
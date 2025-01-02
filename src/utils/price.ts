export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateDiscount = (original: number, discounted: number): number => {
  return Math.round(((original - discounted) / original) * 100);
};

export const calculateTax = (amount: number, rate: number = 0.1): number => {
  return amount * rate;
};

export const calculateTotal = (
  subtotal: number,
  shipping: number = 0,
  taxRate: number = 0.1
): number => {
  const tax = calculateTax(subtotal, taxRate);
  return subtotal + shipping + tax;
};
import { z } from 'zod';

export const shippingSchema = z.object({
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  postalCode: z.string().min(5, 'Invalid postal code'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
});

export const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, 'Invalid card number'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
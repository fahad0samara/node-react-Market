import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const shippingSchema = z.object({
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  postalCode: z.string().min(5, 'Invalid postal code'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

interface Props {
  onSubmit: (data: ShippingFormData) => void;
}

export default function ShippingForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          {...register('address')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          {...register('city')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Postal Code</label>
        <input
          type="text"
          {...register('postalCode')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
        {errors.postalCode && (
          <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <input
          type="text"
          {...register('country')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
        {errors.country && (
          <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
      >
        Continue to Payment
      </button>
    </form>
  );
}
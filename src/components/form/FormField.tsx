import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export default function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
}: Props) {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
      />
      {errors[name] && (
        <p className="text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
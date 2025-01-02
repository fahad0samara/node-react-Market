import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}

export default function FormTextarea({
  name,
  label,
  rows = 4,
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
      <textarea
        id={name}
        rows={rows}
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
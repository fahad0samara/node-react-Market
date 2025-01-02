import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Check } from 'lucide-react';

interface Props {
  name: string;
  label: string;
  description?: string;
}

export default function FormCheckbox({ name, label, description }: Props) {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          type="checkbox"
          id={name}
          {...register(name)}
          className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={name} className="font-medium text-gray-700">
          {label}
        </label>
        {description && (
          <p className="text-gray-500">{description}</p>
        )}
        {errors[name] && (
          <p className="text-sm text-red-600">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
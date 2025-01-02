import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface Props {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
}

export default function FormRadioGroup({
  name,
  label,
  options,
  required = false,
}: Props) {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="space-y-4">
        {options.map(({ value, label, description }) => (
          <div key={value} className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                type="radio"
                id={`${name}-${value}`}
                value={value}
                {...register(name)}
                className="h-4 w-4 border-gray-300 text-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor={`${name}-${value}`}
                className="text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              {description && (
                <p className="text-sm text-gray-500">{description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {errors[name] && (
        <p className="text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
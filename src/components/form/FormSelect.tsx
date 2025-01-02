import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface Props {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
  placeholder?: string;
}

export default function FormSelect({
  name,
  label,
  options,
  required = false,
  placeholder,
}: Props) {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          {...register(name)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 appearance-none pr-8"
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {errors[name] && (
        <p className="text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface Props extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: Option[];
  label?: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function Select({
  options,
  label,
  error,
  value,
  onChange,
  className = '',
  ...props
}: Props) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            block w-full rounded-md border-gray-300 shadow-sm
            focus:border-orange-500 focus:ring-orange-500 sm:text-sm
            appearance-none
            ${error ? 'border-red-300' : ''}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
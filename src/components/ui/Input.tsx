import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export default function Input({
  label,
  error,
  helper,
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
      <input
        className={`
          block w-full rounded-md border-gray-300 shadow-sm
          focus:border-orange-500 focus:ring-orange-500 sm:text-sm
          ${error ? 'border-red-300' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {helper && <p className="text-sm text-gray-500">{helper}</p>}
    </div>
  );
}
import React from 'react';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md',
  className = ''
}: Props) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`
        ${sizes[size]}
        border-2
        border-gray-200
        border-t-orange-500
        rounded-full
        animate-spin
      `} />
    </div>
  );
}
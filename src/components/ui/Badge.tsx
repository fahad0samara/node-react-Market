import React from 'react';

interface Props {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
}

export default function Badge({ 
  children, 
  variant = 'primary',
  size = 'md',
  rounded = false
}: Props) {
  const variants = {
    primary: 'bg-orange-100 text-orange-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <span className={`
      inline-flex items-center font-medium
      ${variants[variant]}
      ${sizes[size]}
      ${rounded ? 'rounded-full' : 'rounded'}
    `}>
      {children}
    </span>
  );
}
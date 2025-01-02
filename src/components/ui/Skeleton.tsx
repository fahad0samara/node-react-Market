import React from 'react';

interface Props {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({ 
  className = '', 
  variant = 'text',
  animation = 'pulse'
}: Props) {
  const baseStyles = 'bg-gray-200';
  
  const variants = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  };

  const animations = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: ''
  };

  return (
    <div className={`
      ${baseStyles}
      ${variants[variant]}
      ${animations[animation]}
      ${className}
    `} />
  );
}
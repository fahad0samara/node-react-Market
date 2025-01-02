import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: Props) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}
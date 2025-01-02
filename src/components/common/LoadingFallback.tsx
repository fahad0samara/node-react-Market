import React from 'react';
import { Loader } from 'lucide-react';

interface Props {
  message?: string;
}

export default function LoadingFallback({ message = 'Loading...' }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
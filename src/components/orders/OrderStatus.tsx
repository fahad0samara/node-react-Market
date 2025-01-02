import React from 'react';
import { Package, Truck, CheckCircle } from 'lucide-react';

interface Props {
  status: 'processing' | 'shipped' | 'delivered';
  shippedAt?: string;
  deliveredAt?: string;
}

export default function OrderStatus({ status, shippedAt, deliveredAt }: Props) {
  const steps = [
    { key: 'processing', label: 'Processing', icon: Package },
    { key: 'shipped', label: 'Shipped', icon: Truck, date: shippedAt },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle, date: deliveredAt },
  ];

  const currentStep = steps.findIndex(step => step.key === status);

  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStep;
          const isCompleted = index < currentStep;

          return (
            <React.Fragment key={step.key}>
              {index > 0 && (
                <div className={`flex-1 h-0.5 ${isActive ? 'bg-orange-500' : 'bg-gray-200'}`} />
              )}
              <div className="relative flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="mt-2 text-sm font-medium">{step.label}</p>
                {step.date && (
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(step.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
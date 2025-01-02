import React from 'react';
import { Truck, Package, Clock, MapPin } from 'lucide-react';

interface Props {
  shipping: {
    freeShipping: boolean;
    estimatedDays: number;
    availableLocations: string[];
  };
}

export default function DeliveryInfo({ shipping }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Delivery Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
          <Truck className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-medium">Shipping</p>
            <p className="text-sm text-gray-600">
              {shipping.freeShipping ? 'Free Shipping' : 'Standard Shipping Rate'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
          <Clock className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-medium">Estimated Time</p>
            <p className="text-sm text-gray-600">
              {shipping.estimatedDays} business days
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
          <Package className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-medium">Order Tracking</p>
            <p className="text-sm text-gray-600">
              Available after dispatch
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
          <MapPin className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-medium">Delivery Areas</p>
            <p className="text-sm text-gray-600">
              {shipping.availableLocations.length} locations available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
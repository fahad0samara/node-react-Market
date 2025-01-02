import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';

interface Props {
  warranty: {
    available: boolean;
    duration: string;
    description: string;
  };
}

export default function ProductWarranty({ warranty }: Props) {
  const [showDetails, setShowDetails] = React.useState(false);

  if (!warranty.available) return null;

  return (
    <div className="bg-green-50 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-green-900">
            {warranty.duration} Warranty
          </h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-green-700 hover:text-green-800 mt-1"
          >
            {showDetails ? 'Hide details' : 'View details'}
          </button>
          
          {showDetails && (
            <div className="mt-2 text-sm text-green-800">
              <p>{warranty.description}</p>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <AlertCircle className="w-4 h-4" />
                <span>Register your product to activate the warranty</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
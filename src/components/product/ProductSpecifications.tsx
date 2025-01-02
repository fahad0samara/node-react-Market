import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Specification {
  name: string;
  value: string;
}

interface Props {
  specifications: Specification[];
}

export default function ProductSpecifications({ specifications }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left"
      >
        <span className="font-medium">Specifications</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specifications.map((spec, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-sm text-gray-500">{spec.name}</span>
                <span className="font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
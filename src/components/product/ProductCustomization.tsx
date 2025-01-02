import React from 'react';
import { Palette, Type, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface CustomizationOption {
  type: 'color' | 'text' | 'image';
  name: string;
  options?: string[];
  maxLength?: number;
  maxSize?: number;
}

interface Props {
  options: CustomizationOption[];
  onCustomizationChange: (customizations: Record<string, string>) => void;
}

export default function ProductCustomization({ options, onCustomizationChange }: Props) {
  const [customizations, setCustomizations] = React.useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    const updated = { ...customizations, [name]: value };
    setCustomizations(updated);
    onCustomizationChange(updated);
  };

  const renderCustomizationField = (option: CustomizationOption) => {
    switch (option.type) {
      case 'color':
        return (
          <div className="flex gap-2">
            {option.options?.map((color) => (
              <button
                key={color}
                onClick={() => handleChange(option.name, color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  customizations[option.name] === color
                    ? 'border-orange-500'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        );

      case 'text':
        return (
          <input
            type="text"
            maxLength={option.maxLength}
            onChange={(e) => handleChange(option.name, e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder={`Enter ${option.name.toLowerCase()}`}
          />
        );

      case 'image':
        return (
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
              <ImageIcon className="w-5 h-5" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && file.size <= (option.maxSize || 5 * 1024 * 1024)) {
                    // Convert to base64 or handle file upload
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      handleChange(option.name, reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
            {customizations[option.name] && (
              <img
                src={customizations[option.name]}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-md"
              />
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Customize Your Product</h3>
      
      <div className="space-y-4">
        {options.map((option) => (
          <motion.div
            key={option.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              {option.type === 'color' && <Palette className="w-4 h-4" />}
              {option.type === 'text' && <Type className="w-4 h-4" />}
              {option.type === 'image' && <ImageIcon className="w-4 h-4" />}
              {option.name}
            </label>
            {renderCustomizationField(option)}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
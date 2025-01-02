import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  images: string[];
  mainImage: string;
}

export default function ProductGallery({ images, mainImage }: Props) {
  const [currentImage, setCurrentImage] = React.useState(mainImage);
  const [selectedThumbnail, setSelectedThumbnail] = React.useState(0);

  const handlePrevious = () => {
    const newIndex = selectedThumbnail === 0 ? images.length - 1 : selectedThumbnail - 1;
    setSelectedThumbnail(newIndex);
    setCurrentImage(images[newIndex]);
  };

  const handleNext = () => {
    const newIndex = selectedThumbnail === images.length - 1 ? 0 : selectedThumbnail + 1;
    setSelectedThumbnail(newIndex);
    setCurrentImage(images[newIndex]);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <motion.img
          key={currentImage}
          src={currentImage}
          alt="Product"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full aspect-square object-cover rounded-lg"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedThumbnail(index);
                setCurrentImage(image);
              }}
              className={`relative flex-shrink-0 ${
                selectedThumbnail === index ? 'ring-2 ring-orange-500' : ''
              }`}
            >
              <img
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
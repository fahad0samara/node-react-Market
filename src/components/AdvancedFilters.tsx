import React from 'react';
import { Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';
import useAdvancedFilter from '../hooks/useAdvancedFilter';

export default function AdvancedFilters() {
  const { filters, setFilter, resetFilters } = useAdvancedFilter();
  const [isOpen, setIsOpen] = React.useState(false);

  const priceRanges = [
    { min: 0, max: 50, label: 'Under $50' },
    { min: 50, max: 100, label: '$50 - $100' },
    { min: 100, max: 200, label: '$100 - $200' },
    { min: 200, max: Infinity, label: 'Over $200' }
  ];

  const ratings = [5, 4, 3, 2, 1];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50"
      >
        <Filter className="w-5 h-5" />
        <span>Filters</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 z-50"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filters</h3>
            <button
              onClick={resetFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Reset All
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">Price Range</h4>
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center mb-2">
                <input
                  type="radio"
                  checked={filters.price.min === range.min && filters.price.max === range.max}
                  onChange={() => setFilter('price', range)}
                  className="mr-2"
                />
                {range.label}
              </label>
            ))}
          </div>

          {/* Rating Filter */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">Rating</h4>
            {ratings.map((rating) => (
              <label key={rating} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={filters.ratings.includes(rating)}
                  onChange={(e) => {
                    const newRatings = e.target.checked
                      ? [...filters.ratings, rating]
                      : filters.ratings.filter(r => r !== rating);
                    setFilter('ratings', newRatings);
                  }}
                  className="mr-2"
                />
                {rating} Stars & Up
              </label>
            ))}
          </div>

          {/* Availability */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">Availability</h4>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.availability === true}
                onChange={(e) => setFilter('availability', e.target.checked ? true : null)}
                className="mr-2"
              />
              In Stock Only
            </label>
          </div>

          {/* Sort By */}
          <div>
            <h4 className="font-medium mb-2">Sort By</h4>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilter('sortBy', e.target.value)}
              className="w-full p-2 border rounded"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      )}
    </div>
  );
}
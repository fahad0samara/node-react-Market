import React from 'react';
import { Search, Clock, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useSearch from '../hooks/useSearch';

interface Props {
  onSelect: (term: string) => void;
}

export default function SearchSuggestions({ onSelect }: Props) {
  const { suggestions, recentSearches, clearRecentSearches } = useSearch();

  if (!suggestions.length && !recentSearches.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 bg-white mt-2 rounded-lg shadow-lg border divide-y"
    >
      {recentSearches.length > 0 && (
        <div className="p-2">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm font-medium text-gray-500">Recent Searches</span>
            <button
              onClick={clearRecentSearches}
              className="text-gray-400 hover:text-gray-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          {recentSearches.map((term, index) => (
            <button
              key={index}
              onClick={() => onSelect(term)}
              className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50"
            >
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{term}</span>
            </button>
          ))}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="p-2">
          <div className="px-3 py-2">
            <span className="text-sm font-medium text-gray-500">Suggestions</span>
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSelect(suggestion)}
              className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50"
            >
              <Search className="w-4 h-4 text-gray-400" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
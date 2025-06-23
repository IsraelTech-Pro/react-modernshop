
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import SearchIcon from './icons/SearchIcon';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const performSearch = useCallback((currentQuery: string) => {
    if (currentQuery.trim().length > 1) {
      const filtered = PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(currentQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(currentQuery.toLowerCase())
      ).slice(0, 5); // Limit suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
        performSearch(query);
    }, 200); // Debounce search

    return () => {
        clearTimeout(handler);
    };
  }, [query, performSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setSuggestions([]); // Clear suggestions on click outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[activeIndex]);
        } else if (query.trim()) {
            // Navigate to products page with search query
            navigate(`/products?search=${encodeURIComponent(query.trim())}`);
            setIsFocused(false);
            setSuggestions([]);
        }
      } else if (e.key === 'Escape') {
        setIsFocused(false);
        setSuggestions([]);
      }
    } else if (e.key === 'Enter' && query.trim()) {
         navigate(`/products?search=${encodeURIComponent(query.trim())}`);
         setIsFocused(false);
    }
  };

  const handleSelectSuggestion = (product: Product) => {
    navigate(`/product/${product.id}`);
    setQuery('');
    setSuggestions([]);
    setIsFocused(false);
    setActiveIndex(-1);
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" ref={searchContainerRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1); // Reset active index on query change
          }}
          onFocus={() => {
            setIsFocused(true);
            if (query.trim().length > 1) performSearch(query); // Perform search on focus if query exists
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 text-sm text-dark-gray dark:text-dm-light-gray bg-white dark:bg-dm-medium-gray border border-gray-300 dark:border-dm-medium-gray rounded-full focus:ring-2 focus:ring-electric-orange focus:border-transparent outline-none transition-colors"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400 dark:text-dm-lighter-gray" />
        </div>
      </div>
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-30 mt-1 w-full bg-white dark:bg-dm-medium-gray rounded-md shadow-lg overflow-hidden border border-gray-200 dark:border-dm-dark-gray"
            role="listbox"
          >
            {suggestions.map((product, index) => (
              <li
                key={product.id}
                onClick={() => handleSelectSuggestion(product)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`px-4 py-3 cursor-pointer text-sm hover:bg-light-gray dark:hover:bg-dm-dark-gray transition-colors
                  ${index === activeIndex ? 'bg-light-gray dark:bg-dm-dark-gray' : ''}`}
                role="option"
                aria-selected={index === activeIndex}
              >
                <div className="flex items-center gap-3">
                  <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded" />
                  <div>
                    <p className="font-medium text-dark-gray dark:text-dm-light-gray">{product.name}</p>
                    <p className="text-xs text-gray-500 dark:text-dm-lighter-gray">{product.category}</p>
                  </div>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;

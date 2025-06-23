
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../constants';
import Button from '../components/Button';
import ChevronDownIcon from '../components/icons/ChevronDownIcon';
import XIcon from '../components/icons/XIcon';

const FilterIconFallback: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

const ITEMS_PER_PAGE = 12;

interface ProductListingPageProps {
  openQuickViewModal: (productId: string) => void;
}

const ProductListingPage: React.FC<ProductListingPageProps> = ({ openQuickViewModal }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); // Max price from products could be dynamic
  const [sortOption, setSortOption] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');
    if (category) {
      setSelectedCategories([category]);
    } else {
      setSelectedCategories([]); // Reset if no category in URL
    }
    if (search) {
      setSearchTerm(search);
    } else {
      setSearchTerm('');
    }
    setCurrentPage(1); // Reset page on query param change
  }, [location.search]);


  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategories(prev =>
      prev.includes(categorySlug)
        ? prev.filter(c => c !== categorySlug)
        : [...prev, categorySlug]
    );
    setCurrentPage(1);
  };

  const handlePriceChange = (value: number) => {
    setPriceRange([priceRange[0], value]);
  };
  
  const applyPriceFilter = () => {
     setCurrentPage(1);
  };


  const filteredProducts = useMemo(() => {
    let products = PRODUCTS;
    if (searchTerm) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategories.length > 0) {
      products = products.filter(p => selectedCategories.includes(p.category.toLowerCase().replace(/\s+/g, '-')));
    }
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortOption) {
      case 'price-asc':
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        products = [...products].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return products;
  }, [selectedCategories, priceRange, sortOption, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0,0);
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-deep-purple dark:text-electric-orange">
            {searchTerm ? `Search Results for "${searchTerm}"` : (selectedCategories.length === 1 ? CATEGORIES.find(c=>c.slug === selectedCategories[0])?.name : 'All Products')}
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(true)} className="md:hidden flex items-center">
              <FilterIconFallback className="w-5 h-5 mr-2" /> Filters
            </Button>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => {setSortOption(e.target.value); setCurrentPage(1);}}
                className="pl-3 pr-8 py-2 border border-gray-300 dark:border-dm-medium-gray rounded-md focus:outline-none focus:ring-1 focus:ring-deep-purple focus:border-deep-purple appearance-none text-sm sm:text-base bg-white dark:bg-dm-medium-gray text-dark-gray dark:text-dm-light-gray"
                aria-label="Sort products"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
              <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-dm-lighter-gray absolute top-1/2 right-2.5 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="hidden md:block w-full md:w-1/4 lg:w-1/5 space-y-6 p-6 bg-white dark:bg-dm-medium-gray rounded-lg shadow-soft-xl dark:shadow-dark-soft-xl h-fit">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-deep-purple dark:text-electric-orange">Categories</h3>
              <ul className="space-y-2">
                {CATEGORIES.map(category => (
                  <li key={category.id}>
                    <label className="flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-dm-light-gray hover:text-electric-orange dark:hover:text-electric-orange">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.slug)}
                        onChange={() => handleCategoryChange(category.slug)}
                        className="form-checkbox h-4 w-4 text-electric-orange rounded border-gray-300 dark:border-dm-dark-gray focus:ring-electric-orange bg-white dark:bg-dm-medium-gray"
                        aria-label={category.name}
                      />
                      <span>{category.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-deep-purple dark:text-electric-orange">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000" // Should be dynamic based on max product price
                  value={priceRange[1]} 
                  onChange={(e) => handlePriceChange(parseInt(e.target.value))}
                  onMouseUp={applyPriceFilter}
                  onTouchEnd={applyPriceFilter}
                  className="w-full h-2 bg-gray-200 dark:bg-dm-dark-gray rounded-lg appearance-none cursor-pointer accent-electric-orange"
                  aria-label="Maximum price"
                />
                <div className="flex justify-between text-sm text-gray-700 dark:text-dm-lighter-gray">
                  <span>₵{priceRange[0]}</span>
                  <span>₵{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </aside>

          <motion.div className="w-full md:w-3/4 lg:w-4/5">
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-6">
                <AnimatePresence>
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} openQuickViewModal={openQuickViewModal} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-xl text-gray-500 dark:text-dm-lighter-gray">No products found matching your criteria.</p>
              </div>
            )}

            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex justify-center items-center space-x-1 sm:space-x-2 flex-wrap gap-y-2"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    variant={currentPage === page ? 'primary' : 'outline'}
                    size="sm"
                    className={`${currentPage === page ? 'cursor-default' : ''} !px-2.5 !py-1 sm:!px-3 sm:!py-1.5`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </Button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] flex md:hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-dialog-title"
          >
            <div className="w-4/5 max-w-sm bg-white dark:bg-dm-medium-gray h-full shadow-xl p-6 space-y-6 overflow-y-auto">
              <div className="flex justify-between items-center">
                <h2 id="filter-dialog-title" className="text-xl font-semibold text-deep-purple dark:text-electric-orange">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-1 text-gray-500 dark:text-dm-lighter-gray hover:text-electric-orange" aria-label="Close filters">
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
               <div>
                <h3 className="text-lg font-semibold mb-3 text-deep-purple dark:text-electric-orange">Categories</h3>
                <ul className="space-y-2">
                  {CATEGORIES.map(category => (
                    <li key={category.id}>
                      <label className="flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-dm-light-gray hover:text-electric-orange">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.slug)}
                          onChange={() => handleCategoryChange(category.slug)}
                          className="form-checkbox h-4 w-4 text-electric-orange rounded border-gray-300 dark:border-dm-dark-gray focus:ring-electric-orange bg-white dark:bg-dm-medium-gray"
                          aria-label={category.name}
                        />
                        <span>{category.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-deep-purple dark:text-electric-orange">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-dm-dark-gray rounded-lg appearance-none cursor-pointer accent-electric-orange"
                    aria-label="Maximum price"
                  />
                  <div className="flex justify-between text-sm text-gray-700 dark:text-dm-lighter-gray">
                    <span>₵{priceRange[0]}</span>
                    <span>₵{priceRange[1]}</span>
                  </div>
                </div>
              </div>
              <Button fullWidth onClick={() => { applyPriceFilter(); setIsFilterOpen(false);}}>Apply Filters</Button>
            </div>
            <div className="w-1/5 bg-black bg-opacity-50 dark:bg-opacity-70" onClick={() => setIsFilterOpen(false)} aria-hidden="true"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedPage>
  );
};

export default ProductListingPage;

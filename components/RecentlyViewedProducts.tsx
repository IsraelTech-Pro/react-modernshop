
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

interface RecentlyViewedProductsProps {
  openQuickViewModal: (productId: string) => void;
}

const RecentlyViewedProducts: React.FC<RecentlyViewedProductsProps> = ({ openQuickViewModal }) => {
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const recentlyViewedIds = JSON.parse(localStorage.getItem('recentlyViewed') || '[]') as string[];
    if (recentlyViewedIds.length > 0) {
      const products = PRODUCTS.filter(p => recentlyViewedIds.includes(p.id))
                               .sort((a, b) => recentlyViewedIds.indexOf(a.id) - recentlyViewedIds.indexOf(b.id)); // Maintain order
      setViewedProducts(products);
    }
  }, []); // Could add a dependency to re-check if visibility changes, but for now loads once.

  if (viewedProducts.length === 0) {
    return null; // Don't render if no recently viewed items
  }

  return (
    <section className="py-12 md:py-16 bg-light-gray dark:bg-dm-dark-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-deep-purple dark:text-electric-orange mb-8"
        >
          Recently Viewed
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {viewedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard product={product} openQuickViewModal={openQuickViewModal} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedProducts;

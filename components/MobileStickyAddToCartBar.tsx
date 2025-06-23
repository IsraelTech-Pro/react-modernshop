
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { Product } from '../types';

interface MobileStickyAddToCartBarProps {
  product: Product;
  isVisible: boolean;
  onAddToCart: () => void;
  isLoading: boolean;
  isSuccess: boolean;
}

const MobileStickyAddToCartBar: React.FC<MobileStickyAddToCartBarProps> = ({ product, isVisible, onAddToCart, isLoading, isSuccess }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dm-medium-gray p-3 border-t border-gray-200 dark:border-dm-dark-gray shadow-soft-2xl dark:shadow-dark-soft-2xl z-40 md:hidden"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-deep-purple dark:text-electric-orange">₵{product.price.toFixed(2)}</span>
            </div>
            <Button 
              variant="primary" 
              size="md" 
              onClick={onAddToCart}
              isLoading={isLoading}
              isSuccess={isSuccess}
              disabled={product.stock === 0 || isLoading || isSuccess}
              className="flex-grow !py-3"
            >
              {product.stock === 0 ? 'Out of Stock' : (isSuccess ? 'Added!' : 'Add to Cart')}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileStickyAddToCartBar;

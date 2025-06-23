
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import Button from './Button';
import XIcon from './icons/XIcon';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const handleAddToCart = async () => {
    if (addingToCart || addedSuccess) return;
    setAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 750));
    addToCart(product);
    setAddingToCart(false);
    setAddedSuccess(true);
    setTimeout(() => {
        setAddedSuccess(false);
    }, 1500); 
  };


  const backdropVariants: Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: 'spring', damping: 25, stiffness: 300 } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20, 
      transition: { type: 'tween', duration: 0.2, ease: 'easeOut' }
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} 
        >
          <motion.div
            className="bg-white dark:bg-dm-medium-gray rounded-lg shadow-soft-2xl dark:shadow-dark-soft-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} 
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
          >
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-dm-dark-gray">
              <h2 id="quick-view-title" className="text-xl sm:text-2xl font-semibold text-deep-purple dark:text-electric-orange">
                {product.name}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 dark:text-dm-lighter-gray hover:text-electric-orange dark:hover:text-electric-orange transition-colors rounded-full"
                aria-label="Close quick view"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="w-full relative group overflow-hidden rounded-md aspect-square bg-gray-100 dark:bg-dm-dark-gray">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-contain rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110" 
                  />
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-2xl sm:text-3xl font-bold text-electric-orange dark:text-electric-orange">₵{product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 dark:text-dm-lighter-gray leading-relaxed line-clamp-4">
                    {product.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-dm-lighter-gray">Category: {product.category}</p>
                   {product.stock > 0 ? (
                     <p className="text-sm text-green-600 dark:text-green-400">In Stock ({product.stock} available)</p>
                   ) : (
                     <p className="text-sm text-red-600 dark:text-red-400">Out of Stock</p>
                   )}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-dm-dark-gray bg-gray-50 dark:bg-dm-dark-gray flex flex-col sm:flex-row gap-3">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleAddToCart}
                isLoading={addingToCart}
                isSuccess={addedSuccess}
                disabled={product.stock === 0 || addingToCart || addedSuccess}
                className="flex-1"
              >
                {product.stock === 0 ? 'Out of Stock' : (addedSuccess ? 'Added!' : 'Add to Cart')}
              </Button>
              <Link to={`/product/${product.id}`} className="flex-1" onClick={onClose}>
                <Button variant="outline" size="lg" fullWidth>
                  View Full Details
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;

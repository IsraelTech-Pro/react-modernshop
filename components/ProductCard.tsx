
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  openQuickViewModal?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, openQuickViewModal }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, scale: 1.03, boxShadow: "var(--tw-shadow-soft-xl, 0 10px 20px rgba(0,0,0,0.1))" }} // Use CSS var for dark mode shadow
      className="bg-white dark:bg-dm-medium-gray rounded-lg shadow-md dark:shadow-dark-soft-xl overflow-hidden flex flex-col group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="overflow-hidden h-32 sm:h-36 md:h-40"> 
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>
      </Link>
      <div className="p-2 sm:p-3 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-xs sm:text-sm font-semibold text-dark-gray dark:text-dm-light-gray group-hover:text-deep-purple dark:group-hover:text-electric-orange transition-colors leading-tight mb-0.5 min-h-[2.25rem] sm:min-h-[2.5rem] flex items-center">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 dark:text-dm-lighter-gray mb-1">{product.category}</p>
        <p className="text-sm sm:text-base font-bold text-deep-purple dark:text-electric-orange mb-2">₵{product.price.toFixed(2)}</p>
        <div className="mt-auto space-y-2">
           {openQuickViewModal && (
            <Button 
                variant="outline" 
                size="sm" 
                fullWidth 
                onClick={(e) => { e.stopPropagation(); openQuickViewModal(product.id);}}
                className="!text-xs sm:!text-sm !py-1 sm:!py-1.5 border-deep-purple dark:border-electric-orange text-deep-purple dark:text-electric-orange hover:bg-deep-purple dark:hover:bg-electric-orange hover:text-white dark:hover:text-white"
            >
                Quick View
            </Button>
           )}
          <Button 
            variant="primary" 
            size="sm" 
            fullWidth 
            onClick={(e) => { e.stopPropagation(); addToCart(product);}}
            aria-label={`Add ${product.name} to cart`}
            className="!text-xs sm:!text-sm !py-1 sm:!py-1.5"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

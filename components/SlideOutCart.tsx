
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from './Button';
import XIcon from './icons/XIcon';
import QuantityInput from './QuantityInput';

interface SlideOutCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideOutCart: React.FC<SlideOutCartProps> = ({ isOpen, onClose }) => {
  const { cartItems, getCartTotal, removeFromCart, updateQuantity } = useCart();
  const subtotal = getCartTotal();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 dark:bg-black/75 z-[58] backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-dm-medium-gray shadow-soft-2xl dark:shadow-dark-soft-2xl z-[59] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-panel-title"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-dm-dark-gray bg-light-gray/80 dark:bg-dm-dark-gray/80 backdrop-blur-md">
              <h2 id="cart-panel-title" className="text-xl font-semibold text-deep-purple dark:text-electric-orange">
                Your Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 dark:text-dm-lighter-gray hover:text-electric-orange dark:hover:text-electric-orange transition-colors"
                aria-label="Close cart panel"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center p-5 text-center">
                <p className="text-lg text-gray-500 dark:text-dm-lighter-gray mb-4">Your cart is currently empty.</p>
                <Button variant="primary" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-grow overflow-y-auto p-5 space-y-4">
                  {cartItems.map(item => (
                    <motion.div 
                      key={item.id} 
                      layout
                      initial={{ opacity:0, y:10}} animate={{ opacity:1, y:0 }}
                      className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-dm-dark-gray last:border-b-0"
                    >
                      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                      <div className="flex-grow">
                        <Link to={`/product/${item.id}`} onClick={onClose} className="text-sm font-medium text-deep-purple dark:text-electric-orange hover:text-electric-orange dark:hover:text-yellow-400 block mb-1">
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-dm-lighter-gray mb-2">₵{item.price.toFixed(2)}</p>
                        <QuantityInput
                            quantity={item.quantity}
                            maxStock={item.stock}
                            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                            onChange={(value) => updateQuantity(item.id, value)}
                        />
                      </div>
                      <div className="text-right flex flex-col items-end">
                         <p className="text-sm font-semibold text-deep-purple dark:text-dm-light-gray mb-2">₵{(item.price * item.quantity).toFixed(2)}</p>
                         <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:underline">
                            Remove
                         </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-5 border-t border-gray-200 dark:border-dm-dark-gray bg-gray-50 dark:bg-dm-dark-gray">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-700 dark:text-dm-light-gray">Subtotal:</span>
                    <span className="text-xl font-bold text-deep-purple dark:text-electric-orange">₵{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="space-y-3">
                    <Button variant="primary" fullWidth size="lg" onClick={handleCheckout}>
                      Proceed to Checkout
                    </Button>
                    <Button variant="outline" fullWidth size="lg" onClick={handleViewCart}>
                      View Full Cart
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SlideOutCart;

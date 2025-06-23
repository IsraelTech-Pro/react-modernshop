
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import QuantityInput from '../components/QuantityInput';
import { SHIPPING_COST } from '../constants';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const subtotal = getCartTotal();
  const total = subtotal + (subtotal > 0 ? SHIPPING_COST : 0);

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-28 md:pb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-deep-purple dark:text-electric-orange mb-8 text-center">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y:0 }}
            className="text-center py-10"
          >
            <p className="text-xl text-gray-500 dark:text-dm-lighter-gray mb-6">Your cart is empty.</p>
            <Link to="/products">
              <Button variant="primary" size="lg">Continue Shopping</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <motion.div 
              layout 
              className="lg:col-span-2 bg-white dark:bg-dm-medium-gray p-6 rounded-lg shadow-lg dark:shadow-dark-soft-lg"
            >
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                    className="flex flex-col sm:flex-row items-center justify-between py-4 border-b dark:border-dm-dark-gray last:border-b-0"
                  >
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md"/>
                      <div>
                        <Link to={`/product/${item.id}`} className="text-lg font-semibold text-deep-purple dark:text-electric-orange hover:text-electric-orange dark:hover:text-yellow-400">{item.name}</Link>
                        <p className="text-sm text-gray-500 dark:text-dm-lighter-gray">₵{item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <QuantityInput
                        quantity={item.quantity}
                        maxStock={item.stock}
                        onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        onChange={(value) => updateQuantity(item.id, value)}
                      />
                       <p className="text-md font-semibold w-24 text-right text-dark-gray dark:text-dm-light-gray">₵{(item.price * item.quantity).toFixed(2)}</p>
                      <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)} className="!px-2 !py-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white dark:text-red-400 dark:border-red-400 dark:hover:bg-red-500 dark:hover:text-white">
                        Remove
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {cartItems.length > 0 && (
                 <div className="mt-6 text-right">
                    <Button variant="outline" onClick={clearCart} className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white dark:text-red-400 dark:border-red-400 dark:hover:bg-red-500 dark:hover:text-white">
                        Clear Cart
                    </Button>
                 </div>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity:0, x: 50 }}
              animate={{ opacity:1, x:0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 bg-white dark:bg-dm-medium-gray p-6 rounded-lg shadow-lg dark:shadow-dark-soft-lg h-fit"
            >
              <h2 className="text-2xl font-semibold text-deep-purple dark:text-electric-orange mb-6">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700 dark:text-dm-light-gray">
                  <span>Subtotal</span>
                  <motion.span key={`subtotal-${subtotal}`} initial={{opacity:0}} animate={{opacity:1}}>₵{subtotal.toFixed(2)}</motion.span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-dm-light-gray">
                  <span>Estimated Shipping</span>
                  <span>{subtotal > 0 ? `₵${SHIPPING_COST.toFixed(2)}` : '₵0.00'}</span>
                </div>
                <div className="border-t dark:border-dm-dark-gray pt-3 mt-3 flex justify-between text-xl font-bold text-deep-purple dark:text-electric-orange">
                  <span>Total</span>
                  <motion.span key={`total-${total}`} initial={{opacity:0}} animate={{opacity:1}}>₵{total.toFixed(2)}</motion.span>
                </div>
              </div>
              <div className="mt-8 space-y-3 hidden lg:block">
                <Link to="/checkout" className="block">
                  <Button variant="primary" size="lg" fullWidth>
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link to="/products" className="block">
                  <Button variant="outline" size="lg" fullWidth>
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <motion.div 
          initial={{ y: "100%"}}
          animate={{ y: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dm-medium-gray p-4 border-t border-gray-200 dark:border-dm-dark-gray shadow-soft-2xl dark:shadow-dark-soft-2xl z-40 lg:hidden"
        >
          <Link to="/checkout">
            <Button variant="primary" size="lg" fullWidth>
              Proceed to Checkout (₵{total.toFixed(2)})
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatedPage>
  );
};

export default CartPage;


import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity:0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="bg-dark-gray dark:bg-dm-deep-purple text-gray-300 dark:text-dm-lighter-gray py-12 md:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          <div>
            <h3 className="text-2xl font-bold text-electric-orange mb-4">ModernShop Ghana</h3>
            <p className="text-sm leading-relaxed">
              Your one-stop shop for modern trends and quality products in Ghana. Experience seamless shopping with us.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white dark:text-dm-light-gray mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm hover:text-electric-orange transition-colors duration-200">About Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-electric-orange transition-colors duration-200">Contact</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-electric-orange transition-colors duration-200">FAQ</Link></li>
              <li><Link to="/shipping-returns" className="text-sm hover:text-electric-orange transition-colors duration-200">Shipping & Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white dark:text-dm-light-gray mb-5">Newsletter</h4>
            <p className="text-sm mb-4">
              Subscribe to get the latest deals and updates from ModernShop Ghana.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:flex-grow px-4 py-2.5 text-sm text-dark-gray dark:text-dm-light-gray bg-gray-100 dark:bg-dm-medium-gray rounded-md focus:outline-none focus:ring-2 focus:ring-electric-orange placeholder-gray-500 dark:placeholder-dm-lighter-gray border border-transparent dark:border-dm-dark-gray"
                aria-label="Email for newsletter"
              />
              <Button 
                type="submit" 
                variant="primary" 
                size="md" 
                className="!px-5 !py-2.5 sm:w-auto"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 md:mt-16 border-t border-gray-700 dark:border-dm-medium-gray pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-dm-lighter-gray">&copy; {new Date().getFullYear()} ModernShop Ghana. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

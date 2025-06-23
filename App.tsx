
import React, { useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import ShippingReturnsPage from './pages/ShippingReturnsPage';
import SlideOutCart from './components/SlideOutCart';
import QuickViewModal from './components/QuickViewModal';
import LiveChatBubble from './components/LiveChatBubble';
import { Product } from './types';
import { PRODUCTS } from './constants';


const App: React.FC = () => {
  const location = useLocation();
  const [isCartPanelOpen, setIsCartPanelOpen] = useState(false);
  const [quickViewProductId, setQuickViewProductId] = useState<string | null>(null);

  const toggleCartPanel = useCallback(() => {
    setIsCartPanelOpen(prev => !prev);
  }, []);

  const closeCartPanel = useCallback(() => {
    setIsCartPanelOpen(false);
  }, []);

  const openQuickViewModal = useCallback((productId: string) => {
    setQuickViewProductId(productId);
  }, []);

  const closeQuickViewModal = useCallback(() => {
    setQuickViewProductId(null);
  }, []);
  
  const quickViewProduct = PRODUCTS.find(p => p.id === quickViewProductId);

  return (
    <div className="flex flex-col min-h-screen bg-light-gray dark:bg-dm-dark-gray">
      <Header onCartIconClick={toggleCartPanel} />
      <main className="flex-grow pt-16 sm:pt-20"> {/* Adjust padding top based on header height */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage openQuickViewModal={openQuickViewModal} />} />
            <Route path="/products" element={<ProductListingPage openQuickViewModal={openQuickViewModal} />} />
            <Route path="/product/:productId" element={<ProductDetailPage openQuickViewModal={openQuickViewModal}/>} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <SlideOutCart isOpen={isCartPanelOpen} onClose={closeCartPanel} />
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProductId}
          onClose={closeQuickViewModal}
        />
      )}
      <LiveChatBubble />
      <Footer />
    </div>
  );
};

export default App;

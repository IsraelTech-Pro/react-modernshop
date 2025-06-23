
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import ArrowRightIcon from '../components/icons/ArrowRightIcon';
import RecentlyViewedProducts from '../components/RecentlyViewedProducts';

const heroBanners = [
  {
    id: 1,
    title: "Shop Quality Locally in Ghana ✨",
    subtitle: "Discover the latest trends. Pay with MoMo • Fast, Reliable Delivery!",
    imageUrl: "https://picsum.photos/seed/Ghana_Lifestyle_FamilyShopping_ElectronicsPromo_GHB001/1200/600",
    ctaText: "Explore Collection",
    ctaLink: "/products"
  },
  {
    id: 2,
    title: "Exclusive Tech Deals in Ghana!",
    subtitle: "Unbeatable Prices on Smartphones, Laptops & More. Limited Stock!",
    imageUrl: "https://picsum.photos/seed/Ghana_Tech_ModernGadgets_AccraOffice_GHB002/1200/600",
    ctaText: "Shop Tech Now",
    ctaLink: "/products?category=electronics"
  },
  {
    id: 3,
    title: "Vibrant Ghanaian Fashion",
    subtitle: "Step out in style with our latest apparel collection. Made for you.",
    imageUrl: "https://picsum.photos/seed/Ghana_Fashion_ModernAfricanPrint_StreetStyleAccra_GHB003/1200/600",
    ctaText: "Discover Fashion",
    ctaLink: "/products?category=apparel"
  }
];

interface TypingTextProps {
  text: string;
  delay?: number;
  className?: string;
}

const TypingText: React.FC<TypingTextProps> = ({ text, delay = 0, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayText(''); 
    setCurrentIndex(0);
    const startTyping = () => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prevText => prevText + text[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, 50); 
        return () => clearTimeout(timeout);
      }
    };
    
    const initialDelay = setTimeout(startTyping, delay);
    return () => clearTimeout(initialDelay);

  }, [text, currentIndex, delay]);

  return <span className={className}>{displayText}</span>;
};


interface HomePageProps {
  openQuickViewModal: (productId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ openQuickViewModal }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentBanner((prev) => (prev + 1) % heroBanners.length);
    }, 7000);
    return () => clearTimeout(timer);
  }, [currentBanner]);

  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <AnimatedPage>
      <section className="relative h-[70vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
            role="region"
            aria-roledescription="carousel"
            aria-label={`Slide ${currentBanner + 1} of ${heroBanners.length}: ${heroBanners[currentBanner].title}`}
          >
            <motion.div
                style={{ backgroundImage: `url(${heroBanners[currentBanner].imageUrl})` }}
                className="absolute inset-0 bg-cover bg-center animate-subtle-zoom-pan"
                initial={{scale:1.15}}
                animate={{scale:1}}
                transition={{duration: 7, ease: "linear"}}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease:"easeOut" }}
                className="text-white p-4"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    <TypingText text={heroBanners[currentBanner].title} delay={500} />
                </h1>
                <p className="text-lg md:text-2xl mb-8 drop-shadow-md">
                    <TypingText text={heroBanners[currentBanner].subtitle} delay={1500} />
                </p>
                <Link to={heroBanners[currentBanner].ctaLink}>
                  <Button variant="primary" size="lg">
                    {heroBanners[currentBanner].ctaText}
                    <ArrowRightIcon className="inline w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10" role="tablist" aria-label="Slides">
          {heroBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentBanner ? 'bg-electric-orange scale-125' : 'bg-white opacity-50 hover:opacity-75'}`}
              role="tab"
              aria-selected={index === currentBanner}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white dark:bg-dm-dark-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity:0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center text-deep-purple dark:text-electric-orange mb-10"
          >
            Featured Products
          </motion.h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} openQuickViewModal={openQuickViewModal} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>
      
      <RecentlyViewedProducts openQuickViewModal={openQuickViewModal} />

      <section className="py-12 md:py-20 bg-deep-purple dark:bg-dm-deep-purple text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity:0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Join the ModernShop Family
          </motion.h2>
          <motion.p 
            initial={{ opacity:0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay:0.1 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Sign up for our newsletter to receive exclusive deals, updates on new arrivals, and style tips straight to your inbox.
          </motion.p>
          <motion.div
            initial={{ opacity:0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay:0.2 }}
          >
            <Button variant="primary" size="lg" onClick={() => {
                const footerFormInput = document.querySelector('footer input[type="email"]') as HTMLInputElement;
                if(footerFormInput) {
                  footerFormInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setTimeout(() => footerFormInput.focus(), 300);
                }
            }}>Subscribe Now</Button>
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default HomePage;

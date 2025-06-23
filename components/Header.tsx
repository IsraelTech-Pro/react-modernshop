
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { NAV_LINKS } from '../constants';
import MenuIcon from '../MenuIcon'; 
import XIcon from './icons/XIcon'; 
import CartIcon from './icons/CartIcon'; 
import ChevronDownIcon from './icons/ChevronDownIcon'; 
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import SearchBar from './SearchBar';

interface HeaderProps {
  onCartIconClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartIconClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { getItemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const handleDropdownEnter = (label: string) => {
    if (window.innerWidth >= 768) { 
        setOpenDropdown(label);
    }
  };

  const handleDropdownLeave = () => {
    if (window.innerWidth >= 768) {
        setOpenDropdown(null);
    }
  };
  
  const handleDropdownClickMobile = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const renderNavLinks = (isMobile: boolean) => NAV_LINKS.map((link) => (
    link.subLinks ? (
      <div 
        key={link.label} 
        className="relative"
        onMouseEnter={isMobile ? undefined : () => handleDropdownEnter(link.label)}
        onMouseLeave={isMobile ? undefined : handleDropdownLeave}
      >
        <button 
          onClick={isMobile ? () => handleDropdownClickMobile(link.label) : undefined}
          className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${isMobile ? 'text-gray-700 dark:text-dm-light-gray hover:bg-gray-100 dark:hover:bg-dm-medium-gray' : 'text-white hover:text-electric-orange'}`}
          aria-expanded={openDropdown === link.label}
          aria-haspopup="true"
        >
          {link.label}
          <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === link.label ? 'transform rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
        {openDropdown === link.label && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobile ? 0 : 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`${isMobile ? 'pl-4 mt-1 space-y-1' : 'absolute z-20 left-0 mt-1 w-48 bg-white dark:bg-dm-medium-gray rounded-md shadow-lg py-1'}`}
          >
            {link.subLinks.map(subLink => (
              <NavLink
                key={subLink.label}
                to={subLink.href}
                onClick={closeAllMenus}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm transition-colors duration-150 ${isActive ? (isMobile ? 'text-deep-purple dark:text-electric-orange font-semibold' : 'text-deep-purple dark:text-electric-orange bg-gray-100 dark:bg-dm-dark-gray') : (isMobile ? 'text-gray-600 dark:text-dm-lighter-gray' : 'text-gray-700 dark:text-dm-light-gray hover:bg-gray-100 dark:hover:bg-dm-dark-gray')} ${isMobile ? '' : 'hover:text-deep-purple dark:hover:text-electric-orange'}`
                }
              >
                {subLink.label}
              </NavLink>
            ))}
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    ) : (
      <NavLink
        key={link.label}
        to={link.href}
        onClick={closeAllMenus}
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${isActive ? (isMobile ? 'text-deep-purple dark:text-electric-orange bg-electric-orange bg-opacity-20 dark:bg-opacity-30' : 'text-electric-orange') : (isMobile ? 'text-gray-700 dark:text-dm-light-gray hover:bg-gray-100 dark:hover:bg-dm-medium-gray' : 'text-white hover:text-electric-orange')}`
        }
      >
        {link.label}
      </NavLink>
    )
  ));


  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isSticky 
          ? 'bg-deep-purple/80 dark:bg-dm-deep-purple/80 backdrop-blur-xl shadow-soft-2xl dark:shadow-dark-soft-2xl py-3' 
          : 'bg-deep-purple/70 dark:bg-dm-deep-purple/70 backdrop-blur-lg py-4'}`
      }>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" onClick={closeAllMenus} className="text-2xl sm:text-3xl font-bold text-electric-orange">
                Modern<span className="text-white">Shop</span> <span className="text-sm text-gray-300 dark:text-dm-lighter-gray hidden sm:inline">Ghana</span>
              </Link>
            </div>
            
            <div className="flex-1 flex justify-center px-4 lg:px-8">
              <SearchBar />
            </div>

            <nav className="hidden md:flex space-x-2 items-center">
              {renderNavLinks(false)}
            </nav>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={toggleTheme}
                className="text-white hover:text-electric-orange p-2 transition-colors duration-150"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <MoonIcon className="h-5 w-5 sm:h-6 sm:w-6" /> : <SunIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
              <button 
                onClick={onCartIconClick} 
                className="relative text-white hover:text-electric-orange p-2 transition-colors duration-150"
                aria-label="Open cart panel"
              >
                <CartIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span 
                    key={`cartcount-${itemCount}`} 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20, duration: 0.3 }}
                    className="absolute -top-1.5 -right-1.5 bg-electric-orange text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center pointer-events-none"
                  >
                    {itemCount}
                  </motion.span>
                )}
                </AnimatePresence>
              </button>
              <div className="md:hidden ml-1">
                <button
                  onClick={toggleMobileMenu}
                  className="text-white hover:text-electric-orange p-2 transition-colors duration-150"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMobileMenuOpen}
                >
                  <AnimatePresence initial={false} mode="wait">
                    {isMobileMenuOpen ? 
                      <motion.div key="closeIcon" initial={{opacity:0, rotate: -90}} animate={{opacity:1, rotate:0}} exit={{opacity:0, rotate: -90}}><XIcon className="h-6 w-6" /></motion.div> : 
                      <motion.div key="menuIcon" initial={{opacity:0, rotate: 90}} animate={{opacity:1, rotate:0}} exit={{opacity:0, rotate: 90}}><MenuIcon className="h-6 w-6" /></motion.div>
                    }
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 dark:bg-black/70 z-[55] md:hidden"
              onClick={toggleMobileMenu}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-dm-dark-gray shadow-soft-2xl dark:shadow-dark-soft-2xl z-[60] md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-dm-medium-gray">
                <Link to="/" onClick={closeAllMenus} className="text-xl font-bold text-electric-orange">
                  Modern<span className="text-deep-purple dark:text-white">Shop</span> <span className="text-xs dark:text-dm-lighter-gray">Ghana</span>
                </Link>
                <button onClick={toggleMobileMenu} className="p-2 text-gray-600 dark:text-dm-light-gray hover:text-electric-orange" aria-label="Close menu">
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                {renderNavLinks(true)}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

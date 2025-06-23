
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, PanInfo } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { PRODUCTS } from '../constants';
import { Product, Review } from '../types';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard'; 
import MobileStickyAddToCartBar from '../components/MobileStickyAddToCartBar';
import RecentlyViewedProducts from '../components/RecentlyViewedProducts';

const SWIPE_CONFIDENCE_THRESHOLD = 10000;

interface ProductDetailPageProps {
  openQuickViewModal: (productId: string) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ openQuickViewModal }) => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [[currentImageIndex, direction], setCurrentImageIndexState] = useState([0, 0]);
  
  const { addToCart } = useCart();
  const [showStickyBar, setShowStickyBar] = useState(false);
  const productInfoRef = useRef<HTMLDivElement>(null); 

  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewHoverRating, setNewReviewHoverRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false);
  const [reviewFormError, setReviewFormError] = useState<string | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (productInfoRef.current) {
      const productInfoBottom = productInfoRef.current.offsetTop + productInfoRef.current.offsetHeight;
      if (latest > productInfoBottom) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    } else {
        setShowStickyBar(false);
    }
  });

  useEffect(() => {
    setLoading(true);
    setProduct(null); 
    setNewReviewName(''); setNewReviewRating(0); setNewReviewHoverRating(0); setNewReviewText(''); setReviewFormError(null);
    setTimeout(() => {
      const foundProduct = PRODUCTS.find(p => p.id === productId);
      setProduct(foundProduct || null);
      if (foundProduct) {
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]') as string[];
        const updatedRecentlyViewed = [foundProduct.id, ...recentlyViewed.filter(id => id !== foundProduct.id)].slice(0, 10);
        localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed));
      }
      setLoading(false);
      setCurrentImageIndexState([0,0]);
      setShowStickyBar(false);
      setActiveTab('description'); 
    }, 500);
  }, [productId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><LoadingSpinner size="lg" /></div>;
  }

  if (!product) {
    return <AnimatedPage><div className="text-center py-20 dark:text-dm-light-gray">Product not found.</div></AnimatedPage>;
  }

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.imageUrl];

  const paginate = (newDirection: number) => {
    let newIndex = currentImageIndex + newDirection;
    if (newIndex < 0) {
      newIndex = galleryImages.length - 1;
    } else if (newIndex >= galleryImages.length) {
      newIndex = 0;
    }
    setCurrentImageIndexState([newIndex, newDirection]);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) {
      paginate(1); 
    } else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) {
      paginate(-1); 
    }
  };

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };


  const handleAddToCart = async () => {
    if (addingToCart || addedSuccess) return;
    setAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 750));
    addToCart(product);
    setAddingToCart(false);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1500); 
  };
  
  const renderStars = (rating: number, interactive: boolean = false, setRating?: (r:number)=>void, setHoverRating?: (r:number)=>void, currentHover?: number) => {
    return Array(5).fill(0).map((_, i) => {
      const starValue = i + 1;
      const isFilled = currentHover !== undefined && currentHover > 0 ? starValue <= currentHover : starValue <= rating;
      const color = isFilled ? 'text-electric-orange' : 'text-gray-300 dark:text-dm-medium-gray';
      
      const starSvg = (
        <svg 
            className={`w-5 h-5 ${color} ${interactive ? 'cursor-pointer' : ''}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
            onMouseEnter={interactive && setHoverRating ? () => setHoverRating(starValue) : undefined}
            onMouseLeave={interactive && setHoverRating ? () => setHoverRating(0) : undefined}
            onClick={interactive && setRating ? () => setRating(starValue) : undefined}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.454a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.373-2.454a1 1 0 00-1.176 0l-3.373 2.454c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      );

      if (interactive) {
        return (
          <motion.div
            key={i}
            whileHover={{ scale: 1.25, y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            {starSvg}
          </motion.div>
        );
      }
      return <div key={i}>{starSvg}</div>;
    });
  };

  const handleReviewSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReviewFormError(null);

    if (!newReviewName.trim()) {
      setReviewFormError("Please enter your name.");
      return;
    }
    if (newReviewRating === 0) {
      setReviewFormError("Please select a rating.");
      return;
    }
    if (!newReviewText.trim()) {
      setReviewFormError("Please enter your review.");
      return;
    }

    setIsSubmittingReview(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    const newReview: Review = {
      id: Date.now().toString(),
      author: newReviewName,
      rating: newReviewRating,
      comment: newReviewText,
      date: new Date().toISOString().split('T')[0],
    };

    setProduct(prevProduct => 
      prevProduct ? ({ ...prevProduct, reviews: [...(prevProduct.reviews || []), newReview] }) : null
    );

    setIsSubmittingReview(false);
    setReviewSubmitSuccess(true);
    setNewReviewName('');
    setNewReviewRating(0);
    setNewReviewHoverRating(0);
    setNewReviewText('');
    
    setTimeout(() => {
      setReviewSubmitSuccess(false);
    }, 2000);
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 dark:text-dm-light-gray">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative group overflow-hidden rounded-lg shadow-lg dark:shadow-dark-soft-lg aspect-square bg-gray-100 dark:bg-dm-dark-gray">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={currentImageIndex}
                  src={galleryImages[currentImageIndex]}
                  alt={`${product.name} - view ${currentImageIndex + 1}`}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={handleDragEnd}
                  className="absolute w-full h-full object-contain cursor-grab active:cursor-grabbing transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
              </AnimatePresence>
            </div>
            {galleryImages.length > 1 && (
              <>
                <button 
                    onClick={() => paginate(-1)} 
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition-all z-10 focus:outline-none focus:ring-2 focus:ring-electric-orange"
                    aria-label="Previous image"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button 
                    onClick={() => paginate(1)} 
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition-all z-10 focus:outline-none focus:ring-2 focus:ring-electric-orange"
                    aria-label="Next image"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
                <div className="flex justify-center mt-4 space-x-2">
                    {galleryImages.map((imgSrc, index) => (
                        <button 
                            key={index} 
                            onClick={() => setCurrentImageIndexState([index, index > currentImageIndex ? 1 : -1])}
                            className={`w-16 h-16 overflow-hidden rounded-md border-2 transition-all duration-200 ease-out
                                        ${index === currentImageIndex ? 'border-electric-orange scale-110 shadow-md' : 'border-transparent dark:border-dm-medium-gray hover:border-deep-purple/50 dark:hover:border-electric-orange/50 opacity-70 hover:opacity-100'}`}
                            aria-label={`View image ${index + 1}`}
                        >
                            <img src={imgSrc} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
              </>
            )}
          </motion.div>

          <motion.div 
            ref={productInfoRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-deep-purple dark:text-electric-orange">{product.name}</h1>
            <p className="text-sm text-gray-500 dark:text-dm-lighter-gray">{product.category}</p>
            <p className="text-3xl font-semibold text-electric-orange">₵{product.price.toFixed(2)}</p>
            <div className="flex items-center">
              {product.reviews && product.reviews.length > 0 && (
                <>
                  <div className="flex">{renderStars(Math.round(product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length))}</div>
                  <span className="ml-2 text-gray-600 dark:text-dm-lighter-gray">({product.reviews.length} reviews)</span>
                </>
              )}
            </div>
            <p className="text-gray-700 dark:text-dm-light-gray leading-relaxed">{product.description.substring(0,150)}...</p>
            <div className="space-y-3 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleAddToCart} 
                disabled={product.stock === 0 || addingToCart || addedSuccess}
                isLoading={addingToCart}
                isSuccess={addedSuccess}
                className="sm:flex-grow"
              >
                {product.stock === 0 ? 'Out of Stock' : (addedSuccess ? 'Added!' : 'Add to Cart')}
              </Button>
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-red-500 dark:text-red-400 font-medium">Only {product.stock} left in stock!</p>
            )}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-12 md:mt-16"
        >
          <div className="border-b border-gray-200 dark:border-dm-medium-gray">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {['description', 'specs', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'description' | 'specs' | 'reviews')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200
                    ${activeTab === tab
                      ? 'border-electric-orange text-electric-orange'
                      : 'border-transparent text-gray-500 dark:text-dm-lighter-gray hover:text-gray-700 dark:hover:text-dm-light-gray hover:border-gray-300 dark:hover:border-dm-medium-gray'
                    }`}
                  role="tab"
                  aria-selected={activeTab === tab}
                >
                  {tab} {tab === 'reviews' && product.reviews ? `(${product.reviews.length})` : ''}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                role="tabpanel"
                className="prose dark:prose-invert max-w-none prose-p:text-gray-700 dark:prose-p:text-dm-light-gray prose-strong:text-gray-800 dark:prose-strong:text-dm-light-gray prose-headings:text-deep-purple dark:prose-headings:text-electric-orange"
              >
                {activeTab === 'description' && <p>{product.description}</p>}
                {activeTab === 'specs' && product.specs && (
                  <ul className="space-y-2 list-disc list-inside">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <li key={key}><strong>{key}:</strong> {value}</li>
                    ))}
                  </ul>
                )}
                 {activeTab === 'reviews' && (
                  <div className="space-y-8">
                    {(!product.reviews || product.reviews.length === 0) && !reviewSubmitSuccess && (
                       <p className="text-gray-600 dark:text-dm-lighter-gray">Be the first to review this product!</p>
                    )}
                    {product.reviews && product.reviews.length > 0 && (
                      <div className="space-y-6">
                        {product.reviews.map((review: Review) => (
                          <div key={review.id} className="border-b dark:border-dm-medium-gray pb-4 last:border-b-0">
                            <div className="flex items-center mb-1">
                              <div className="flex">{renderStars(review.rating)}</div>
                              <p className="ml-2 font-semibold text-gray-800 dark:text-dm-light-gray">{review.author}</p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-dm-lighter-gray mb-2">{new Date(review.date).toLocaleDateString()}</p>
                            <p>{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-8 pt-8 border-t dark:border-dm-medium-gray">
                      <h3 className="text-xl font-semibold text-deep-purple dark:text-electric-orange mb-6">Write a Review</h3>
                      <form onSubmit={handleReviewSubmit} className="space-y-6">
                        <div className="relative floating-label-input">
                          <input
                            type="text"
                            id="newReviewName"
                            name="newReviewName"
                            value={newReviewName}
                            onChange={(e) => setNewReviewName(e.target.value)}
                            placeholder=" "
                            className="block w-full px-3 py-3.5 text-dark-gray dark:text-dm-light-gray bg-white dark:bg-dm-medium-gray border border-gray-300 dark:border-dm-dark-gray rounded-md appearance-none focus:outline-none focus:ring-1 focus:border-deep-purple dark:focus:border-electric-orange peer transition-colors"
                            required
                          />
                          <label
                            htmlFor="newReviewName"
                            className="absolute text-gray-500 dark:text-dm-lighter-gray duration-200 transform -translate-y-3.5 scale-75 top-3.5 z-10 origin-[0] left-3 peer-focus:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 dark:bg-dm-medium-gray bg-white px-1 pointer-events-none"
                          >
                            Your Name
                          </label>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-dm-light-gray mb-2">Your Rating</label>
                          <div className="flex items-center space-x-1">
                            {renderStars(newReviewRating, true, setNewReviewRating, setNewReviewHoverRating, newReviewHoverRating)}
                          </div>
                        </div>

                        <div className="relative floating-label-input">
                          <textarea
                            id="newReviewText"
                            name="newReviewText"
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            rows={4}
                            placeholder=" "
                            className="block w-full px-3 py-3.5 text-dark-gray dark:text-dm-light-gray bg-white dark:bg-dm-medium-gray border border-gray-300 dark:border-dm-dark-gray rounded-md appearance-none focus:outline-none focus:ring-1 focus:border-deep-purple dark:focus:border-electric-orange peer transition-colors h-32 resize-none"
                            required
                          />
                           <label
                            htmlFor="newReviewText"
                            className="absolute text-gray-500 dark:text-dm-lighter-gray duration-200 transform -translate-y-3.5 scale-75 top-3.5 z-10 origin-[0] left-3 peer-focus:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 dark:bg-dm-medium-gray bg-white px-1 pointer-events-none"
                          >
                            Your Review
                          </label>
                        </div>
                        
                        <AnimatePresence>
                          {reviewFormError && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500/50 rounded-md text-sm flex items-center gap-2"
                            >
                              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                              <span>{reviewFormError}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <div>
                          <Button 
                            type="submit" 
                            variant="primary" 
                            isLoading={isSubmittingReview} 
                            isSuccess={reviewSubmitSuccess}
                            disabled={isSubmittingReview || reviewSubmitSuccess}
                          >
                            Submit Review
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {relatedProducts.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="mt-16 md:mt-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-deep-purple dark:text-electric-orange mb-8">Related Products</h2>
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} openQuickViewModal={openQuickViewModal} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
       <RecentlyViewedProducts openQuickViewModal={openQuickViewModal} />
      {product && <MobileStickyAddToCartBar product={product} isVisible={showStickyBar && window.innerWidth < 768} onAddToCart={handleAddToCart} isLoading={addingToCart} isSuccess={addedSuccess} />}
    </AnimatedPage>
  );
};

export default ProductDetailPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { SHIPPING_COST, GHANA_PHONE_NUMBER, MOBILE_MONEY_PROVIDERS } from '../constants';
import { CheckoutPaymentOption, MobileMoneyDetails, MobileMoneyProvider as MomoProviderType } from '../types';

import MtnMoMoIcon from '../components/icons/MtnMoMoIcon';
import TelecelCashIcon from '../components/icons/TelecelCashIcon';
import PhoneIcon from '../components/icons/PhoneIcon';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';


const steps = ['Details', 'Payment', 'Review'];

interface FormData {
  fullName: string;
  address: string;
  city: string;
  phoneNumber: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  mobileMoney: MobileMoneyDetails;
}

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { cartItems, getCartTotal, clearCart, getFirstCartItem } = useCart();
  const navigate = useNavigate();
  
  const [checkoutOption, setCheckoutOption] = useState<CheckoutPaymentOption | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '', address: '', city: '', phoneNumber: '',
    cardNumber: '', expiryDate: '', cvv: '',
    mobileMoney: { number: '', nameOnAccount: '', provider: '' }
  });

  const [paymentMethod, setPaymentMethod] = useState<'CARD' | MomoProviderType>('CARD');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isOrderFinalized, setIsOrderFinalized] = useState(false);

  const subtotal = getCartTotal();
  const total = subtotal + (subtotal > 0 ? SHIPPING_COST : 0);

  useEffect(() => {
    if (cartItems.length === 0 && !isOrderFinalized) {
      navigate('/cart');
    }
  }, [cartItems, navigate, isOrderFinalized]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMobileMoneyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      mobileMoney: { ...prev.mobileMoney, [name]: value }
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return;
    setIsPlacingOrder(true);
    // console.log('Order placed:', formData, cartItems, paymentMethod); // For debugging
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    setIsPlacingOrder(false);
    setIsOrderFinalized(true);
    clearCart();
    
    setTimeout(() => {
        navigate('/'); 
    }, 4000);
  };

  const handleSelectDeliveryFirst = () => {
    setIsOrderFinalized(true);
  }

  const firstCartItem = getFirstCartItem();
  const whatsAppMessage = firstCartItem 
    ? `Hi ModernShop Ghana, I want to confirm my order. My first item is: ${firstCartItem.name} - ${window.location.origin}/#/product/${firstCartItem.id}` 
    : "Hi ModernShop Ghana, I want to confirm my order.";


  if (isOrderFinalized && checkoutOption === 'PAY_ONLINE') {
    return (
      <AnimatedPage>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay:0.1 }}
          >
            <svg className="w-24 h-24 text-green-500 dark:text-green-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h1 className="text-3xl font-bold text-deep-purple dark:text-electric-orange mb-4">Order Placed Successfully!</h1>
            <p className="text-lg text-gray-700 dark:text-dm-light-gray">Thank you for your purchase. You will receive a confirmation message shortly.</p>
          </motion.div>
        </div>
      </AnimatedPage>
    );
  }

  if (isOrderFinalized && checkoutOption === 'DELIVERY_FIRST') {
     return (
      <AnimatedPage>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay:0.1 }}
          >
            <svg className="w-24 h-24 text-electric-orange mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.458 4.374a1 1 0 01-.226 1.057l-2 2.333a11.042 11.042 0 005.516 5.516l2.333-2a1 1 0 011.057-.226l4.374 1.458A1 1 0 0119 15.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <h1 className="text-3xl font-bold text-deep-purple dark:text-electric-orange mb-4">Delivery Option Selected!</h1>
            <p className="text-lg text-gray-700 dark:text-dm-light-gray mb-6">Thank you! Our team will contact you shortly on {formData.phoneNumber || GHANA_PHONE_NUMBER.slice(0,7)+"..."} to arrange delivery and payment. You can also reach out to us:</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <a href={`tel:${GHANA_PHONE_NUMBER}`} className="w-full sm:w-auto">
                    <Button variant="primary" size="lg" className="w-full animate-pulse-once hover:animate-none">
                        <PhoneIcon className="w-5 h-5 mr-2" /> Call Us Now
                    </Button>
                </a>
                <a href={`https://wa.me/${GHANA_PHONE_NUMBER.replace('+', '')}?text=${encodeURIComponent(whatsAppMessage)}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                     <Button variant="secondary" size="lg" className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 animate-pulse-once hover:animate-none">
                        <WhatsAppIcon className="w-5 h-5 mr-2" /> WhatsApp Us
                    </Button>
                </a>
            </div>
             <Button variant="outline" size="md" onClick={() => navigate('/')} className="mt-8">Back to Shopping</Button>
          </motion.div>
        </div>
      </AnimatedPage>
    );
  }


  if (cartItems.length === 0 && !isOrderFinalized) {
    return (
        <AnimatedPage>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
                 <h1 className="text-3xl font-bold text-deep-purple dark:text-electric-orange mb-4">Checkout</h1>
                 <p className="text-lg text-gray-700 dark:text-dm-light-gray mb-6">Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
                 <Button onClick={() => navigate('/products')} variant="primary">Shop Products</Button>
            </div>
        </AnimatedPage>
    );
  }

  const renderFloatingLabelInput = (name: keyof Omit<FormData, 'mobileMoney'>, label: string, value: string, onChangeCb: (e: React.ChangeEvent<HTMLInputElement>) => void, type: string = 'text', placeholder?: string) => (
    <div className="relative floating-label-input">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChangeCb}
        placeholder={placeholder || ' '}
        className="block w-full px-3 py-3.5 text-dark-gray dark:text-dm-light-gray bg-white dark:bg-dm-medium-gray border border-gray-300 dark:border-dm-dark-gray rounded-md appearance-none focus:outline-none focus:ring-1 focus:border-deep-purple dark:focus:border-electric-orange peer transition-colors"
        required
      />
      <label
        htmlFor={name}
        className="absolute text-gray-500 dark:text-dm-lighter-gray duration-200 transform -translate-y-3.5 scale-75 top-3.5 z-10 origin-[0] left-3 peer-focus:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 dark:bg-dm-medium-gray bg-white px-1 pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
  
  const renderStepContent = () => {
    const motionProps = {
        initial:{ opacity: 0, x: currentStep === 0 ? 0 : 30 }, 
        animate:{ opacity: 1, x:0 },
        exit:{ opacity: 0, x: -30 },
        transition:{ type: "tween" as const, ease:"easeInOut" as const, duration: 0.3}
    };

    switch (currentStep) {
      case 0: 
        return (
          <motion.div {...motionProps} key="details" className="space-y-6">
            <h2 className="text-2xl font-semibold text-deep-purple dark:text-electric-orange mb-4">Your Details</h2>
            {renderFloatingLabelInput('fullName', 'Full Name', formData.fullName, handleInputChange)}
            {renderFloatingLabelInput('phoneNumber', 'Phone Number (for delivery)', formData.phoneNumber, handleInputChange, 'tel')}
            {renderFloatingLabelInput('address', 'Delivery Address / Area', formData.address, handleInputChange)}
            {renderFloatingLabelInput('city', 'City / Town', formData.city, handleInputChange)}
          </motion.div>
        );
      case 1: 
        return (
          <motion.div {...motionProps} key="payment" className="space-y-6">
            <h2 className="text-2xl font-semibold text-deep-purple dark:text-electric-orange mb-6">Payment Method</h2>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    {(['CARD', ...MOBILE_MONEY_PROVIDERS.map(p => p.id)] as const).map(method => {
                        const provider = MOBILE_MONEY_PROVIDERS.find(p => p.id === method);
                        return (
                        <button
                            key={method}
                            onClick={() => {
                                setPaymentMethod(method as 'CARD' | MomoProviderType);
                                if (provider) {
                                    setFormData(prev => ({...prev, mobileMoney: {...prev.mobileMoney, provider: provider.id}}));
                                } else {
                                     setFormData(prev => ({...prev, mobileMoney: {...prev.mobileMoney, provider: ''}}));
                                }
                            }}
                            className={`flex-1 p-4 border rounded-lg transition-all duration-200 flex items-center justify-center gap-3
                                ${paymentMethod === method ? 'border-electric-orange ring-2 ring-electric-orange shadow-lg dark:shadow-electric-orange/30' : 'border-gray-300 dark:border-dm-dark-gray hover:border-gray-400 dark:hover:border-dm-light-gray'}`}
                        >
                            {method === 'CARD' && <svg className="w-6 h-6 text-deep-purple dark:text-dm-light-gray" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 6a2 2 0 00-2 2v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 00-2-2H4z"></path></svg>}
                            {method === 'MTN_MOMO' && <MtnMoMoIcon className="w-10 h-10" />}
                            {method === 'TELECEL_CASH' && <TelecelCashIcon className="w-10 h-10" />}
                            <span className="font-medium text-sm sm:text-base text-dark-gray dark:text-dm-light-gray">{method === 'CARD' ? 'Card' : provider?.name}</span>
                        </button>
                    );})}
                </div>

                {paymentMethod === 'CARD' && (
                    <div className="space-y-6 animate-fade-in">
                        {renderFloatingLabelInput('cardNumber', 'Card Number', formData.cardNumber, handleInputChange, 'tel')}
                        {renderFloatingLabelInput('expiryDate', 'Expiry Date (MM/YY)', formData.expiryDate, handleInputChange, 'text', 'MM/YY')}
                        {renderFloatingLabelInput('cvv', 'CVV', formData.cvv, handleInputChange, 'tel')}
                    </div>
                )}
                {paymentMethod !== 'CARD' && MOBILE_MONEY_PROVIDERS.find(p=>p.id === paymentMethod) && (
                     <div className="space-y-6 animate-fade-in">
                        <div className="relative floating-label-input">
                            <input type="tel" id="mobileMoneyNumber" name="number" value={formData.mobileMoney.number} onChange={handleMobileMoneyChange} placeholder=" " className="peer block w-full px-3 py-3.5 text-dark-gray dark:text-dm-light-gray bg-white dark:bg-dm-medium-gray border border-gray-300 dark:border-dm-dark-gray rounded-md appearance-none focus:outline-none focus:ring-1 focus:border-deep-purple dark:focus:border-electric-orange transition-colors" required />
                            <label htmlFor="mobileMoneyNumber" className="absolute text-gray-500 dark:text-dm-lighter-gray duration-200 transform -translate-y-3.5 scale-75 top-3.5 z-10 origin-[0] left-3 peer-focus:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 dark:bg-dm-medium-gray bg-white px-1 pointer-events-none">Mobile Money Number</label>
                        </div>
                        <div className="relative floating-label-input">
                            <input type="text" id="nameOnAccount" name="nameOnAccount" value={formData.mobileMoney.nameOnAccount} onChange={handleMobileMoneyChange} placeholder=" " className="peer block w-full px-3 py-3.5 text-dark-gray dark:text-dm-light-gray bg-white dark:bg-dm-medium-gray border border-gray-300 dark:border-dm-dark-gray rounded-md appearance-none focus:outline-none focus:ring-1 focus:border-deep-purple dark:focus:border-electric-orange transition-colors" required />
                            <label htmlFor="nameOnAccount" className="absolute text-gray-500 dark:text-dm-lighter-gray duration-200 transform -translate-y-3.5 scale-75 top-3.5 z-10 origin-[0] left-3 peer-focus:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 dark:bg-dm-medium-gray bg-white px-1 pointer-events-none">Name on MoMo Account</label>
                        </div>
                         <p className="text-xs text-gray-500 dark:text-dm-lighter-gray mt-1">Ensure the name matches your Mobile Money registration.</p>
                    </div>
                )}
            </div>
          </motion.div>
        );
      case 2: 
        return (
          <motion.div {...motionProps} key="review" className="space-y-6">
            <h2 className="text-2xl font-semibold text-deep-purple dark:text-electric-orange mb-4">Review Your Order</h2>
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-dm-light-gray">Contact & Delivery Details:</h3>
              <p className="dark:text-dm-lighter-gray">{formData.fullName || "N/A"}</p>
              <p className="dark:text-dm-lighter-gray">{formData.phoneNumber || "N/A"}</p>
              <p className="dark:text-dm-lighter-gray">{formData.address || "N/A"}, {formData.city || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-dm-light-gray">Payment Method:</h3>
              {paymentMethod === 'CARD' ? (
                <p className="dark:text-dm-lighter-gray">Card ending in: {formData.cardNumber.length >=4 ? `**** **** **** ${formData.cardNumber.slice(-4)}` : "N/A"}</p>
              ) : (
                <p className="dark:text-dm-lighter-gray">{MOBILE_MONEY_PROVIDERS.find(p=>p.id === paymentMethod)?.name}: {formData.mobileMoney.number}</p>
              )}
            </div>
            <div className="mt-4 border-t dark:border-dm-dark-gray pt-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-dm-light-gray mb-2">Order Items:</h3>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm py-1 dark:text-dm-lighter-gray">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₵{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold mt-2 dark:text-dm-light-gray">
                <span>Subtotal:</span>
                <span>₵{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold dark:text-dm-light-gray">
                <span>Shipping:</span>
                <span>₵{subtotal > 0 ? SHIPPING_COST.toFixed(2) : '0.00'}</span>
              </div>
              <div className="flex justify-between font-bold text-xl mt-2 text-deep-purple dark:text-electric-orange">
                <span>Total:</span>
                <span>₵{total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        );
      default: return null;
    }
  };

  if (!checkoutOption) {
    return (
        <AnimatedPage>
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-deep-purple dark:text-electric-orange mb-12 text-center">Checkout Options</h1>
                <div className="max-w-md mx-auto space-y-6">
                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}}>
                        <Button fullWidth size="lg" variant="primary" onClick={() => setCheckoutOption('PAY_ONLINE')}>
                            Pay Online Now (Card / Mobile Money)
                        </Button>
                    </motion.div>
                     <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}>
                        <Button fullWidth size="lg" variant="secondary" onClick={() => setCheckoutOption('DELIVERY_FIRST')}>
                            Arrange Delivery & Pay on Delivery/Pickup
                        </Button>
                    </motion.div>
                </div>
            </div>
        </AnimatedPage>
    );
  }
  
  if (checkoutOption === 'DELIVERY_FIRST' && !isOrderFinalized) {
      if (currentStep === 0) {
          return (
            <AnimatedPage>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-deep-purple dark:text-electric-orange mb-8 text-center">Your Details for Delivery</h1>
                <div className="max-w-xl mx-auto bg-white dark:bg-dm-medium-gray p-6 sm:p-8 rounded-lg shadow-soft-xl dark:shadow-dark-soft-xl">
                  <motion.div key="details-delivery" className="space-y-6" initial={{opacity:0}} animate={{opacity:1}}>
                    {renderFloatingLabelInput('fullName', 'Full Name', formData.fullName, handleInputChange)}
                    {renderFloatingLabelInput('phoneNumber', 'Phone Number (for delivery confirmation)', formData.phoneNumber, handleInputChange, 'tel')}
                    {renderFloatingLabelInput('address', 'Delivery Address / Area', formData.address, handleInputChange)}
                    {renderFloatingLabelInput('city', 'City / Town', formData.city, handleInputChange)}
                  </motion.div>
                  <div className="mt-10 flex justify-end">
                     <Button variant="primary" onClick={handleSelectDeliveryFirst} disabled={!formData.fullName || !formData.phoneNumber || !formData.address}>
                        Confirm Details & Proceed
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedPage>
          );
      }
  }


  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-deep-purple dark:text-electric-orange mb-8 text-center">
          {checkoutOption === 'PAY_ONLINE' ? 'Complete Your Order' : 'Arrange Delivery'}
        </h1>
        
        {checkoutOption === 'PAY_ONLINE' && (
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="flex items-start">
              {steps.map((step, index) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center text-center w-1/3">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2
                        ${index <= currentStep ? 'bg-electric-orange text-white border-electric-orange' : 'bg-gray-100 dark:bg-dm-medium-gray text-gray-500 dark:text-dm-lighter-gray border-gray-300 dark:border-dm-dark-gray'}`}
                      animate={{ scale: index === currentStep ? 1.15 : 1 }}
                      transition={{ type: 'spring', stiffness:300, damping: 15 }}
                    >
                      {isOrderFinalized || index < currentStep ? 
                          <motion.svg initial={{scale:0}} animate={{scale:1}} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></motion.svg>
                          : index + 1}
                    </motion.div>
                    <p className={`mt-2 text-xs sm:text-sm ${index <= currentStep ? 'text-electric-orange font-semibold' : 'text-gray-500 dark:text-dm-lighter-gray'}`}>{step}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mt-5 mx-1 sm:mx-2 rounded-full ${index < currentStep || isOrderFinalized ? 'bg-electric-orange' : 'bg-gray-200 dark:bg-dm-dark-gray'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-xl mx-auto bg-white dark:bg-dm-medium-gray p-6 sm:p-8 rounded-lg shadow-soft-xl dark:shadow-dark-soft-xl">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
          {checkoutOption === 'PAY_ONLINE' && (
            <div className="mt-10 flex justify-between">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 0 || isPlacingOrder}>
                Back
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button variant="primary" onClick={nextStep} disabled={isPlacingOrder}>
                  Next
                </Button>
              ) : (
                <Button variant="primary" onClick={handlePlaceOrder} isLoading={isPlacingOrder} isSuccess={isOrderFinalized} disabled={isPlacingOrder || isOrderFinalized}>
                  {isOrderFinalized ? 'Order Placed' : `Pay ₵${total.toFixed(2)}`}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CheckoutPage;

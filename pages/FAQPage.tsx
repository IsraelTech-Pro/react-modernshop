
import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronDownIcon from '../components/icons/ChevronDownIcon';
import Button from '../components/Button';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  { category: "Ordering", question: "How do I place an order?", answer: "To place an order, simply browse our products, add items to your cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase." },
  { category: "Ordering", question: "Can I modify or cancel my order after placing it?", answer: "Once an order is placed, modifications or cancellations may be possible if it hasn't been processed for shipping. Please contact our support team immediately for assistance." },
  { category: "Ordering", question: "How do I track my order?", answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number on the carrier's website to track your package." },
  { category: "Payment", question: "What payment methods do you accept?", answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, MTN MoMo, Telecel Cash and other secure payment gateways. All available options will be displayed at checkout." },
  { category: "Payment", question: "Is my payment information secure?", answer: "Yes, we use industry-standard SSL encryption to protect your payment details. Your security is our top priority." },
  { category: "Shipping", question: "What are your shipping options and costs?", answer: "We offer various shipping options. Costs are calculated at checkout based on your location and selected shipping method. Standard shipping is ₵30.00 within Accra." },
  { category: "Shipping", question: "How long does shipping take?", answer: "Shipping times vary. Standard shipping typically takes 1-3 business days within Accra, and 2-5 days for other regions in Ghana." },
  { category: "Returns", question: "What is your return policy?", answer: "We offer a 7-day return policy for most items in new and unused condition with original packaging. Please visit our Shipping & Returns page for detailed information." },
  { category: "Returns", question: "How do I initiate a return?", answer: "To initiate a return, please contact our customer support team with your order number and reason for return. They will guide you through the process." },
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <AnimatedPage>
      <div className="bg-white dark:bg-dm-dark-gray py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-deep-purple dark:text-electric-orange mb-4">Frequently Asked Questions</h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-dm-lighter-gray max-w-2xl mx-auto">
              Find answers to common questions about ModernShop Ghana, our products, and services.
            </p>
          </motion.div>

          {categories.map((category, catIndex) => (
            <motion.section 
              key={category} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{ ...sectionVariants, visible: { ...sectionVariants.visible, transition: { ...sectionVariants.visible.transition, delay: catIndex * 0.1 }}}}
              className="mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-deep-purple dark:text-electric-orange mb-6 border-b dark:border-dm-medium-gray pb-3">{category}</h2>
              <div className="space-y-4">
                {faqs.filter(faq => faq.category === category).map((faq, index) => {
                  const globalIndex = faqs.findIndex(f => f.question === faq.question);
                  return (
                  <div key={globalIndex} className="border border-gray-200 dark:border-dm-medium-gray rounded-lg overflow-hidden shadow-sm dark:shadow-dark-soft-md">
                    <button
                      onClick={() => toggleFAQ(globalIndex)}
                      className="flex justify-between items-center w-full p-4 sm:p-5 text-left bg-gray-50 dark:bg-dm-medium-gray hover:bg-gray-100 dark:hover:bg-dm-dark-gray focus:outline-none focus-visible:ring focus-visible:ring-electric-orange focus-visible:ring-opacity-75"
                      aria-expanded={openIndex === globalIndex}
                      aria-controls={`faq-answer-${globalIndex}`}
                    >
                      <span className="text-md sm:text-lg font-medium text-gray-800 dark:text-dm-light-gray">{faq.question}</span>
                      <ChevronDownIcon 
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-dm-lighter-gray transition-transform duration-200 ${openIndex === globalIndex ? 'transform rotate-180' : ''}`} 
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openIndex === globalIndex && (
                        <motion.div
                          id={`faq-answer-${globalIndex}`}
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: 'auto', marginTop: '0.75rem', marginBottom: '0.75rem' },
                            collapsed: { opacity: 0, height: 0, marginTop: '0rem', marginBottom: '0rem' }
                          }}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="px-4 sm:px-5 bg-white dark:bg-dm-medium-gray"
                          role="region"
                        >
                          <p className="text-gray-600 dark:text-dm-lighter-gray leading-relaxed text-sm sm:text-base pb-4">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )})}
              </div>
            </motion.section>
          ))}
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="mt-16 text-center bg-light-gray dark:bg-dm-medium-gray p-8 rounded-lg shadow-soft-xl dark:shadow-dark-soft-xl"
          >
            <h3 className="text-xl font-semibold text-deep-purple dark:text-electric-orange mb-3">Can't find an answer?</h3>
            <p className="text-gray-600 dark:text-dm-lighter-gray mb-6">
              If your question isn't listed here, please don't hesitate to contact our support team.
            </p>
            <Button variant="primary" size="lg" onClick={() => window.location.href = '#/contact'}>
              Contact Support
            </Button>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default FAQPage;

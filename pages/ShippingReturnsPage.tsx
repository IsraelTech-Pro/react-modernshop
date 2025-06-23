
import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';

const ShippingReturnsPage: React.FC = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
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
            <h1 className="text-4xl md:text-5xl font-bold text-deep-purple dark:text-electric-orange mb-4">Shipping & Returns</h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-dm-lighter-gray max-w-2xl mx-auto">
              Everything you need to know about how we get your products to you and what to do if you need to send something back.
            </p>
          </motion.div>

          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
            className="mb-12 md:mb-16 p-6 md:p-8 bg-light-gray dark:bg-dm-medium-gray rounded-lg shadow-soft-xl dark:shadow-dark-soft-xl"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-deep-purple dark:text-electric-orange mb-6">Shipping Policy</h2>
            <div className="space-y-6 text-gray-700 dark:text-dm-light-gray leading-relaxed">
              <motion.div variants={listItemVariants}>
                <h3 className="text-xl font-medium text-gray-800 dark:text-dm-lighter-gray mb-2">Order Processing</h3>
                <p>Orders are typically processed and shipped within 1-2 business days (excluding weekends and holidays) after payment confirmation. You will receive a notification once your order has shipped.</p>
              </motion.div>
              <motion.div variants={listItemVariants}>
                <h3 className="text-xl font-medium text-gray-800 dark:text-dm-lighter-gray mb-2">Shipping Rates & Delivery Estimates</h3>
                <p>Shipping charges for your order will be calculated and displayed at checkout. Our standard shipping rate is ₵30.00 within Accra. Delivery estimates are as follows:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Standard Shipping (Accra): 1-3 business days</li>
                  <li>Standard Shipping (Other Regions): 2-5 business days</li>
                </ul>
                <p className="mt-2 text-sm">Please note that delivery times are estimates and may vary due to carrier delays or unforeseen circumstances.</p>
              </motion.div>
              <motion.div variants={listItemVariants}>
                <h3 className="text-xl font-medium text-gray-800 dark:text-dm-lighter-gray mb-2">Shipment Confirmation & Order Tracking</h3>
                <p>For online payments, you will receive a shipment confirmation email containing your tracking number(s) once your order has shipped. The tracking number will be active within 24 hours. For "Delivery First" orders, our team will coordinate with you directly.</p>
              </motion.div>
              <motion.div variants={listItemVariants}>
                <h3 className="text-xl font-medium text-gray-800 dark:text-dm-lighter-gray mb-2">International Shipping</h3>
                <p>Currently, we only ship within Ghana. We are working on expanding our shipping destinations in the future.</p>
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
            className="p-6 md:p-8 bg-light-gray dark:bg-dm-medium-gray rounded-lg shadow-soft-xl dark:shadow-dark-soft-xl"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-deep-purple dark:text-electric-orange mb-6">Return Policy</h2>
            <div className="space-y-6 text-gray-700 dark:text-dm-light-gray leading-relaxed">
              <motion.div variants={listItemVariants}>
                <h3 className="text-xl font-medium text-gray-800 dark:text-dm-lighter-gray mb-2">Eligibility for Returns</h3>
                <p>We accept returns for most items within 7 days of delivery. To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging. Some items, such as clearance items or personal care goods, may be non-returnable. Please check the product description or contact us.</p>
              </motion.div>
              <motion.div variants={listItemVariants}>
                <h3 className="text-xl font-medium text-gray-800 dark:text-dm-lighter-gray mb-2">How to Initiate a Return</h3>
                <p>To initiate a return, please contact our customer support team at <a href="mailto:support@modernshopgh.com" className="text-electric-orange hover:underline">support@modernshopgh.com</a> or call us at <a href="tel:+233240000000" className="text-electric-orange hover:underline">+233 24 000 0000</a>. Please provide your order number and the reason for your return.</p>
              </motion.div>
              <motion.div variants={listItemVariants}>
                <h3 className="text-xl font-medium text-gray-800 dark:text-dm-lighter-gray mb-2">Refunds</h3>
                <p>Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original method of payment within 5-7 business days.</p>
              </motion.div>
              <motion.div variants={listItemVariants}>
                <h3 className="text-xl font-medium text-gray-800 dark:text-dm-lighter-gray mb-2">Exchanges</h3>
                <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, please contact our customer support team.</p>
              </motion.div>
              <motion.div variants={listItemVariants}>
                <h3 className="text-xl font-medium text-gray-800 dark:text-dm-lighter-gray mb-2">Return Shipping Costs</h3>
                <p>You will be responsible for shipping costs for returning your item, unless the return is due to our error. Shipping costs are non-refundable.</p>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ShippingReturnsPage;

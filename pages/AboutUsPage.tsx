
import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';

const AboutUsPage: React.FC = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold text-deep-purple dark:text-electric-orange mb-4">
              About ModernShop Ghana
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-dm-lighter-gray max-w-2xl mx-auto">
              Discover the story behind your favorite online destination for modern trends and quality products in Ghana.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-12 md:mb-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
              <img 
                src="https://picsum.photos/seed/Ghana_BusinessTeam_Collaborating_ModernOfficeAccra_GHAbout01/800/600" 
                alt="ModernShop Ghana Team or Office" 
                className="rounded-lg shadow-xl dark:shadow-dark-soft-xl w-full h-auto object-cover"
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ ...sectionVariants, visible: { ...sectionVariants.visible, transition: { ...sectionVariants.visible.transition, delay: 0.2 }} }}>
              <h2 className="text-2xl md:text-3xl font-semibold text-deep-purple dark:text-electric-orange mb-4">Our Story</h2>
              <p className="text-gray-700 dark:text-dm-light-gray leading-relaxed mb-4">
                Founded in 2023 in Accra, ModernShop Ghana started with a simple idea: to make cutting-edge fashion, innovative technology, and quality home goods accessible to everyone in Ghana. We noticed a gap for a curated collection of high-quality, stylish products that don't break the bank, delivered with excellent local service.
              </p>
              <p className="text-gray-700 dark:text-dm-light-gray leading-relaxed">
                From a small passion project, we aim to grow into a trusted online retailer, serving happy customers across Ghana. Our journey is fueled by a love for great design, a commitment to exceptional customer service, and a dedication to the Ghanaian market.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={sectionVariants}
            className="mb-12 md:mb-20 bg-light-gray dark:bg-dm-medium-gray p-8 md:p-12 rounded-lg shadow-soft-xl dark:shadow-dark-soft-xl"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-deep-purple dark:text-electric-orange mb-4 text-center">Our Mission</h2>
            <p className="text-gray-700 dark:text-dm-light-gray leading-relaxed text-center max-w-3xl mx-auto">
              Our mission is to empower Ghanaians to express their unique style and enhance their lives through an inspiring selection of modern products. We strive to provide an unparalleled shopping experience by offering quality, innovation, and value, with convenient payment options like Mobile Money, all while fostering a community built on trust and a shared passion for contemporary living in Ghana.
            </p>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
            <h2 className="text-2xl md:text-3xl font-semibold text-deep-purple dark:text-electric-orange mb-8 text-center">Why Choose Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Curated Ghanaian Selection", description: "Products handpicked for quality, style, and relevance to the Ghanaian lifestyle." , icon: "✨"},
                { title: "Customer First, Always", description: "Your satisfaction is our priority. We offer dedicated local support.", icon: "❤️" },
                { title: "Secure & Easy Payments", description: "Shop with confidence using Mobile Money or Card. Your data is protected.", icon: "🔒" }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 }}}}
                  className="bg-white dark:bg-dm-medium-gray p-6 rounded-lg shadow-lg dark:shadow-dark-soft-lg text-center"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-deep-purple dark:text-electric-orange mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-dm-lighter-gray text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default AboutUsPage;

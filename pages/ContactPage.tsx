
import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import Button from '../components/Button';
import { motion } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // console.log('Form data submitted:', formData); // For debugging
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const renderFloatingLabelInput = (name: keyof ContactFormData, label: string, value: string, type: string = 'text', isTextarea: boolean = false) => (
    <div className="relative floating-label-input">
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder=" "
          className="block w-full px-3 py-3.5 text-dark-gray dark:text-dm-light-gray bg-white dark:bg-dm-medium-gray border border-gray-300 dark:border-dm-dark-gray rounded-md appearance-none focus:outline-none focus:ring-1 focus:border-deep-purple dark:focus:border-electric-orange peer transition-colors h-32 resize-none"
          required
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder=" "
          className="block w-full px-3 py-3.5 text-dark-gray dark:text-dm-light-gray bg-white dark:bg-dm-medium-gray border border-gray-300 dark:border-dm-dark-gray rounded-md appearance-none focus:outline-none focus:ring-1 focus:border-deep-purple dark:focus:border-electric-orange peer transition-colors"
          required
        />
      )}
      <label
        htmlFor={name}
        className="absolute text-gray-500 dark:text-dm-lighter-gray duration-200 transform -translate-y-3.5 scale-75 top-3.5 z-10 origin-[0] left-3 peer-focus:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 dark:bg-dm-medium-gray bg-white px-1 pointer-events-none"
      >
        {label}
      </label>
    </div>
  );

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };


  return (
    <AnimatedPage>
      <div className="py-12 md:py-20 bg-light-gray dark:bg-dm-dark-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-deep-purple dark:text-electric-orange mb-4">Get In Touch</h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-dm-lighter-gray max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white dark:bg-dm-medium-gray p-6 sm:p-8 rounded-lg shadow-soft-xl dark:shadow-dark-soft-xl"
            >
              <h2 className="text-2xl font-semibold text-deep-purple dark:text-electric-orange mb-6">Send Us a Message</h2>
              {submitSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-500/50 rounded-md text-sm"
                >
                  Your message has been sent successfully! We'll get back to you soon.
                </motion.div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderFloatingLabelInput('name', 'Full Name', formData.name)}
                {renderFloatingLabelInput('email', 'Email Address', formData.email, 'email')}
                {renderFloatingLabelInput('subject', 'Subject', formData.subject)}
                {renderFloatingLabelInput('message', 'Your Message', formData.message, 'text', true)}
                <div>
                  <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </motion.div>

            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold text-deep-purple dark:text-electric-orange mb-4">Contact Information</h2>
                <div className="space-y-3 text-gray-700 dark:text-dm-light-gray">
                  <p><strong className="font-medium">Address:</strong> 123 Modern Way, Suite 404, Tech City, TC 56789</p>
                  <p><strong className="font-medium">Phone:</strong> <a href="tel:+1234567890" className="hover:text-electric-orange">+1 (234) 567-890</a></p>
                  <p><strong className="font-medium">Email:</strong> <a href="mailto:support@modernshop.com" className="hover:text-electric-orange">support@modernshop.com</a></p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-deep-purple dark:text-electric-orange mb-4">Business Hours</h2>
                <div className="space-y-1 text-gray-700 dark:text-dm-light-gray">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
                  <p>Saturday: 10:00 AM - 4:00 PM (EST)</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-deep-purple dark:text-electric-orange mb-4">Our Location</h2>
                <div className="bg-gray-200 dark:bg-dm-medium-gray h-64 rounded-lg shadow-md dark:shadow-dark-soft-md flex items-center justify-center text-gray-500 dark:text-dm-lighter-gray">
                    Map Placeholder (e.g., Google Maps Embed)
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ContactPage;

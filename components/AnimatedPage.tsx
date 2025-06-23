import React, { ReactNode } from 'react';
import { motion, Transition, Variants } from 'framer-motion';

interface AnimatedPageProps {
  children: ReactNode;
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30, // Start slightly lower
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -30, // Exit slightly upwards
  },
};

const pageTransition: Transition = {
  type: 'tween', // Changed from 'anticipate' for smoother feel
  ease: 'easeInOut', // Standard easing
  duration: 0.4, // Slightly faster
};

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
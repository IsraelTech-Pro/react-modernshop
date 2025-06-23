
import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';

interface ButtonOwnProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
}

type MotionButtonOtherProps = Omit<HTMLMotionProps<"button">, keyof ButtonOwnProps | 'className' | 'ref'>;

interface ButtonProps extends ButtonOwnProps, MotionButtonOtherProps {
  className?: string;
}

const LoadingSpinnerIcon: React.FC<{ sizeClass?: string }> = ({ sizeClass = "w-5 h-5" }) => (
  <svg className={`animate-spin ${sizeClass} text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const SuccessIcon: React.FC<{ sizeClass?: string }> = ({ sizeClass = "w-5 h-5" }) => (
  <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);


const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  isLoading = false,
  isSuccess = false,
  className: incomingClassName = '',
  disabled,
  ...rest
}) => {
  const baseStyle = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-150 ease-in-out flex items-center justify-center relative overflow-hidden";
  
  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle = 'bg-electric-orange text-white hover:bg-opacity-90 focus:ring-electric-orange disabled:bg-opacity-70 dark:hover:bg-orange-500';
      break;
    case 'secondary':
      variantStyle = 'bg-deep-purple text-white hover:bg-opacity-90 focus:ring-deep-purple disabled:bg-opacity-70 dark:hover:bg-purple-700';
      break;
    case 'outline':
      // Dark mode outline needs specific text/border colors
      variantStyle = 'bg-transparent text-electric-orange border-2 border-electric-orange hover:bg-electric-orange hover:text-white focus:ring-electric-orange disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:text-electric-orange dark:text-electric-orange dark:border-electric-orange dark:hover:bg-electric-orange dark:hover:text-white';
      break;
  }

  let sizeStyle = '';
  let iconSizeClass = 'w-5 h-5';
  switch (size) {
    case 'sm':
      sizeStyle = 'px-3 py-1.5 text-sm';
      iconSizeClass = 'w-4 h-4';
      break;
    case 'md':
      sizeStyle = 'px-5 py-2.5 text-base';
      break;
    case 'lg':
      sizeStyle = 'px-7 py-3 text-lg';
      iconSizeClass = 'w-6 h-6';
      break;
  }

  const widthStyle = fullWidth ? 'w-full' : '';
  const finalDisabled = disabled || isLoading || isSuccess;

  const finalClassName = `${baseStyle} ${variantStyle} ${sizeStyle} ${widthStyle} ${incomingClassName} ${finalDisabled ? 'cursor-not-allowed' : ''}`;

  return (
    <motion.button
      whileHover={!finalDisabled ? { scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 10 } } : {}}
      whileTap={!finalDisabled ? { scale: 0.97, transition: { type: 'spring', stiffness: 400, damping: 17 } } : {}}
      className={finalClassName}
      disabled={finalDisabled}
      aria-busy={isLoading}
      {...rest}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <LoadingSpinnerIcon sizeClass={iconSizeClass} />
          </motion.div>
        ) : isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <SuccessIcon sizeClass={iconSizeClass} />
          </motion.div>
        ) : (
          <motion.span
            key="text"
            initial={isLoading || isSuccess ? { opacity: 0 } : { opacity: 1 } } // Prevent flash if content changes fast
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="transition-opacity duration-100"
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
      { (isLoading || isSuccess) && <span className="opacity-0">{children}</span>}
    </motion.button>
  );
};

export default Button;

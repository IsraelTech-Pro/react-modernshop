
import React from 'react';
import { motion } from 'framer-motion';

interface QuantityInputProps {
  quantity: number;
  maxStock: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, maxStock, onDecrease, onIncrease, onChange, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = 1;
    value = Math.max(1, Math.min(value, maxStock));
    onChange(value);
  };

  return (
    <div className="flex items-center">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onDecrease}
        disabled={quantity <= 1 || disabled}
        className="px-3 py-1 bg-gray-200 dark:bg-dm-dark-gray text-gray-700 dark:text-dm-light-gray rounded-l-md hover:bg-gray-300 dark:hover:bg-dm-medium-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        -
      </motion.button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min="1"
        max={maxStock}
        disabled={disabled}
        className="w-12 text-center border-t border-b border-gray-200 dark:border-dm-dark-gray bg-white dark:bg-dm-medium-gray text-dark-gray dark:text-dm-light-gray focus:outline-none focus:ring-1 focus:ring-deep-purple dark:focus:ring-electric-orange py-1"
        aria-label="Quantity"
      />
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onIncrease}
        disabled={quantity >= maxStock || disabled}
        className="px-3 py-1 bg-gray-200 dark:bg-dm-dark-gray text-gray-700 dark:text-dm-light-gray rounded-r-md hover:bg-gray-300 dark:hover:bg-dm-medium-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        +
      </motion.button>
    </div>
  );
};

export default QuantityInput;

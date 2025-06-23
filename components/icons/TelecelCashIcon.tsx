
import React from 'react';

// Generic mobile payment/wallet icon, as specific Telecel Cash logo SVG can be complex/proprietary.
// This uses Telecel's prominent red color.
const TelecelCashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="24" height="24" rx="4" fill="#E60000"/> {/* Telecel Red */}
    {/* Simple wallet symbol */}
    <path d="M6 8H18V6H6V8ZM5 10V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V10H5Z" fill="white"/>
    <circle cx="15.5" cy="14.5" r="1.5" fill="#E60000"/>
  </svg>
);

export default TelecelCashIcon;

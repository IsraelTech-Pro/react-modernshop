
import React from 'react';

// Simplified representation of MTN MoMo logo colors
const MtnMoMoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="60" height="40" rx="4" fill="#FFCC00"/> {/* Yellow Background */}
    <circle cx="20" cy="20" r="10" fill="#00AEEF"/> {/* Blue Circle */}
    <path d="M35 12 L35 28 L40 28 Q45 28 45 20 Q45 12 40 12 L35 12 Z M38 15 L38 25 L40 25 Q42 25 42 20 Q42 15 40 15 L38 15 Z" fill="#EE1C25"/> {/* Red 'M' like shape part 1 */}
    <path d="M48 12 L48 28 L53 28 Q58 28 58 20 Q58 12 53 12 L48 12 Z M51 15 L51 25 L53 25 Q55 25 55 20 Q55 15 53 15 L51 15 Z" fill="#EE1C25" transform="translate(-10 0)"/> {/* Red 'M' like shape part 2, shifted */}
     {/* Text "MoMo" could be added but makes SVG complex, visual cues are primary */}
  </svg>
);

export default MtnMoMoIcon;

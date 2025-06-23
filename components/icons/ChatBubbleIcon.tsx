
import React from 'react';

const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.372c-1.131.113-2.074-.656-2.074-1.801V14.51L12 14.511V12.097c0-.879.452-1.637 1.182-2.097L16.5 8.511zM16.5 8.511L12 6.097V8.511L16.5 8.511zM12 6.097L7.5 8.511V11.59L12 6.097zM7.5 8.511L3 6.097V8.511L7.5 8.511zM3 6.097L7.5 3.685l4.5 2.412L16.5 3.685 21 6.097M3 14.511V12.097c0-.879.452-1.637 1.182-2.097L7.5 8.511M7.5 14.511V12.097L12 14.511V17.097l-3.722-.372c-1.131-.113-2.074.656-2.074 1.801L7.5 14.511z" 
    />
  </svg>
);

export default ChatBubbleIcon;

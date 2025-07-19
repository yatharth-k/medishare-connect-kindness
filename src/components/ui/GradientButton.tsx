import React from "react";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ariaLabel?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ children, className = '', ariaLabel, ...props }) => (
  <button
    className={`bg-gradient-to-r from-gradientFrom to-gradientTo text-white font-bold rounded-full px-6 py-3 shadow-md hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95 ${className}`}
    aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
    {...props}
  >
    {children}
  </button>
);

export default GradientButton; 
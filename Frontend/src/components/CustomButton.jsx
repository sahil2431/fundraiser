import React from 'react';

const CustomButton = ({ children, className = '', onClick, type = 'button', icon: Icon }) => {

  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default CustomButton;

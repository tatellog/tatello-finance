import React from 'react';

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  icon: Icon,
  ...props 
}) => {
  const baseStyles = "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white",
    purple: "bg-purple-600 hover:bg-purple-700 text-white"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};
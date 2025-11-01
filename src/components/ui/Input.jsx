import React from 'react';

export const Input = ({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm ${className}`}
      {...props}
    />
  );
};
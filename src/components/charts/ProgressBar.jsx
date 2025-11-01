import React from 'react';

export const ProgressBar = ({ label, current, total, color = 'blue' }) => {
  const percentage = (current / total) * 100;
  
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-500'
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">{label}</span>
        <span className="text-sm font-bold text-white">
          ${current.toLocaleString('es-MX')} / ${total.toLocaleString('es-MX')}
        </span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full ${colors[color]} transition-all duration-500 rounded-full`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-400">
        <span>{percentage.toFixed(1)}%</span>
        <span>${(total - current).toLocaleString('es-MX')} restante</span>
      </div>
    </div>
  );
};
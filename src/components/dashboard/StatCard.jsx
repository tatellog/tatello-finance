import React from 'react';
import { hideAmount } from '../../utils/formatters';

export const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  subtitle, 
  color = 'blue',
  showPrivate = true 
}) => {
  const colorClasses = {
    red: 'from-red-900/40 to-red-800/20 border-red-500/30 text-red-400',
    orange: 'from-orange-900/40 to-orange-800/20 border-orange-500/30 text-orange-400',
    yellow: 'from-yellow-900/40 to-yellow-800/20 border-yellow-500/30 text-yellow-400',
    green: 'from-green-900/40 to-green-800/20 border-green-500/30 text-green-400',
    blue: 'from-blue-900/40 to-blue-800/20 border-blue-500/30 text-blue-400',
    purple: 'from-purple-900/40 to-purple-800/20 border-purple-500/30 text-purple-400'
  };

  const gradientClass = colorClasses[color];

  return (
    <div className={`bg-gradient-to-br ${gradientClass} border rounded-xl p-4`}>
      <div className={`flex items-center gap-2 mb-2`}>
        <Icon className="w-4 h-4" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold">
        {typeof value === 'number' && value > 1000 
          ? hideAmount(value, showPrivate) 
          : value
        }
      </p>
      {subtitle && (
        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
};
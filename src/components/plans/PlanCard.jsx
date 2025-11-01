// src/components/plans/PlanCard.jsx
import React from 'react';
import { Calendar } from 'lucide-react';
import { PRIORITY_ICONS } from '../../utils/constants';
import { formatCurrencySimple } from '../../utils/formatters';

export const PlanCard = ({ 
  title, 
  color, 
  available, 
  availableLabel,
  debts,
  total,
  remaining,
  remainingLabel 
}) => {
  const colorClasses = {
    orange: 'from-orange-900/20 to-red-900/20 border-orange-500/30 text-orange-400',
    blue: 'from-blue-900/20 to-purple-900/20 border-blue-500/30 text-blue-400'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6`}>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Calendar className="w-6 h-6" />
        {title}
      </h2>
      
      <div className="mb-4">
        <span className="text-sm text-slate-400">{availableLabel}:</span>
        <p className={`text-2xl font-bold ${color === 'orange' ? 'text-green-400' : 'text-green-400'}`}>
          {formatCurrencySimple(available)}
        </p>
      </div>

      <div className="space-y-2">
        {debts.map(debt => (
          <div key={debt.id} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-3">
              {debt.priority && <span className="text-xl">{PRIORITY_ICONS[debt.priority]}</span>}
              <span className="font-medium">{debt.entity}</span>
            </div>
            <span className="font-bold">
              {formatCurrencySimple(debt.amount)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
        <span className="font-bold">{remainingLabel}:</span>
        <span className={`text-xl font-bold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {formatCurrencySimple(remaining)}
        </span>
      </div>
    </div>
  );
};


import React from 'react';
import { PRIORITY_ICONS } from '../../utils/constants';

export const TopDebtsChart = ({ debts }) => {
  const activeDebts = debts
    .filter(d => d.status !== 'liquidado')
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 5);

  const maxDebt = Math.max(...activeDebts.map(d => d.balance));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Top 5 Deudas Más Grandes</h3>
      
      <div className="space-y-3">
        {activeDebts.map((debt, index) => {
          const percentage = (debt.balance / maxDebt) * 100;
          const barColor = debt.rate >= 60 ? 'bg-red-500' : debt.rate >= 40 ? 'bg-orange-500' : 'bg-blue-500';
          
          return (
            <div key={debt.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{PRIORITY_ICONS[debt.priority]}</span>
                  <span className="font-medium text-white">{debt.entity}</span>
                  {debt.rate > 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded ${debt.rate >= 60 ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {debt.rate}%
                    </span>
                  )}
                </div>
                <span className="text-sm font-bold text-white">
                  ${debt.balance.toLocaleString('es-MX', {maximumFractionDigits: 0})}
                </span>
              </div>
              <div className="relative w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full ${barColor} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
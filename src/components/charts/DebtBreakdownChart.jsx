import React from 'react';

export const DebtBreakdownChart = ({ debts }) => {
  const activeDebts = debts.filter(d => d.status !== 'liquidado');
  const total = activeDebts.reduce((sum, d) => sum + d.balance, 0);
  
  const debtsByType = activeDebts.reduce((acc, debt) => {
    const existing = acc.find(item => item.type === debt.type);
    if (existing) {
      existing.amount += debt.balance;
      existing.count += 1;
    } else {
      acc.push({
        type: debt.type,
        amount: debt.balance,
        count: 1
      });
    }
    return acc;
  }, []);

  const typeColors = {
    prestamo: 'bg-blue-500',
    tarjeta: 'bg-purple-500',
    personal: 'bg-yellow-500'
  };

  const typeLabels = {
    prestamo: 'Préstamos',
    tarjeta: 'Tarjetas',
    personal: 'Personal'
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Desglose por Tipo</h3>
      
      {/* Stacked Bar */}
      <div className="w-full bg-slate-700 rounded-full h-8 overflow-hidden flex">
        {debtsByType.map(item => {
          const percentage = (item.amount / total) * 100;
          return (
            <div
              key={item.type}
              className={`${typeColors[item.type]} h-full flex items-center justify-center text-xs font-bold text-white transition-all duration-500`}
              style={{ width: `${percentage}%` }}
              title={`${typeLabels[item.type]}: $${item.amount.toLocaleString('es-MX')}`}
            >
              {percentage > 10 && `${percentage.toFixed(0)}%`}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4">
        {debtsByType.map(item => (
          <div key={item.type} className="bg-slate-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${typeColors[item.type]}`} />
              <span className="text-sm font-medium text-slate-300">{typeLabels[item.type]}</span>
            </div>
            <p className="text-xl font-bold text-white">
              ${item.amount.toLocaleString('es-MX', {maximumFractionDigits: 0})}
            </p>
            <p className="text-xs text-slate-400">{item.count} deudas</p>
          </div>
        ))}
      </div>
    </div>
  );
};

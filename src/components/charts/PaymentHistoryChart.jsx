import React from 'react';

export const PaymentHistoryChart = ({ payments }) => {
  const completedPayments = payments
    .filter(p => p.status === 'completado')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const totalPaid = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  const maxAmount = Math.max(...completedPayments.map(p => p.amount));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Últimos 5 Pagos</h3>
        <span className="text-sm text-slate-400">
          Total: <span className="text-green-400 font-bold">${totalPaid.toLocaleString('es-MX')}</span>
        </span>
      </div>
      
      <div className="space-y-3">
        {completedPayments.map(payment => {
          const barWidth = (payment.amount / maxAmount) * 100;
          
          return (
            <div key={payment.id} className="bg-slate-800/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-white">{payment.entity}</p>
                  <p className="text-xs text-slate-400">{new Date(payment.date).toLocaleDateString('es-MX')}</p>
                </div>
                <span className="text-lg font-bold text-green-400">
                  ${payment.amount.toLocaleString('es-MX', {maximumFractionDigits: 0})}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';

export const MonthlyProgressChart = ({ stats, resources, config }) => {
  const novProgress = (stats.planNovTotal / resources.novDisponible) * 100;
  const dicProgress = (stats.planDicTotal / config.monthlyIncome) * 100;
  
  const months = [
    { name: 'Noviembre', planned: stats.planNovTotal, available: resources.novDisponible, progress: novProgress },
    { name: 'Diciembre', planned: stats.planDicTotal, available: config.monthlyIncome, progress: dicProgress }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white">Progreso Mensual</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {months.map(month => (
          <div key={month.name} className="bg-slate-800/50 rounded-xl p-6 space-y-4">
            <h4 className="text-lg font-bold text-blue-400">{month.name}</h4>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Planeado:</span>
                <span className="text-white font-bold">${month.planned.toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Disponible:</span>
                <span className="text-green-400 font-bold">${month.available.toLocaleString('es-MX')}</span>
              </div>
            </div>

            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-blue-400">
                    Uso del presupuesto
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-400">
                    {month.progress.toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-slate-700">
                <div
                  style={{ width: `${Math.min(month.progress, 100)}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    month.progress > 90 ? 'bg-red-500' : month.progress > 70 ? 'bg-yellow-500' : 'bg-green-500'
                  } transition-all duration-500`}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700">
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Restante:</span>
                <span className={`text-sm font-bold ${month.available - month.planned >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${(month.available - month.planned).toLocaleString('es-MX')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
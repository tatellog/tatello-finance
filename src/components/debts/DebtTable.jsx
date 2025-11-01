import React from 'react';
import { DebtRow } from './DebtRow';

export const DebtTable = ({ debts, showPrivate, onToggleStatus }) => {
  const sortedDebts = [...debts].sort((a, b) => b.priority - a.priority);

  return (
    <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/70">
            <tr>
              <th className="text-left p-3 font-semibold text-slate-300">Entidad</th>
              <th className="text-right p-3 font-semibold text-slate-300">Saldo</th>
              <th className="text-right p-3 font-semibold text-slate-300">Tasa</th>
              <th className="text-right p-3 font-semibold text-slate-300">Nov</th>
              <th className="text-right p-3 font-semibold text-slate-300">Dic</th>
              <th className="text-center p-3 font-semibold text-slate-300">Estado</th>
            </tr>
          </thead>
          <tbody>
            {sortedDebts.map(debt => (
              <DebtRow
                key={debt.id}
                debt={debt}
                showPrivate={showPrivate}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
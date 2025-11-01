import React from 'react';
import { TABS } from '../../utils/constants';

export const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: TABS.OVERVIEW, label: '📊 Resumen' },
    { id: TABS.DEBTS, label: '💳 Deudas' },
    { id: TABS.PAYMENTS, label: '💰 Pagos' },
    { id: TABS.CHARTS, label: '📈 Gráficas' } // ← NUEVO TAB
  ];

  return (
    <div className="flex gap-2 border-b border-slate-700 overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
            activeTab === tab.id
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
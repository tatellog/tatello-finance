import React from 'react';
import { STATUS_COLORS } from '../../utils/constants';

export const DebtStatusBadge = ({ status, onClick }) => {
  const colorClass = STATUS_COLORS[status] || 'bg-slate-500/20 text-slate-400';

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium border ${colorClass} transition-all hover:opacity-80`}
    >
      {status}
    </button>
  );
};
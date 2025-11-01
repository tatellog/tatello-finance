import React from 'react';
import { DebtStatusBadge } from './DebtStatusBadge';
import { PRIORITY_ICONS } from '../../utils/constants';
import { hideAmount } from '../../utils/formatters';

export const DebtRow = ({ debt, showPrivate, onToggleStatus }) => {
  const isLiquidated = debt.status === 'liquidado';
  
  return (
    <tr className={`border-t border-slate-700/50 hover:bg-slate-700/20 transition-colors ${isLiquidated ? 'opacity-40' : ''}`}>
      <td className="p-3">
        <span className="mr-2">{PRIORITY_ICONS[debt.priority]}</span>
        {debt.entity}
      </td>
      <td className="text-right p-3 font-mono text-sm">
        {hideAmount(debt.balance, showPrivate)}
      </td>
      <td className="text-right p-3">
        <span className={debt.rate >= 60 ? 'text-red-400 font-bold' : debt.rate > 0 ? 'text-yellow-400' : 'text-slate-500'}>
          {debt.rate > 0 ? `${debt.rate}%` : '-'}
        </span>
      </td>
      <td className="text-right p-3 font-bold text-orange-400">
        {debt.planNov > 0 ? `$${debt.planNov.toLocaleString('es-MX')}` : '-'}
      </td>
      <td className="text-right p-3 font-bold text-blue-400">
        {debt.planDic > 0 ? `$${debt.planDic.toLocaleString('es-MX')}` : '-'}
      </td>
      <td className="text-center p-3">
        <DebtStatusBadge 
          status={debt.status} 
          onClick={() => onToggleStatus(debt.id)} 
        />
      </td>
    </tr>
  );
};
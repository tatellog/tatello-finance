import React from 'react';
import { DebtStatusBadge } from './DebtStatusBadge';
import { EditableField } from '../ui/EditableField';
import { PRIORITY_ICONS } from '../../utils/constants';
import { hideAmount } from '../../utils/formatters';

export const DebtRow = ({ debt, showPrivate, editMode, onToggleStatus, onUpdate }) => {
  const isLiquidated = debt.status === 'liquidado';
  
  return (
    <tr className={`border-t border-slate-700/50 hover:bg-slate-700/20 transition-colors ${isLiquidated ? 'opacity-40' : ''}`}>
      <td className="p-3">
        <span className="mr-2">{PRIORITY_ICONS[debt.priority]}</span>
        <EditableField
          value={debt.entity}
          onSave={(val) => onUpdate(debt.id, 'entity', val)}
          editMode={editMode}
          className="font-medium"
        />
      </td>
      <td className="text-right p-3 font-mono text-sm">
        {showPrivate ? (
          <EditableField
            value={debt.balance}
            onSave={(val) => onUpdate(debt.id, 'balance', parseFloat(val) || 0)}
            type="number"
            format="currency"
            editMode={editMode}
          />
        ) : '•••••'}
      </td>
      <td className="text-right p-3">
        <EditableField
          value={debt.rate}
          onSave={(val) => onUpdate(debt.id, 'rate', parseFloat(val) || 0)}
          type="number"
          format="percentage"
          editMode={editMode}
          className={debt.rate >= 60 ? 'text-red-400 font-bold' : debt.rate > 0 ? 'text-yellow-400' : 'text-slate-500'}
        />
      </td>
      <td className="text-right p-3 font-bold text-orange-400">
        <EditableField
          value={debt.planNov}
          onSave={(val) => onUpdate(debt.id, 'planNov', parseFloat(val) || 0)}
          type="number"
          format="currency"
          editMode={editMode}
        />
      </td>
      <td className="text-right p-3 font-bold text-blue-400">
        <EditableField
          value={debt.planDic}
          onSave={(val) => onUpdate(debt.id, 'planDic', parseFloat(val) || 0)}
          type="number"
          format="currency"
          editMode={editMode}
        />
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
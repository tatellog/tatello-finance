import React from 'react';
import { Trash2 } from 'lucide-react';
import { Input } from '../ui/Input';

export const PaymentRow = ({ payment, onUpdate, onDelete }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <div className="flex items-center gap-4 flex-wrap">
        <Input
          type="date"
          value={payment.date}
          onChange={(e) => onUpdate(payment.id, 'date', e.target.value)}
          className="w-40"
        />
        <Input
          type="text"
          value={payment.entity}
          onChange={(e) => onUpdate(payment.id, 'entity', e.target.value)}
          placeholder="Entidad"
          className="flex-1 min-w-[200px]"
        />
        <Input
          type="number"
          value={payment.amount}
          onChange={(e) => onUpdate(payment.id, 'amount', e.target.value)}
          placeholder="0.00"
          className="w-32 text-right font-mono"
        />
        <select
          value={payment.status}
          onChange={(e) => onUpdate(payment.id, 'status', e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm"
        >
          <option value="pendiente">Pendiente</option>
          <option value="completado">Completado</option>
        </select>
        <button
          onClick={() => onDelete(payment.id)}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
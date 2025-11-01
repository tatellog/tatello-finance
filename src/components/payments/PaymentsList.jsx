import React from 'react';
import { Plus } from 'lucide-react';
import { PaymentRow } from './PaymentRow';
import { Button } from '../ui/Button';
import { formatCurrencySimple } from '../../utils/formatters';

export const PaymentsList = ({ payments, totalPaid, onAdd, onUpdate, onDelete }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Historial de Pagos</h2>
        <Button variant="success" icon={Plus} onClick={onAdd}>
          Nuevo Pago
        </Button>
      </div>
      
      <div className="space-y-3">
        {payments.map(payment => (
          <PaymentRow
            key={payment.id}
            payment={payment}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">Total Pagado</span>
          <span className="text-3xl font-bold text-green-400">
            {formatCurrencySimple(totalPaid)}
          </span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, DollarSign, Target, AlertCircle, CheckCircle, TrendingDown } from 'lucide-react';
import { Button } from '../ui/Button';

export const PaymentModal = ({ 
  debt, 
  resources,
  config,
  onConfirm, 
  onCancel 
}) => {
  const [paymentType, setPaymentType] = useState('liquidar'); // 'liquidar' o 'abonar'
  const [source, setSource] = useState('novDisponible');
  const [abono, setAbono] = useState(debt.payment || 1000);

  const wiseMXN = resources.wiseUSD * config.exchangeRate;
  const amountToDeduct = paymentType === 'liquidar' ? debt.balance : abono;

  const sources = {
    novDisponible: {
      label: 'Disponible Noviembre',
      available: resources.novDisponible,
      icon: DollarSign,
      color: 'green'
    },
    wise: {
      label: 'Wise (USD)',
      available: resources.wiseUSD,
      availableMXN: wiseMXN,
      icon: Target,
      color: 'blue'
    }
  };

  const selectedSource = sources[source];
  const availableAmount = source === 'wise' ? wiseMXN : selectedSource.available;
  const hasEnoughFunds = availableAmount >= amountToDeduct;
  const newBalance = debt.balance - amountToDeduct;
  const willBeLiquidated = paymentType === 'liquidar' || newBalance <= 0;

  const handleConfirm = () => {
    let updatedResources = { ...resources };
    
    if (source === 'novDisponible') {
      updatedResources.novDisponible -= amountToDeduct;
    } else if (source === 'wise') {
      const amountInUSD = amountToDeduct / config.exchangeRate;
      updatedResources.wiseUSD -= amountInUSD;
    }

    onConfirm({
      updatedResources,
      source,
      amount: amountToDeduct,
      debtId: debt.id,
      paymentType,
      newBalance: Math.max(0, newBalance)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 flex items-center justify-between p-6 border-b border-slate-700 z-10">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              Pagar Deuda
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Liquida completamente o haz un abono
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Debt Info */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-slate-400">Deuda</p>
                <p className="text-xl font-bold text-white">{debt.entity}</p>
                {debt.rate > 0 && (
                  <p className="text-xs text-yellow-400 mt-1">
                    Tasa: {debt.rate}% anual
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">Saldo actual</p>
                <p className="text-2xl font-bold text-red-400">
                  ${debt.balance.toLocaleString('es-MX', {maximumFractionDigits: 0})}
                </p>
              </div>
            </div>
            {debt.payment > 0 && (
              <div className="pt-3 border-t border-slate-700">
                <p className="text-xs text-slate-400">
                  Pago mensual sugerido: 
                  <span className="text-white font-medium ml-1">
                    ${debt.payment.toLocaleString('es-MX', {maximumFractionDigits: 0})}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Payment Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">
              Tipo de pago
            </label>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentType('liquidar')}
                className={`
                  p-4 rounded-xl border-2 transition-all text-left
                  ${paymentType === 'liquidar'
                    ? 'border-green-500 bg-green-500/10' 
                    : 'border-slate-700 hover:border-slate-600 bg-slate-900/30'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white">Liquidar</span>
                  {paymentType === 'liquidar' && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>
                <p className="text-sm text-slate-400">Pagar el total y cerrar la deuda</p>
                <p className="text-lg font-bold text-green-400 mt-2">
                  ${debt.balance.toLocaleString('es-MX', {maximumFractionDigits: 0})}
                </p>
              </button>

              <button
                onClick={() => setPaymentType('abonar')}
                className={`
                  p-4 rounded-xl border-2 transition-all text-left
                  ${paymentType === 'abonar'
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-slate-700 hover:border-slate-600 bg-slate-900/30'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white">Abonar</span>
                  {paymentType === 'abonar' && (
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <p className="text-sm text-slate-400">Hacer un pago parcial</p>
                <p className="text-lg font-bold text-blue-400 mt-2">
                  Monto personalizado
                </p>
              </button>
            </div>
          </div>

          {/* Abono Amount Input */}
          {paymentType === 'abonar' && (
            <div className="space-y-3 bg-blue-900/10 border border-blue-500/30 rounded-xl p-4">
              <label className="text-sm font-medium text-blue-400">
                Monto a abonar
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  value={abono}
                  onChange={(e) => setAbono(parseFloat(e.target.value) || 0)}
                  className="bg-slate-700 border border-slate-600 rounded-lg pl-8 pr-4 py-3 w-full text-white text-lg font-bold focus:outline-none focus:border-blue-500"
                  placeholder="0"
                  min="1"
                  max={debt.balance}
                />
              </div>
              
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Mínimo', value: debt.payment || 1000 },
                  { label: '25%', value: Math.round(debt.balance * 0.25) },
                  { label: '50%', value: Math.round(debt.balance * 0.5) },
                  { label: '75%', value: Math.round(debt.balance * 0.75) }
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() => setAbono(option.value)}
                    className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-medium transition-colors"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="flex justify-between text-sm pt-2 border-t border-slate-700">
                <span className="text-slate-400">Nuevo saldo:</span>
                <span className={`font-bold ${newBalance > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                  ${Math.max(0, newBalance).toLocaleString('es-MX', {maximumFractionDigits: 0})}
                </span>
              </div>
            </div>
          )}

          {/* Source Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">
              ¿De dónde tomar el dinero?
            </label>
            
            <div className="grid gap-3">
              {Object.entries(sources).map(([key, sourceInfo]) => {
                const Icon = sourceInfo.icon;
                const isSelected = source === key;
                const available = key === 'wise' ? sourceInfo.availableMXN : sourceInfo.available;
                const canAfford = available >= amountToDeduct;

                return (
                  <button
                    key={key}
                    onClick={() => setSource(key)}
                    disabled={!canAfford}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all text-left
                      ${isSelected 
                        ? 'border-blue-500 bg-blue-500/10' 
                        : canAfford 
                          ? 'border-slate-700 hover:border-slate-600 bg-slate-900/30' 
                          : 'border-slate-800 bg-slate-900/20 opacity-50 cursor-not-allowed'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          sourceInfo.color === 'green' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{sourceInfo.label}</p>
                          <p className="text-sm text-slate-400">
                            Disponible: ${available.toLocaleString('es-MX', {maximumFractionDigits: 0})}
                            {key === 'wise' && (
                              <span className="ml-1">
                                (${sourceInfo.available.toLocaleString('en-US', {maximumFractionDigits: 2})} USD)
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                      )}
                    </div>

                    {!canAfford && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-red-400">
                        <AlertCircle className="w-4 h-4" />
                        <span>Fondos insuficientes</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview */}
          <div className={`border rounded-xl p-4 ${
            paymentType === 'liquidar' 
              ? 'bg-green-900/20 border-green-500/30' 
              : 'bg-blue-900/20 border-blue-500/30'
          }`}>
            <p className={`text-sm font-medium mb-3 ${
              paymentType === 'liquidar' ? 'text-green-400' : 'text-blue-400'
            }`}>
              Vista Previa
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Tipo de pago:</span>
                <span className="font-bold text-white">
                  {paymentType === 'liquidar' ? '🎯 Liquidación total' : '📉 Abono parcial'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Monto a pagar:</span>
                <span className="font-bold text-white">
                  ${amountToDeduct.toLocaleString('es-MX', {maximumFractionDigits: 0})}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fuente:</span>
                <span className="font-bold text-blue-400">
                  {selectedSource.label}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-700">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">Recursos disponibles:</span>
                  <span className="font-bold text-white">
                    ${availableAmount.toLocaleString('es-MX', {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Después del pago:</span>
                  <span className={`font-bold ${
                    (availableAmount - amountToDeduct) >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    ${(availableAmount - amountToDeduct).toLocaleString('es-MX', {maximumFractionDigits: 0})}
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nuevo saldo de deuda:</span>
                  <span className={`font-bold ${willBeLiquidated ? 'text-green-400' : 'text-yellow-400'}`}>
                    ${Math.max(0, newBalance).toLocaleString('es-MX', {maximumFractionDigits: 0})}
                    {willBeLiquidated && ' ✓ LIQUIDADA'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Warning if insufficient funds */}
          {!hasEnoughFunds && (
            <div className="flex items-start gap-3 p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-red-400">Fondos insuficientes</p>
                <p className="text-red-300/80 mt-1">
                  No tienes suficiente dinero en {selectedSource.label}.
                  {paymentType === 'abonar' && ' Reduce el monto del abono o '}
                  Selecciona otra fuente.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800 flex items-center justify-end gap-3 p-6 border-t border-slate-700">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={handleConfirm}
            disabled={!hasEnoughFunds || (paymentType === 'abonar' && abono <= 0)}
          >
            {paymentType === 'liquidar' ? 'Liquidar Deuda' : 'Hacer Abono'}
          </Button>
        </div>

      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { X, DollarSign, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export const LiquidationModal = ({ 
  debt, 
  resources,
  config,
  onConfirm, 
  onCancel 
}) => {
  const [source, setSource] = useState('novDisponible');
  const [customAmount, setCustomAmount] = useState(debt.balance);
  const [useCustomAmount, setUseCustomAmount] = useState(false);

  const wiseMXN = resources.wiseUSD * config.exchangeRate;
  const amountToDeduct = useCustomAmount ? customAmount : debt.balance;

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
      debtId: debt.id
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full border border-slate-700 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              Liquidar Deuda
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Selecciona de dónde tomar el dinero
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Deuda a liquidar</p>
                <p className="text-xl font-bold text-white">{debt.entity}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">Monto</p>
                <p className="text-2xl font-bold text-red-400">
                  ${debt.balance.toLocaleString('es-MX', {maximumFractionDigits: 0})}
                </p>
              </div>
            </div>
          </div>

          {/* Custom Amount Option */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={useCustomAmount}
                onChange={(e) => setUseCustomAmount(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
              />
              <span className="text-slate-300">Liquidar con monto personalizado</span>
            </label>

            {useCustomAmount && (
              <div className="ml-7">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(parseFloat(e.target.value) || 0)}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 w-full text-white focus:outline-none focus:border-blue-500"
                  placeholder="Monto a pagar"
                />
                <p className="text-xs text-slate-400 mt-2">
                  Restante: ${(debt.balance - customAmount).toLocaleString('es-MX')}
                </p>
              </div>
            )}
          </div>

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
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
            <p className="text-sm font-medium text-blue-400 mb-3">Vista Previa</p>
            <div className="space-y-2 text-sm">
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
              <div className="flex justify-between">
                <span className="text-slate-400">Disponible actual:</span>
                <span className="font-bold text-white">
                  ${availableAmount.toLocaleString('es-MX', {maximumFractionDigits: 0})}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-700 flex justify-between">
                <span className="text-slate-400">Disponible después:</span>
                <span className={`font-bold ${
                  (availableAmount - amountToDeduct) >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  ${(availableAmount - amountToDeduct).toLocaleString('es-MX', {maximumFractionDigits: 0})}
                </span>
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
                  No tienes suficiente dinero en {selectedSource.label} para liquidar esta deuda.
                  Selecciona otra fuente o usa un monto personalizado.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700 bg-slate-900/30">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={handleConfirm}
            disabled={!hasEnoughFunds}
          >
            Confirmar Liquidación
          </Button>
        </div>

      </div>
    </div>
  );
};

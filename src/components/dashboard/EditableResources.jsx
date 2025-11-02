import React from 'react';
import { DollarSign, Target } from 'lucide-react';
import { EditableField } from '../ui/EditableField';

export const EditableResources = ({ resources, config, editMode, onUpdateResource, onUpdateConfig }) => {
  if (!editMode) return null;

  return (
    <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6">
      <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5" />
        Editar Recursos y Configuración
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Disponible Noviembre (MXN)</label>
          <EditableField
            value={resources.novDisponible}
            onSave={(val) => onUpdateResource('novDisponible', parseFloat(val) || 0)}
            type="number"
            format="currency"
            editMode={true}
            className="text-2xl font-bold text-green-400 block w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-400">Wise (USD)</label>
          <EditableField
            value={resources.wiseUSD}
            onSave={(val) => onUpdateResource('wiseUSD', parseFloat(val) || 0)}
            type="number"
            editMode={true}
            className="text-2xl font-bold text-blue-400 block w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-400">Salario Mensual (MXN)</label>
          <EditableField
            value={config.monthlyIncome}
            onSave={(val) => onUpdateConfig('monthlyIncome', parseFloat(val) || 0)}
            type="number"
            format="currency"
            editMode={true}
            className="text-2xl font-bold text-purple-400 block w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-400">Tipo de Cambio</label>
          <EditableField
            value={config.exchangeRate}
            onSave={(val) => onUpdateConfig('exchangeRate', parseFloat(val) || 0)}
            type="number"
            editMode={true}
            className="text-xl font-bold text-yellow-400 block w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-400">Nombre de Usuario</label>
          <EditableField
            value={config.userName}
            onSave={(val) => onUpdateConfig('userName', val)}
            editMode={true}
            className="text-xl font-bold text-white block w-full"
          />
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        💡 Tip: Presiona Enter para guardar o Escape para cancelar
      </p>
    </div>
  );
};

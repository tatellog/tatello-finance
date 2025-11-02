import React from 'react';
import { Filter, X } from 'lucide-react';

export const DebtFilters = ({ filters, onFilterChange, onClearFilters, debtCounts }) => {
  const hasActiveFilters = filters.type !== 'all' || 
                          filters.status !== 'all' || 
                          filters.priority !== 'all' ||
                          filters.search !== '';

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-400" />
          Filtros
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Buscar</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Nombre de deuda..."
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Tipo</label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">Todas ({debtCounts.all})</option>
            <option value="prestamo">💼 Préstamos ({debtCounts.prestamo})</option>
            <option value="tarjeta">💳 Tarjetas ({debtCounts.tarjeta})</option>
            <option value="personal">🤝 Personal ({debtCounts.personal})</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Estado</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">Todos ({debtCounts.all})</option>
            <option value="mora">🔴 En mora ({debtCounts.mora})</option>
            <option value="activo">🟡 Activo ({debtCounts.activo})</option>
            <option value="corriente">🟢 Al corriente ({debtCounts.corriente})</option>
            <option value="liquidado">✅ Liquidado ({debtCounts.liquidado})</option>
            <option value="bloqueada">🔒 Bloqueada ({debtCounts.bloqueada})</option>
            <option value="vencida">⚠️ Vencida ({debtCounts.vencida})</option>
            <option value="suspendida">⏸️ Suspendida ({debtCounts.suspendida})</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Prioridad</label>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">Todas ({debtCounts.all})</option>
            <option value="1">🔴 Alta ({debtCounts.priority1})</option>
            <option value="2">🟡 Media ({debtCounts.priority2})</option>
            <option value="3">🟢 Baja ({debtCounts.priority3})</option>
          </select>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700">
        <span className="text-xs text-slate-400">Filtros rápidos:</span>
        <button
          onClick={() => onFilterChange('status', 'mora')}
          className="px-3 py-1 text-xs bg-red-500/20 text-red-400 border border-red-500/30 rounded-full hover:bg-red-500/30 transition-colors"
        >
          Solo en mora
        </button>
        <button
          onClick={() => onFilterChange('rate', 'high')}
          className="px-3 py-1 text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full hover:bg-orange-500/30 transition-colors"
        >
          Alta tasa (≥60%)
        </button>
        <button
          onClick={() => onFilterChange('type', 'prestamo')}
          className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full hover:bg-blue-500/30 transition-colors"
        >
          Solo préstamos
        </button>
        <button
          onClick={() => onFilterChange('type', 'tarjeta')}
          className="px-3 py-1 text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full hover:bg-purple-500/30 transition-colors"
        >
          Solo tarjetas
        </button>
        <button
          onClick={() => {
            onFilterChange('type', 'all');
            onFilterChange('status', 'all');
            onFilterChange('priority', 'all');
            onFilterChange('planNov', 'active');
          }}
          className="px-3 py-1 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-full hover:bg-green-500/30 transition-colors"
        >
          Plan Noviembre
        </button>
      </div>
    </div>
  );
};
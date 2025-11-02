import React, { useState, useMemo } from 'react';
import { DebtRow } from './DebtRow';
import { DebtFilters } from './DebtFilters';
import { SortAsc, SortDesc } from 'lucide-react';

export const DebtTable = ({ debts, showPrivate, editMode, onToggleStatus, onUpdate }) => {
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    status: 'all',
    priority: 'all',
    rate: 'all',
    planNov: 'all'
  });

  const [sortConfig, setSortConfig] = useState({
    key: 'priority',
    direction: 'desc'
  });

  // Calculate counts for filters
  const debtCounts = useMemo(() => {
    return {
      all: debts.length,
      prestamo: debts.filter(d => d.type === 'prestamo').length,
      tarjeta: debts.filter(d => d.type === 'tarjeta').length,
      personal: debts.filter(d => d.type === 'personal').length,
      mora: debts.filter(d => d.status === 'mora').length,
      activo: debts.filter(d => d.status === 'activo').length,
      corriente: debts.filter(d => d.status === 'corriente').length,
      liquidado: debts.filter(d => d.status === 'liquidado').length,
      bloqueada: debts.filter(d => d.status === 'bloqueada').length,
      vencida: debts.filter(d => d.status === 'vencida').length,
      suspendida: debts.filter(d => d.status === 'suspendida').length,
      priority1: debts.filter(d => d.priority === 1).length,
      priority2: debts.filter(d => d.priority === 2).length,
      priority3: debts.filter(d => d.priority === 3).length
    };
  }, [debts]);

  // Filter and sort debts
  const filteredDebts = useMemo(() => {
    let result = [...debts];

    // Search filter
    if (filters.search) {
      result = result.filter(debt =>
        debt.entity.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      result = result.filter(debt => debt.type === filters.type);
    }

    // Status filter
    if (filters.status !== 'all') {
      result = result.filter(debt => debt.status === filters.status);
    }

    // Priority filter
    if (filters.priority !== 'all') {
      result = result.filter(debt => debt.priority === parseInt(filters.priority));
    }

    // High rate filter
    if (filters.rate === 'high') {
      result = result.filter(debt => debt.rate >= 60);
    }

    // Plan November filter
    if (filters.planNov === 'active') {
      result = result.filter(debt => debt.planNov > 0);
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // Handle string comparisons
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [debts, filters, sortConfig]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      status: 'all',
      priority: 'all',
      rate: 'all',
      planNov: 'all'
    });
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? 
      <SortAsc className="w-4 h-4 inline ml-1" /> : 
      <SortDesc className="w-4 h-4 inline ml-1" />;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <DebtFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        debtCounts={debtCounts}
      />

      {/* Results count */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">
          Mostrando <span className="text-white font-bold">{filteredDebts.length}</span> de <span className="text-white font-bold">{debts.length}</span> deudas
        </span>
        {filteredDebts.length > 0 && (
          <span className="text-slate-400">
            Total filtrado: <span className="text-white font-bold">
              ${filteredDebts.reduce((sum, d) => sum + d.balance, 0).toLocaleString('es-MX', {maximumFractionDigits: 0})}
            </span>
          </span>
        )}
      </div>

      {/* Table */}
      <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
        {editMode && (
          <div className="bg-blue-900/20 border-b border-blue-500/30 p-4">
            <p className="text-sm text-blue-400 flex items-center gap-2">
              <span>✏️</span>
              <span><strong>Modo edición activo:</strong> Haz click en cualquier campo para editarlo. Presiona Enter para guardar o Escape para cancelar.</span>
            </p>
          </div>
        )}

        {filteredDebts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400 text-lg">No se encontraron deudas con los filtros aplicados</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 text-blue-400 hover:text-blue-300 text-sm"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800/70">
                <tr>
                  <th 
                    onClick={() => handleSort('entity')}
                    className="text-left p-3 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors"
                  >
                    Entidad <SortIcon columnKey="entity" />
                  </th>
                  <th 
                    onClick={() => handleSort('balance')}
                    className="text-right p-3 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors"
                  >
                    Saldo <SortIcon columnKey="balance" />
                  </th>
                  <th 
                    onClick={() => handleSort('rate')}
                    className="text-right p-3 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors"
                  >
                    Tasa <SortIcon columnKey="rate" />
                  </th>
                  <th 
                    onClick={() => handleSort('planNov')}
                    className="text-right p-3 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors"
                  >
                    Nov <SortIcon columnKey="planNov" />
                  </th>
                  <th 
                    onClick={() => handleSort('planDic')}
                    className="text-right p-3 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors"
                  >
                    Dic <SortIcon columnKey="planDic" />
                  </th>
                  <th 
                    onClick={() => handleSort('status')}
                    className="text-center p-3 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors"
                  >
                    Estado <SortIcon columnKey="status" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDebts.map(debt => (
                  <DebtRow
                    key={debt.id}
                    debt={debt}
                    showPrivate={showPrivate}
                    editMode={editMode}
                    onToggleStatus={onToggleStatus}
                    onUpdate={onUpdate}
                  />
                ))}
              </tbody>
              <tfoot className="bg-slate-800/70 font-bold border-t-2 border-slate-600">
                <tr>
                  <td className="p-3">TOTAL FILTRADO</td>
                  <td className="p-3 text-right text-orange-400">
                    ${filteredDebts.reduce((sum, d) => sum + d.balance, 0).toLocaleString('es-MX', {maximumFractionDigits: 0})}
                  </td>
                  <td className="p-3"></td>
                  <td className="p-3 text-right text-orange-400">
                    ${filteredDebts.reduce((sum, d) => sum + d.planNov, 0).toLocaleString('es-MX', {maximumFractionDigits: 0})}
                  </td>
                  <td className="p-3 text-right text-blue-400">
                    ${filteredDebts.reduce((sum, d) => sum + d.planDic, 0).toLocaleString('es-MX', {maximumFractionDigits: 0})}
                  </td>
                  <td className="p-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
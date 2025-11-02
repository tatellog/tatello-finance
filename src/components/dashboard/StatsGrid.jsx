import React from 'react';
import { StatCard } from './StatCard';
import { AlertTriangle, Zap, TrendingDown, DollarSign, Target, Award } from 'lucide-react';

export const StatsGrid = ({ stats, resources, showPrivate, debtsCount }) => {
  return (
    <div className="space-y-4">
      {/* FILA 1: CARDS PRINCIPALES DESTACADOS (3 columnas grandes) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* DISPONIBLE - DESTACADO */}
        <div className="bg-gradient-to-br from-green-900/60 to-green-800/40 border-2 border-green-400 rounded-2xl p-6 shadow-2xl shadow-green-500/30 ring-2 ring-green-400/50 transform hover:scale-105 transition-transform">
          <div className="flex items-center gap-3 text-green-300 mb-3">
            <DollarSign className="w-6 h-6" />
            <span className="text-sm font-bold uppercase tracking-wide">Disponible Noviembre</span>
          </div>
          <p className="text-5xl font-bold text-white mb-2">
            {showPrivate ? `$${resources.novDisponible.toLocaleString('es-MX', {maximumFractionDigits: 0})}` : '•••••'}
          </p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-green-400/30">
            <span className="text-xs text-green-300 font-semibold">MXN</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-300 font-semibold">Listo para usar</span>
            </div>
          </div>
        </div>

        {/* WISE USD - DESTACADO */}
        <div className="bg-gradient-to-br from-blue-900/60 to-blue-800/40 border-2 border-blue-400 rounded-2xl p-6 shadow-2xl shadow-blue-500/30 ring-2 ring-blue-400/50 transform hover:scale-105 transition-transform">
          <div className="flex items-center gap-3 text-blue-300 mb-3">
            <Target className="w-6 h-6" />
            <span className="text-sm font-bold uppercase tracking-wide">Wise Reserva</span>
          </div>
          <p className="text-5xl font-bold text-white mb-1">
            {showPrivate ? `$${resources.wiseUSD.toLocaleString('en-US', {maximumFractionDigits: 2})}` : '•••••'}
          </p>
          <p className="text-sm text-blue-200 font-semibold mb-2">USD</p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-blue-400/30">
            <span className="text-xs text-blue-300">
              {showPrivate ? `≈ $${stats.wiseMXN.toLocaleString('es-MX')} MXN` : '•••••'}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-blue-300 font-semibold">Emergencias</span>
            </div>
          </div>
        </div>

        {/* LIQUIDADAS - DESTACADO */}
        <div className="bg-gradient-to-br from-purple-900/60 to-purple-800/40 border-2 border-purple-400 rounded-2xl p-6 shadow-2xl shadow-purple-500/30 ring-2 ring-purple-400/50 transform hover:scale-105 transition-transform">
          <div className="flex items-center gap-3 text-purple-300 mb-3">
            <Award className="w-6 h-6" />
            <span className="text-sm font-bold uppercase tracking-wide">Deudas Liquidadas</span>
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <p className="text-6xl font-bold text-white">
              {stats.liquidatedCount}
            </p>
            <p className="text-2xl text-purple-300 font-semibold">
              / {debtsCount}
            </p>
          </div>
          <div className="mt-4">
            <div className="bg-purple-500/20 rounded-full h-3 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-full rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${(stats.liquidatedCount / debtsCount) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-purple-300 font-semibold">Progreso</span>
              <span className="text-lg text-purple-200 font-bold">
                {((stats.liquidatedCount / debtsCount) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FILA 2: STATS SECUNDARIOS (grid de 3 columnas) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          icon={AlertTriangle}
          label="Deuda Total"
          value={stats.totalDebt}
          subtitle={`${stats.activeCount} activas`}
          color="red"
          showPrivate={showPrivate}
        />
        <StatCard
          icon={Zap}
          label="Alta Tasa"
          value={stats.highInterestDebt}
          subtitle="≥60%"
          color="orange"
          showPrivate={showPrivate}
        />
        <StatCard
          icon={TrendingDown}
          label="Pagos/Mes"
          value={stats.monthlyPayments}
          subtitle={`${stats.paymentPercentage.toFixed(1)}%`}
          color="yellow"
          showPrivate={showPrivate}
        />
      </div>
    </div>
  );
};
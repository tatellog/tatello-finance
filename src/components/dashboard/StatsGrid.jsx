import React from 'react';
import { StatCard } from './StatCard';
import { AlertTriangle, Zap, TrendingDown, DollarSign, Target, Award } from 'lucide-react';

export const StatsGrid = ({ stats, resources, showPrivate, debtsCount }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
      <StatCard
        icon={DollarSign}
        label="Disponible"
        value={resources.novDisponible}
        subtitle="Nov 2025"
        color="green"
        showPrivate={showPrivate}
      />
      <StatCard
        icon={Target}
        label="Wise USD"
        value={resources.wiseUSD}
        subtitle={`$${stats.wiseMXN.toLocaleString('es-MX')} MXN`}
        color="blue"
        showPrivate={showPrivate}
      />
      <StatCard
        icon={Award}
        label="Liquidadas"
        value={stats.liquidatedCount}
        subtitle={`de ${debtsCount}`}
        color="purple"
        showPrivate={false}
      />
    </div>
  );
};
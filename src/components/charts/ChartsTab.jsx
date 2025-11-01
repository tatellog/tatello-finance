import React from 'react';
import { CircularProgress } from './CircularProgress';
import { DebtBreakdownChart } from './DebtBreakdownChart';
import { MonthlyProgressChart } from './MonthlyProgressChart';
import { TopDebtsChart } from './TopDebtsChart';
import { PaymentHistoryChart } from './PaymentHistoryChart';

export const ChartsTab = ({ debts, payments, stats, resources, config }) => {
  const debtReductionPercentage = ((stats.liquidatedCount / debts.length) * 100);
  const budgetUsagePercentage = (stats.monthlyPayments / config.monthlyIncome) * 100;

  return (
    <div className="space-y-8">
      
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/30 rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-sm font-medium text-blue-400 mb-4">Deudas Liquidadas</h3>
          <CircularProgress percentage={debtReductionPercentage} color="blue" />
          <p className="mt-4 text-center text-sm text-slate-300">
            {stats.liquidatedCount} de {debts.length} deudas
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-sm font-medium text-green-400 mb-4">Progreso Mensual</h3>
          <CircularProgress percentage={100 - budgetUsagePercentage} color="green" />
          <p className="mt-4 text-center text-sm text-slate-300">
            ${stats.available.toLocaleString('es-MX')} disponible
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-sm font-medium text-purple-400 mb-4">Total Pagado</h3>
          <div className="text-center">
            <p className="text-4xl font-bold text-white mt-8">
              ${stats.totalPaid.toLocaleString('es-MX', {maximumFractionDigits: 0})}
            </p>
            <p className="text-sm text-slate-300 mt-2">Histórico de pagos</p>
          </div>
        </div>
      </div>

      {/* Debt Breakdown */}
      <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
        <DebtBreakdownChart debts={debts} />
      </div>

      {/* Monthly Progress */}
      <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
        <MonthlyProgressChart stats={stats} resources={resources} config={config} />
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
          <TopDebtsChart debts={debts} />
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
          <PaymentHistoryChart payments={payments} />
        </div>
      </div>

    </div>
  );
};
import React from 'react';
import { PlanCard } from './PlanCard';

export const MonthlyPlan = ({ debts, resources, config, stats }) => {
  const novemberDebts = debts
    .filter(d => d.planNov > 0)
    .sort((a, b) => b.priority - a.priority)
    .map(d => ({ id: d.id, entity: d.entity, amount: d.planNov, priority: d.priority }));

  const decemberDebts = debts
    .filter(d => d.planDic > 0)
    .map(d => ({ id: d.id, entity: d.entity, amount: d.planDic }));

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <PlanCard
        title="Plan Noviembre"
        color="orange"
        available={resources.novDisponible}
        availableLabel="Disponible"
        debts={novemberDebts}
        total={stats.planNovTotal}
        remaining={stats.disponibleDespuesPlan}
        remainingLabel="Restante"
      />

      <PlanCard
        title="Plan Diciembre"
        color="blue"
        available={config.monthlyIncome}
        availableLabel="Ingreso"
        debts={decemberDebts}
        total={stats.planDicTotal}
        remaining={config.monthlyIncome - stats.planDicTotal}
        remainingLabel="Total plan"
      />
    </div>
  );
};
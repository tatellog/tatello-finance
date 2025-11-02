import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { TabNavigation } from './components/layout/TabNavigation';
import { StatsGrid } from './components/dashboard/StatsGrid';
import { MonthlyPlan } from './components/plans/MonthlyPlan';
import { DebtTable } from './components/debts/DebtTable';
import { PaymentsList } from './components/payments/PaymentsList';
import { ChartsTab } from './components/charts/ChartsTab';
import { 
  useDebtsStorage, 
  usePaymentsStorage, 
  useResourcesStorage, 
  useConfigStorage 
} from './hooks/useLocalStorage';
import { calculateStats } from './utils/calculations';
import { getTodayDate } from './utils/formatters';
import { 
  initialConfig, 
  initialResources, 
  initialDebts, 
  initialPayments 
} from './data/initialData';

export default function App() {
  const [editMode, setEditMode] = useState(false);
  const [showPrivate, setShowPrivate] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'debts', 'payments', 'charts'
  
  const [config] = useConfigStorage(initialConfig);
  const [resources] = useResourcesStorage(initialResources);
  const [debts, setDebts] = useDebtsStorage(initialDebts);
  const [payments, setPayments] = usePaymentsStorage(initialPayments);

  const stats = calculateStats(debts, payments, resources, config);

  const handleToggleDebtStatus = (id) => {
    setDebts(debts.map(debt => {
      if (debt.id === id) {
        const newStatus = debt.status === 'liquidado' ? 'activo' : 'liquidado';
        return { ...debt, status: newStatus };
      }
      return debt;
    }));
  };

  const handleAddPayment = () => {
    const newPayment = {
      id: `p${Date.now()}`,
      date: getTodayDate(),
      entity: '',
      amount: 0,
      type: 'pago',
      status: 'pendiente'
    };
    setPayments([newPayment, ...payments]);
  };

  const handleUpdatePayment = (id, field, value) => {
    setPayments(payments.map(p => 
      p.id === id ? { ...p, [field]: field === 'amount' ? parseFloat(value) || 0 : value } : p
    ));
  };

  const handleDeletePayment = (id) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('¡Link copiado! Compártelo con tu hermana:\n\n' + url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      <div className="max-w-[1800px] mx-auto space-y-6">
        
        <Header
          userName={config.userName}
          showPrivate={showPrivate}
          editMode={editMode}
          onTogglePrivacy={() => setShowPrivate(!showPrivate)}
          onToggleEdit={() => setEditMode(!editMode)}
          onShare={handleShare}
        />

        <StatsGrid 
          stats={stats}
          resources={resources}
          showPrivate={showPrivate}
          debtsCount={debts.length}
        />

        <TabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'overview' && (
          <MonthlyPlan
            debts={debts}
            resources={resources}
            config={config}
            stats={stats}
          />
        )}

        {activeTab === 'debts' && (
          <DebtTable
            debts={debts}
            showPrivate={showPrivate}
            onToggleStatus={handleToggleDebtStatus}
          />
        )}

        {activeTab === 'payments' && (
          <PaymentsList
            payments={payments}
            totalPaid={stats.totalPaid}
            onAdd={handleAddPayment}
            onUpdate={handleUpdatePayment}
            onDelete={handleDeletePayment}
          />
        )}

        {activeTab === 'charts' && (
          <ChartsTab
            debts={debts}
            payments={payments}
            stats={stats}
            resources={resources}
            config={config}
          />
        )}

      </div>
    </div>
  );
}
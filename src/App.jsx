import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { TabNavigation } from './components/layout/TabNavigation';
import { StatsGrid } from './components/dashboard/StatsGrid';
import { EditableResources } from './components/dashboard/EditableResources';
import { MonthlyPlan } from './components/plans/MonthlyPlan';
import { DebtTable } from './components/debts/DebtTable';
import { PaymentsList } from './components/payments/PaymentsList';
import { ChartsTab } from './components/charts/ChartsTab';
import { PaymentModal } from './components/debts/PaymentModal';
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
  const [activeTab, setActiveTab] = useState('overview');
  const [payingDebt, setPayingDebt] = useState(null);
  
  const [config, setConfig] = useConfigStorage(initialConfig);
  const [resources, setResources] = useResourcesStorage(initialResources);
  const [debts, setDebts] = useDebtsStorage(initialDebts);
  const [payments, setPayments] = usePaymentsStorage(initialPayments);

  const stats = calculateStats(debts, payments, resources, config);

  const handleToggleDebtStatus = (id) => {
    const debt = debts.find(d => d.id === id);
    
    if (debt.status !== 'liquidado') {
      setPayingDebt(debt);
    } else {
      setDebts(debts.map(d => 
        d.id === id ? { ...d, status: 'activo' } : d
      ));
    }
  };

  const handleConfirmPayment = ({ updatedResources, source, amount, debtId, paymentType, newBalance }) => {
    setResources(updatedResources);

    setDebts(debts.map(debt => {
      if (debt.id === debtId) {
        return {
          ...debt,
          balance: newBalance,
          status: newBalance <= 0 ? 'liquidado' : debt.status
        };
      }
      return debt;
    }));

    const newPayment = {
      id: `p${Date.now()}`,
      date: getTodayDate(),
      entity: payingDebt.entity,
      amount: amount,
      type: paymentType === 'liquidar' ? 'liquidación' : 'abono',
      status: 'completado',
      source: source === 'novDisponible' ? 'Disponible Nov' : 'Wise USD'
    };
    setPayments([newPayment, ...payments]);

    setPayingDebt(null);

    const message = paymentType === 'liquidar'
      ? `✅ ¡Deuda liquidada!\n\n${payingDebt.entity}: $${amount.toLocaleString('es-MX')}\nFuente: ${source === 'novDisponible' ? 'Disponible Noviembre' : 'Wise USD'}`
      : `✅ ¡Abono realizado!\n\n${payingDebt.entity}\nAbono: $${amount.toLocaleString('es-MX')}\nNuevo saldo: $${newBalance.toLocaleString('es-MX')}\nFuente: ${source === 'novDisponible' ? 'Disponible Noviembre' : 'Wise USD'}`;
    
    alert(message);
  };

  const handleUpdateDebt = (id, field, value) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const handleUpdateResource = (field, value) => {
    setResources({ ...resources, [field]: value });
  };

  const handleUpdateConfig = (field, value) => {
    setConfig({ ...config, [field]: value });
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

        {editMode && (
          <EditableResources
            resources={resources}
            config={config}
            editMode={editMode}
            onUpdateResource={handleUpdateResource}
            onUpdateConfig={handleUpdateConfig}
          />
        )}

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
            editMode={editMode}
            onToggleStatus={handleToggleDebtStatus}
            onUpdate={handleUpdateDebt}
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

        {payingDebt && (
          <PaymentModal
            debt={payingDebt}
            resources={resources}
            config={config}
            onConfirm={handleConfirmPayment}
            onCancel={() => setPayingDebt(null)}
          />
        )}

      </div>
    </div>
  );
}
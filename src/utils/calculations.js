export const calculateTotalDebt = (debts) => {
  return debts
    .filter(d => d.status !== 'liquidado')
    .reduce((sum, d) => sum + d.balance, 0);
};

export const calculateFinancialDebt = (debts) => {
  return debts
    .filter(d => d.status !== 'liquidado' && d.type !== 'personal')
    .reduce((sum, d) => sum + d.balance, 0);
};

export const calculateMonthlyPayments = (debts) => {
  return debts
    .filter(d => d.status !== 'liquidado' && d.type !== 'personal')
    .reduce((sum, d) => sum + d.payment, 0);
};

export const calculateHighInterestDebt = (debts, threshold = 60) => {
  return debts
    .filter(d => d.status !== 'liquidado' && d.type !== 'personal' && d.rate >= threshold)
    .reduce((sum, d) => sum + d.balance, 0);
};

export const calculatePlanTotal = (debts, planField) => {
  return debts.reduce((sum, d) => sum + (d[planField] || 0), 0);
};

export const calculateTotalPaid = (payments) => {
  return payments.reduce((sum, p) => sum + p.amount, 0);
};

export const calculateLiquidatedCount = (debts) => {
  return debts.filter(d => d.status === 'liquidado').length;
};

export const calculateActiveCount = (debts) => {
  return debts.filter(d => d.status !== 'liquidado').length;
};

export const calculatePaymentPercentage = (monthlyPayments, monthlyIncome) => {
  return (monthlyPayments / monthlyIncome) * 100;
};

export const calculateStats = (debts, payments, resources, config) => {
  const activeDebts = debts.filter(d => d.status !== 'liquidado');
  const financialDebts = activeDebts.filter(d => d.type !== 'personal');
  
  const totalDebt = calculateTotalDebt(debts);
  const totalFinancialDebt = calculateFinancialDebt(debts);
  const monthlyPayments = calculateMonthlyPayments(debts);
  const highInterestDebt = calculateHighInterestDebt(debts);
  const planNovTotal = calculatePlanTotal(debts, 'planNov');
  const planDicTotal = calculatePlanTotal(debts, 'planDic');
  const totalPaid = calculateTotalPaid(payments);
  const liquidatedCount = calculateLiquidatedCount(debts);
  const activeCount = calculateActiveCount(debts);
  
  const wiseMXN = resources.wiseUSD * config.exchangeRate;
  const disponibleDespuesPlan = resources.novDisponible - planNovTotal;
  const paymentPercentage = calculatePaymentPercentage(monthlyPayments, config.monthlyIncome);
  
  return {
    totalDebt,
    totalFinancialDebt,
    monthlyPayments,
    highInterestDebt,
    planNovTotal,
    planDicTotal,
    totalPaid,
    liquidatedCount,
    activeCount,
    wiseMXN,
    disponibleDespuesPlan,
    paymentPercentage
  };
};
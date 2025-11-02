export const initialConfig = {
  exchangeRate: 18.5,
  monthlyIncome: 194250,
  currentMonth: 'noviembre',
  userName: 'Tatello'
};

export const initialResources = {
  novDisponible: 152535.11,
  wiseUSD: 1920.77,
  fondoEmergencia: 0,
  ahorroTotal: 0
};

export const initialDebts = [
  // ==================== PRÉSTAMOS ====================
  { 
    id: 1, 
    entity: 'Avafin', 
    balance: 12025, 
    rate: 120, 
    payment: 12025, 
    status: 'liquidado', 
    type: 'prestamo', 
    priority: 1, 
    dueDate: 'Inmediato', 
    planNov: 0, 
    planDic: 0 
  },
  { 
    id: 2, 
    entity: 'Creditea', 
    balance: 44400, 
    rate: 60, 
    payment: 3700, 
    status: 'activo', 
    type: 'prestamo', 
    priority: 2, 
    dueDate: 'Flexible', 
    planNov: 17000, 
    planDic: 10000 
  },
  { 
    id: 3, 
    entity: 'Escampa', 
    balance: 59860.69, 
    rate: 75, 
    payment: 2722.67, 
    status: 'activo', 
    type: 'prestamo', 
    priority: 2, 
    dueDate: '31 oct 2025', 
    planNov: 23000, 
    planDic: 20525 
  },
  { 
    id: 4, 
    entity: 'Libertad Crédito Tradicional', 
    balance: 158646.84, 
    rate: 24.75, 
    payment: 11730, 
    status: 'activo', 
    type: 'prestamo', 
    priority: 3, 
    dueDate: '28 oct 2025', 
    planNov: 0, 
    planDic: 11730 
  },
  { 
    id: 5, 
    entity: 'Stori Préstamo', 
    balance: 47655.11, 
    rate: 90, 
    payment: 11780.79, 
    status: 'mora', 
    type: 'prestamo', 
    priority: 1, 
    dueDate: 'Inmediato', 
    planNov: 19127, 
    planDic: 0 
  },
  { 
    id: 6, 
    entity: 'Klar Préstamo Personal', 
    balance: 14414.6, 
    rate: 50, 
    payment: 1801.82, 
    status: 'corriente', 
    type: 'prestamo', 
    priority: 3, 
    dueDate: '31 oct 2025', 
    planNov: 0, 
    planDic: 1802 
  },
  { 
    id: 7, 
    entity: 'BBVA Crédito Personal (PR4234)', 
    balance: 400000, 
    rate: 24.75, 
    payment: 13952.6, 
    status: 'corriente', 
    type: 'prestamo', 
    priority: 3, 
    dueDate: '1 nov 2025', 
    planNov: 0, 
    planDic: 13953 
  },
  { 
    id: 8, 
    entity: 'Nelo Crédito', 
    balance: 3590.53, 
    rate: 0, 
    payment: 0, 
    status: 'liquidado', 
    type: 'prestamo', 
    priority: 0, 
    dueDate: 'Flexible', 
    planNov: 0, 
    planDic: 0 
  },
  
  // ==================== DEUDAS PERSONALES ====================
  { 
    id: 9, 
    entity: 'Ángel (cafetera)', 
    balance: 9000, 
    rate: 0, 
    payment: 3000, 
    status: 'personal', 
    type: 'personal', 
    priority: 2, 
    dueDate: 'Dic 2025', 
    planNov: 0, 
    planDic: 9000 
  },
  { 
    id: 10, 
    entity: 'Ángel (viaje Egipto)', 
    balance: 26500, 
    rate: 0, 
    payment: 26500, 
    status: 'personal', 
    type: 'personal', 
    priority: 1, 
    dueDate: '30 nov', 
    planNov: 26500, 
    planDic: 0 
  },
  { 
    id: 11, 
    entity: 'Viaje Egipto (restante)', 
    balance: 35000, 
    rate: 0, 
    payment: 35000, 
    status: 'viaje', 
    type: 'personal', 
    priority: 1, 
    dueDate: '9 dic', 
    planNov: 0, 
    planDic: 35000 
  },
  { 
    id: 12, 
    entity: 'Viaje Japón 2027', 
    balance: 8500, 
    rate: 0, 
    payment: 8500, 
    status: 'viaje', 
    type: 'personal', 
    priority: 0, 
    dueDate: '22 dic 2025', 
    planNov: 0, 
    planDic: 0 
  },
  
  // ==================== TARJETAS DE CRÉDITO ====================
  { 
    id: 13, 
    entity: 'Plata Card', 
    balance: 36369, 
    rate: 0, 
    payment: 7400, 
    status: 'bloqueada', 
    type: 'tarjeta', 
    priority: 2, 
    dueDate: '12 nov', 
    planNov: 7400, 
    planDic: 0 
  },
  { 
    id: 14, 
    entity: 'RappiCard', 
    balance: 14457.95, 
    rate: 0, 
    payment: 2667.33, 
    status: 'activo', 
    type: 'tarjeta', 
    priority: 3, 
    dueDate: 'Variable', 
    planNov: 0, 
    planDic: 2667 
  },
  { 
    id: 15, 
    entity: 'Klar Crédito', 
    balance: 13569.77, 
    rate: 0, 
    payment: 3674.17, 
    status: 'suspendida', 
    type: 'tarjeta', 
    priority: 3, 
    dueDate: '31 oct', 
    planNov: 0, 
    planDic: 0 
  },
  { 
    id: 16, 
    entity: 'Stori Crédito', 
    balance: 15000, 
    rate: 0, 
    payment: 6427.29, 
    status: 'bloqueada', 
    type: 'tarjeta', 
    priority: 2, 
    dueDate: 'Inmediato', 
    planNov: 0, 
    planDic: 0 
  },
  { 
    id: 17, 
    entity: 'BBVA TC8745', 
    balance: 71522.94, 
    rate: 0, 
    payment: 0, 
    status: 'liquidado', 
    type: 'tarjeta', 
    priority: 0, 
    dueDate: '10 nov', 
    planNov: 0, 
    planDic: 0 
  },
  { 
    id: 18, 
    entity: 'Nu (Morada)', 
    balance: 5740.38, 
    rate: 0, 
    payment: 500, 
    status: 'corriente', 
    type: 'tarjeta', 
    priority: 3, 
    dueDate: '11 nov', 
    planNov: 0, 
    planDic: 500 
  },
  { 
    id: 19, 
    entity: 'Amex (1374)', 
    balance: 0, 
    rate: 0, 
    payment: 0, 
    status: 'liquidado', 
    type: 'tarjeta', 
    priority: 0, 
    dueDate: '14 nov', 
    planNov: 0, 
    planDic: 0 
  },
  { 
    id: 20, 
    entity: 'Novacard', 
    balance: 7852.68, 
    rate: 0, 
    payment: 7852.68, 
    status: 'vencida', 
    type: 'tarjeta', 
    priority: 2, 
    dueDate: '29 oct', 
    planNov: 3900, 
    planDic: 0 
  },
  { 
    id: 21, 
    entity: 'DidiCard', 
    balance: 500, 
    rate: 0, 
    payment: 500, 
    status: 'vencida', 
    type: 'tarjeta', 
    priority: 2, 
    dueDate: '30 oct', 
    planNov: 0, 
    planDic: 0 
  },
  { 
    id: 22, 
    entity: 'Ualá', 
    balance: 4240.38, 
    rate: 0, 
    payment: 500, 
    status: 'corriente', 
    type: 'tarjeta', 
    priority: 3, 
    dueDate: '11 nov', 
    planNov: 0, 
    planDic: 500 
  }
];

export const initialPayments = [
  { id: 'p1', date: '2025-11-03', entity: 'BBVA TC8745', amount: 71522.94, type: 'liquidación', status: 'completado' },
  { id: 'p2', date: '2025-11-03', entity: 'Plata Card', amount: 7400, type: 'pago', status: 'completado' },
  { id: 'p3', date: '2025-10-31', entity: 'Escampa', amount: 2722.67, type: 'pago mensual', status: 'completado' },
];
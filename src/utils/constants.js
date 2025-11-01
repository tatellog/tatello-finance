export const EXCHANGE_RATE = 18.5;

export const DEBT_STATUS = {
  MORA: 'mora',
  ACTIVO: 'activo',
  CORRIENTE: 'corriente',
  LIQUIDADO: 'liquidado',
  PERSONAL: 'personal',
  VIAJE: 'viaje',
  BLOQUEADA: 'bloqueada',
  SUSPENDIDA: 'suspendida',
  VENCIDA: 'vencida'
};

export const DEBT_TYPES = {
  PRESTAMO: 'prestamo',
  TARJETA: 'tarjeta',
  PERSONAL: 'personal'
};

export const PAYMENT_STATUS = {
  PENDIENTE: 'pendiente',
  COMPLETADO: 'completado'
};

export const PRIORITY_LEVELS = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3
};

export const PRIORITY_ICONS = {
  [PRIORITY_LEVELS.HIGH]: '🔴',
  [PRIORITY_LEVELS.MEDIUM]: '🟡',
  [PRIORITY_LEVELS.LOW]: '🟢',
  0: '⚪'
};

export const STATUS_COLORS = {
  [DEBT_STATUS.MORA]: 'bg-red-500/20 text-red-400 border-red-500/50',
  [DEBT_STATUS.ACTIVO]: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  [DEBT_STATUS.CORRIENTE]: 'bg-green-500/20 text-green-400 border-green-500/50',
  [DEBT_STATUS.LIQUIDADO]: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  [DEBT_STATUS.PERSONAL]: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  [DEBT_STATUS.VIAJE]: 'bg-pink-500/20 text-pink-400 border-pink-500/50',
  [DEBT_STATUS.BLOQUEADA]: 'bg-red-500/20 text-red-300 border-red-500/50',
  [DEBT_STATUS.SUSPENDIDA]: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  [DEBT_STATUS.VENCIDA]: 'bg-orange-500/20 text-orange-400 border-orange-500/50'
};

export const MONTHS = {
  NOVEMBER: 'noviembre',
  DECEMBER: 'diciembre'
};

export const TABS = {
  OVERVIEW: 'overview',
  DEBTS: 'debts',
  PAYMENTS: 'payments',
  CHARTS: 'charts' // ← NUEVO TAB
};

export const LOCAL_STORAGE_KEYS = {
  DEBTS: 'tatello-debts',
  PAYMENTS: 'tatello-payments',
  RESOURCES: 'tatello-resources',
  CONFIG: 'tatello-config'
};

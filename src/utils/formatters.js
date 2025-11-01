export const formatCurrency = (amount, locale = 'es-MX', currency = 'MXN') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatCurrencySimple = (amount, locale = 'es-MX') => {
  return `$${amount.toLocaleString(locale, { maximumFractionDigits: 0 })}`;
};

export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const hideAmount = (amount, show = false) => {
  return show ? formatCurrencySimple(amount) : '•••••';
};

export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};
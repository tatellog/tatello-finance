import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
};

export const useDebtsStorage = (initialDebts) => {
  return useLocalStorage(LOCAL_STORAGE_KEYS.DEBTS, initialDebts);
};

export const usePaymentsStorage = (initialPayments) => {
  return useLocalStorage(LOCAL_STORAGE_KEYS.PAYMENTS, initialPayments);
};

export const useResourcesStorage = (initialResources) => {
  return useLocalStorage(LOCAL_STORAGE_KEYS.RESOURCES, initialResources);
};

export const useConfigStorage = (initialConfig) => {
  return useLocalStorage(LOCAL_STORAGE_KEYS.CONFIG, initialConfig);
};
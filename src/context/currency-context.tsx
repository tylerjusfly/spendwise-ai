"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export const currencies = [
  { label: 'USD ($)', value: 'USD', symbol: '$' },
  { label: 'EUR (€)', value: 'EUR', symbol: '€' },
  { label: 'GBP (£)', value: 'GBP', symbol: '£' },
  { label: 'JPY (¥)', value: 'JPY', symbol: '¥' },
  { label: 'NGN (₦)', value: 'NGN', symbol: '₦' },
  { label: 'INR (₹)', value: 'INR', symbol: '₹' },
];

interface CurrencyContextType {
  currencyCode: string;
  symbol: string;
  setCurrencyCode: (code: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  useEffect(() => {
    const saved = localStorage.getItem('spendwise_currency');
    if (saved) {
      setCurrencyCode(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('spendwise_currency', currencyCode);
    const selected = currencies.find(c => c.value === currencyCode);
    if (selected) {
      setSymbol(selected.symbol);
    }
  }, [currencyCode]);

  return (
    <CurrencyContext.Provider value={{ currencyCode, symbol, setCurrencyCode }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

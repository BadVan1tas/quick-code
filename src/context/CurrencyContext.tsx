"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "USD" | "INR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
  rate: number;
  formatAmount: (usdAmount: number) => string;
  formatPriceString: (priceStr: string) => string;
}

const USD_TO_INR = 95.21;

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  toggleCurrency: () => {},
  rate: USD_TO_INR,
  formatAmount: (amount) => `$${amount.toLocaleString("en-US")}`,
  formatPriceString: (str) => str,
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const saved = localStorage.getItem("quikcode_currency") as Currency | null;
    if (saved === "USD" || saved === "INR") {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("quikcode_currency", c);
  };

  const toggleCurrency = () => {
    const next = currency === "USD" ? "INR" : "USD";
    setCurrency(next);
  };

  const formatAmount = (usdAmount: number): string => {
    if (currency === "INR") {
      const inrAmount = Math.round(usdAmount * USD_TO_INR);
      return `₹${inrAmount.toLocaleString("en-IN")}`;
    }
    return `$${usdAmount.toLocaleString("en-US")}`;
  };

  const formatPriceString = (priceStr: string): string => {
    if (!priceStr || currency === "USD") return priceStr;

    // Matches numbers inside price string, e.g. "$499", "$1,499", "$2,999+"
    return priceStr.replace(/\$([0-9,]+)/g, (match, rawNum) => {
      const numericVal = parseInt(rawNum.replace(/,/g, ""), 10);
      if (isNaN(numericVal)) return match;
      const inrVal = Math.round(numericVal * USD_TO_INR);
      return `₹${inrVal.toLocaleString("en-IN")}`;
    });
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        rate: USD_TO_INR,
        formatAmount,
        formatPriceString,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);

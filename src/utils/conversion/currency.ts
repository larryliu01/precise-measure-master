
import { ConversionCategory } from './types';

export const currencyCategory: ConversionCategory = {
  name: "Currency",
  baseUnit: "usd",
  icon: "dollar",
  units: {
    usd: {
      label: "US Dollar (USD)",
      toBase: (usd: number) => usd,
      fromBase: (usd: number) => usd
    },
    eur: {
      label: "Euro (EUR)",
      toBase: (eur: number) => eur * 1.08,
      fromBase: (usd: number) => usd / 1.08
    },
    gbp: {
      label: "British Pound (GBP)",
      toBase: (gbp: number) => gbp * 1.26,
      fromBase: (usd: number) => usd / 1.26
    },
    jpy: {
      label: "Japanese Yen (JPY)",
      toBase: (jpy: number) => jpy * 0.0066,
      fromBase: (usd: number) => usd / 0.0066
    },
    cad: {
      label: "Canadian Dollar (CAD)",
      toBase: (cad: number) => cad * 0.74,
      fromBase: (usd: number) => usd / 0.74
    },
    aud: {
      label: "Australian Dollar (AUD)",
      toBase: (aud: number) => aud * 0.66,
      fromBase: (usd: number) => usd / 0.66
    },
    chf: {
      label: "Swiss Franc (CHF)",
      toBase: (chf: number) => chf * 1.13,
      fromBase: (usd: number) => usd / 1.13
    },
    cny: {
      label: "Chinese Yuan (CNY)",
      toBase: (cny: number) => cny * 0.14,
      fromBase: (usd: number) => usd / 0.14
    },
    inr: {
      label: "Indian Rupee (INR)",
      toBase: (inr: number) => inr * 0.012,
      fromBase: (usd: number) => usd / 0.012
    },
    krw: {
      label: "South Korean Won (KRW)",
      toBase: (krw: number) => krw * 0.00074,
      fromBase: (usd: number) => usd / 0.00074
    }
  }
};

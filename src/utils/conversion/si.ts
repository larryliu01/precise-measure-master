import { ConversionCategory } from './types';

export const siCategory: ConversionCategory = {
  name: "SI Prefixes",
  baseUnit: "base",
  icon: "ruler",
  units: {
    "base": {
      label: "Base Unit (no prefix)",
      toBase: (val: number) => val,
      fromBase: (val: number) => val
    },
    "yotta": {
      label: "Yotta (Y) - 10²⁴",
      toBase: (val: number) => val * 1e24,
      fromBase: (val: number) => val / 1e24
    },
    "zetta": {
      label: "Zetta (Z) - 10²¹",
      toBase: (val: number) => val * 1e21,
      fromBase: (val: number) => val / 1e21
    },
    "exa": {
      label: "Exa (E) - 10¹⁸",
      toBase: (val: number) => val * 1e18,
      fromBase: (val: number) => val / 1e18
    },
    "peta": {
      label: "Peta (P) - 10¹⁵",
      toBase: (val: number) => val * 1e15,
      fromBase: (val: number) => val / 1e15
    },
    "tera": {
      label: "Tera (T) - 10¹²",
      toBase: (val: number) => val * 1e12,
      fromBase: (val: number) => val / 1e12
    },
    "giga": {
      label: "Giga (G) - 10⁹",
      toBase: (val: number) => val * 1e9,
      fromBase: (val: number) => val / 1e9
    },
    "mega": {
      label: "Mega (M) - 10⁶",
      toBase: (val: number) => val * 1e6,
      fromBase: (val: number) => val / 1e6
    },
    "kilo": {
      label: "Kilo (k) - 10³",
      toBase: (val: number) => val * 1e3,
      fromBase: (val: number) => val / 1e3
    },
    "hecto": {
      label: "Hecto (h) - 10²",
      toBase: (val: number) => val * 1e2,
      fromBase: (val: number) => val / 1e2
    },
    "deca": {
      label: "Deca (da) - 10¹",
      toBase: (val: number) => val * 1e1,
      fromBase: (val: number) => val / 1e1
    },
    "deci": {
      label: "Deci (d) - 10⁻¹",
      toBase: (val: number) => val * 1e-1,
      fromBase: (val: number) => val / 1e-1
    },
    "centi": {
      label: "Centi (c) - 10⁻²",
      toBase: (val: number) => val * 1e-2,
      fromBase: (val: number) => val / 1e-2
    },
    "milli": {
      label: "Milli (m) - 10⁻³",
      toBase: (val: number) => val * 1e-3,
      fromBase: (val: number) => val / 1e-3
    },
    "micro": {
      label: "Micro (μ) - 10⁻⁶",
      toBase: (val: number) => val * 1e-6,
      fromBase: (val: number) => val / 1e-6
    },
    "nano": {
      label: "Nano (n) - 10⁻⁹",
      toBase: (val: number) => val * 1e-9,
      fromBase: (val: number) => val / 1e-9
    },
    "pico": {
      label: "Pico (p) - 10⁻¹²",
      toBase: (val: number) => val * 1e-12,
      fromBase: (val: number) => val / 1e-12
    },
    "femto": {
      label: "Femto (f) - 10⁻¹⁵",
      toBase: (val: number) => val * 1e-15,
      fromBase: (val: number) => val / 1e-15
    },
    "atto": {
      label: "Atto (a) - 10⁻¹⁸",
      toBase: (val: number) => val * 1e-18,
      fromBase: (val: number) => val / 1e-18
    },
    "zepto": {
      label: "Zepto (z) - 10⁻²¹",
      toBase: (val: number) => val * 1e-21,
      fromBase: (val: number) => val / 1e-21
    },
    "yocto": {
      label: "Yocto (y) - 10⁻²⁴",
      toBase: (val: number) => val * 1e-24,
      fromBase: (val: number) => val / 1e-24
    }
  }
}; 
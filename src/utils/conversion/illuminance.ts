import { ConversionCategory } from './types';

export const illuminanceCategory: ConversionCategory = {
  name: "Illuminance",
  baseUnit: "lux",
  icon: "sun",
  units: {
    "lux": {
      label: "Lux (lx)",
      toBase: (lx: number) => lx,
      fromBase: (lx: number) => lx
    },
    "footcandle": {
      label: "Foot-candle (fc)",
      toBase: (fc: number) => fc * 10.7639,
      fromBase: (lx: number) => lx / 10.7639
    },
    "phot": {
      label: "Phot (ph)",
      toBase: (ph: number) => ph * 10000,
      fromBase: (lx: number) => lx / 10000
    },
    "nox": {
      label: "Nox",
      toBase: (nox: number) => nox * 0.001,
      fromBase: (lx: number) => lx / 0.001
    },
    "candela_per_square_meter": {
      label: "Candela per square meter (cd/m²)",
      toBase: (cd: number) => cd,
      fromBase: (lx: number) => lx
    },
    "candela_per_square_foot": {
      label: "Candela per square foot (cd/ft²)",
      toBase: (cd: number) => cd * 10.7639,
      fromBase: (lx: number) => lx / 10.7639
    },
    "lumen_per_square_meter": {
      label: "Lumen per square meter (lm/m²)",
      toBase: (lm: number) => lm,
      fromBase: (lx: number) => lx
    },
    "lumen_per_square_foot": {
      label: "Lumen per square foot (lm/ft²)",
      toBase: (lm: number) => lm * 10.7639,
      fromBase: (lx: number) => lx / 10.7639
    }
  }
}; 
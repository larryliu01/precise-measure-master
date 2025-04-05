
import { ConversionCategory } from './types';

export const temperatureCategory: ConversionCategory = {
  name: "Temperature",
  baseUnit: "celsius",
  icon: "thermometer",
  units: {
    "celsius": {
      label: "Celsius (°C)",
      toBase: (c: number) => c,
      fromBase: (c: number) => c
    },
    "fahrenheit": {
      label: "Fahrenheit (°F)",
      toBase: (f: number) => (f - 32) * 5/9,
      fromBase: (c: number) => c * 9/5 + 32
    },
    "kelvin": {
      label: "Kelvin (K)",
      toBase: (k: number) => k - 273.15,
      fromBase: (c: number) => c + 273.15
    },
    "rankine": {
      label: "Rankine (°R)",
      toBase: (r: number) => (r - 491.67) * 5/9,
      fromBase: (c: number) => c * 9/5 + 491.67
    },
    "reaumur": {
      label: "Réaumur (°Ré)",
      toBase: (re: number) => re * 1.25,
      fromBase: (c: number) => c * 0.8
    },
    "newton": {
      label: "Newton (°N)",
      toBase: (n: number) => n * 100/33,
      fromBase: (c: number) => c * 33/100
    },
    "delisle": {
      label: "Delisle (°De)",
      toBase: (de: number) => 100 - de * 2/3,
      fromBase: (c: number) => (100 - c) * 3/2
    },
    "romer": {
      label: "Rømer (°Rø)",
      toBase: (ro: number) => (ro - 7.5) * 40/21,
      fromBase: (c: number) => c * 21/40 + 7.5
    },
    "planck": {
      label: "Planck Temperature (T_P)",
      toBase: (p: number) => p * 1.416784e+32 - 273.15,
      fromBase: (c: number) => (c + 273.15) / 1.416784e+32
    },
    "leduc": {
      label: "Leduc (°L)",
      toBase: (l: number) => l * 0.6 + 28.3,
      fromBase: (c: number) => (c - 28.3) / 0.6
    }
  }
};

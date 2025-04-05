
import { ConversionCategory } from './types';

export const pressureCategory: ConversionCategory = {
  name: "Pressure",
  baseUnit: "pascals",
  icon: "gauge",
  units: {
    "pascals": {
      label: "Pascals (Pa)",
      toBase: (pa: number) => pa,
      fromBase: (pa: number) => pa
    },
    "kilopascals": {
      label: "Kilopascals (kPa)",
      toBase: (kpa: number) => kpa * 1000,
      fromBase: (pa: number) => pa / 1000
    },
    "megapascals": {
      label: "Megapascals (MPa)",
      toBase: (mpa: number) => mpa * 1000000,
      fromBase: (pa: number) => pa / 1000000
    },
    "bar": {
      label: "Bar",
      toBase: (bar: number) => bar * 100000,
      fromBase: (pa: number) => pa / 100000
    },
    "psi": {
      label: "PSI",
      toBase: (psi: number) => psi * 6894.76,
      fromBase: (pa: number) => pa / 6894.76
    },
    "atmospheres": {
      label: "Atmospheres (atm)",
      toBase: (atm: number) => atm * 101325,
      fromBase: (pa: number) => pa / 101325
    },
    "torr": {
      label: "Torr",
      toBase: (torr: number) => torr * 133.322,
      fromBase: (pa: number) => pa / 133.322
    },
    "millimeters_mercury": {
      label: "Millimeters of Mercury (mmHg)",
      toBase: (mmhg: number) => mmhg * 133.322,
      fromBase: (pa: number) => pa / 133.322
    },
    "inches_mercury": {
      label: "Inches of Mercury (inHg)",
      toBase: (inhg: number) => inhg * 3386.39,
      fromBase: (pa: number) => pa / 3386.39
    },
    "hectopascals": {
      label: "Hectopascals (hPa)",
      toBase: (hpa: number) => hpa * 100,
      fromBase: (pa: number) => pa / 100
    }
  }
};

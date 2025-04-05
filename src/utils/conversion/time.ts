import { ConversionCategory } from './types';

export const timeCategory: ConversionCategory = {
  name: "Time",
  baseUnit: "seconds",
  icon: "clock",
  units: {
    "seconds": {
      label: "Seconds (s)",
      toBase: (s: number) => s,
      fromBase: (s: number) => s
    },
    "milliseconds": {
      label: "Milliseconds (ms)",
      toBase: (ms: number) => ms / 1000,
      fromBase: (s: number) => s * 1000
    },
    "microseconds": {
      label: "Microseconds (μs)",
      toBase: (us: number) => us / 1000000,
      fromBase: (s: number) => s * 1000000
    },
    "nanoseconds": {
      label: "Nanoseconds (ns)",
      toBase: (ns: number) => ns / 1000000000,
      fromBase: (s: number) => s * 1000000000
    },
    "minutes": {
      label: "Minutes (min)",
      toBase: (min: number) => min * 60,
      fromBase: (s: number) => s / 60
    },
    "hours": {
      label: "Hours (h)",
      toBase: (h: number) => h * 3600,
      fromBase: (s: number) => s / 3600
    },
    "days": {
      label: "Days (d)",
      toBase: (d: number) => d * 86400,
      fromBase: (s: number) => s / 86400
    },
    "weeks": {
      label: "Weeks (wk)",
      toBase: (w: number) => w * 604800,
      fromBase: (s: number) => s / 604800
    },
    "months": {
      label: "Months (m)",
      toBase: (m: number) => m * 2628000,
      fromBase: (s: number) => s / 2628000
    },
    "years": {
      label: "Years (y)",
      toBase: (y: number) => y * 31536000,
      fromBase: (s: number) => s / 31536000
    }
  }
};

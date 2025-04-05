import { ConversionCategory } from './types';

export const flowrateCategory: ConversionCategory = {
  name: "Flow Rate",
  baseUnit: "cubic_meters_per_second",
  icon: "droplets",
  units: {
    "cubic_meters_per_second": {
      label: "Cubic meters per second (m³/s)",
      toBase: (m3s: number) => m3s,
      fromBase: (m3s: number) => m3s
    },
    "cubic_meters_per_hour": {
      label: "Cubic meters per hour (m³/h)",
      toBase: (m3h: number) => m3h / 3600,
      fromBase: (m3s: number) => m3s * 3600
    },
    "liters_per_second": {
      label: "Liters per second (L/s)",
      toBase: (lps: number) => lps * 0.001,
      fromBase: (m3s: number) => m3s / 0.001
    },
    "liters_per_minute": {
      label: "Liters per minute (L/min)",
      toBase: (lpm: number) => lpm * 0.001 / 60,
      fromBase: (m3s: number) => m3s / 0.001 * 60
    },
    "liters_per_hour": {
      label: "Liters per hour (L/h)",
      toBase: (lph: number) => lph * 0.001 / 3600,
      fromBase: (m3s: number) => m3s / 0.001 * 3600
    },
    "gallons_per_second": {
      label: "Gallons per second (gal/s)",
      toBase: (gps: number) => gps * 0.00378541,
      fromBase: (m3s: number) => m3s / 0.00378541
    },
    "gallons_per_minute": {
      label: "Gallons per minute (gal/min)",
      toBase: (gpm: number) => gpm * 0.00378541 / 60,
      fromBase: (m3s: number) => m3s / 0.00378541 * 60
    },
    "gallons_per_hour": {
      label: "Gallons per hour (gal/h)",
      toBase: (gph: number) => gph * 0.00378541 / 3600,
      fromBase: (m3s: number) => m3s / 0.00378541 * 3600
    },
    "cubic_feet_per_second": {
      label: "Cubic feet per second (ft³/s)",
      toBase: (cfs: number) => cfs * 0.0283168,
      fromBase: (m3s: number) => m3s / 0.0283168
    },
    "cubic_feet_per_minute": {
      label: "Cubic feet per minute (ft³/min)",
      toBase: (cfm: number) => cfm * 0.0283168 / 60,
      fromBase: (m3s: number) => m3s / 0.0283168 * 60
    }
  }
}; 
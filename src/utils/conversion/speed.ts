
import { ConversionCategory } from './types';

export const speedCategory: ConversionCategory = {
  name: "Speed",
  baseUnit: "meters per second",
  icon: "gauge",
  units: {
    "meters_per_second": {
      label: "Meters per Second (m/s)",
      toBase: (mps: number) => mps,
      fromBase: (mps: number) => mps
    },
    "kilometers_per_hour": {
      label: "Kilometers per Hour (km/h)",
      toBase: (kmh: number) => kmh / 3.6,
      fromBase: (mps: number) => mps * 3.6
    },
    "miles_per_hour": {
      label: "Miles per Hour (mph)",
      toBase: (mph: number) => mph * 0.44704,
      fromBase: (mps: number) => mps / 0.44704
    },
    "feet_per_second": {
      label: "Feet per Second (ft/s)",
      toBase: (fps: number) => fps * 0.3048,
      fromBase: (mps: number) => mps / 0.3048
    },
    "knots": {
      label: "Knots (kn)",
      toBase: (knots: number) => knots * 0.514444,
      fromBase: (mps: number) => mps / 0.514444
    },
    "mach": {
      label: "Mach (at sea level)",
      toBase: (mach: number) => mach * 343,
      fromBase: (mps: number) => mps / 343
    },
    "speed_of_light": {
      label: "Speed of Light (c)",
      toBase: (c: number) => c * 299792458,
      fromBase: (mps: number) => mps / 299792458
    },
    "centimeters_per_second": {
      label: "Centimeters per Second (cm/s)",
      toBase: (cmps: number) => cmps / 100,
      fromBase: (mps: number) => mps * 100
    },
    "kilometers_per_second": {
      label: "Kilometers per Second (km/s)",
      toBase: (kmps: number) => kmps * 1000,
      fromBase: (mps: number) => mps / 1000
    },
    "miles_per_second": {
      label: "Miles per Second (mi/s)",
      toBase: (mips: number) => mips * 1609.344,
      fromBase: (mps: number) => mps / 1609.344
    }
  }
};

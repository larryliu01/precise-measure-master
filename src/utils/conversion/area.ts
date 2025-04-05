
import { ConversionCategory } from './types';

export const areaCategory: ConversionCategory = {
  name: "Area",
  baseUnit: "square meters",
  icon: "square",
  units: {
    "square_meters": {
      label: "Square Meters (m²)",
      toBase: (m2: number) => m2,
      fromBase: (m2: number) => m2
    },
    "square_kilometers": {
      label: "Square Kilometers (km²)",
      toBase: (km2: number) => km2 * 1000000,
      fromBase: (m2: number) => m2 / 1000000
    },
    "square_centimeters": {
      label: "Square Centimeters (cm²)",
      toBase: (cm2: number) => cm2 / 10000,
      fromBase: (m2: number) => m2 * 10000
    },
    "square_millimeters": {
      label: "Square Millimeters (mm²)",
      toBase: (mm2: number) => mm2 / 1000000,
      fromBase: (m2: number) => m2 * 1000000
    },
    "square_miles": {
      label: "Square Miles (mi²)",
      toBase: (mi2: number) => mi2 * 2590000,
      fromBase: (m2: number) => m2 / 2590000
    },
    "square_yards": {
      label: "Square Yards (yd²)",
      toBase: (yd2: number) => yd2 * 0.836127,
      fromBase: (m2: number) => m2 / 0.836127
    },
    "square_feet": {
      label: "Square Feet (ft²)",
      toBase: (ft2: number) => ft2 * 0.092903,
      fromBase: (m2: number) => m2 / 0.092903
    },
    "square_inches": {
      label: "Square Inches (in²)",
      toBase: (in2: number) => in2 * 0.00064516,
      fromBase: (m2: number) => m2 / 0.00064516
    },
    "acres": {
      label: "Acres",
      toBase: (acre: number) => acre * 4046.86,
      fromBase: (m2: number) => m2 / 4046.86
    },
    "hectares": {
      label: "Hectares (ha)",
      toBase: (ha: number) => ha * 10000,
      fromBase: (m2: number) => m2 / 10000
    }
  }
};

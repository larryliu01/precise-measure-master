
import { ConversionCategory } from './types';

export const weightCategory: ConversionCategory = {
  name: "Weight",
  baseUnit: "kilograms",
  icon: "weight",
  units: {
    "kilograms": {
      label: "Kilograms (kg)",
      toBase: (kg: number) => kg,
      fromBase: (kg: number) => kg
    },
    "grams": {
      label: "Grams (g)",
      toBase: (g: number) => g / 1000,
      fromBase: (kg: number) => kg * 1000
    },
    "milligrams": {
      label: "Milligrams (mg)",
      toBase: (mg: number) => mg / 1000000,
      fromBase: (kg: number) => kg * 1000000
    },
    "metric_tons": {
      label: "Metric Tons (t)",
      toBase: (t: number) => t * 1000,
      fromBase: (kg: number) => kg / 1000
    },
    "pounds": {
      label: "Pounds (lb)",
      toBase: (lb: number) => lb * 0.453592,
      fromBase: (kg: number) => kg / 0.453592
    },
    "ounces": {
      label: "Ounces (oz)",
      toBase: (oz: number) => oz * 0.0283495,
      fromBase: (kg: number) => kg / 0.0283495
    },
    "carats": {
      label: "Carats",
      toBase: (ct: number) => ct * 0.0002,
      fromBase: (kg: number) => kg / 0.0002
    },
    "stone": {
      label: "Stone (st)",
      toBase: (st: number) => st * 6.35029,
      fromBase: (kg: number) => kg / 6.35029
    },
    "short_tons_us": {
      label: "US Tons",
      toBase: (usTon: number) => usTon * 907.185,
      fromBase: (kg: number) => kg / 907.185
    },
    "long_tons_uk": {
      label: "UK Tons",
      toBase: (ukTon: number) => ukTon * 1016.05,
      fromBase: (kg: number) => kg / 1016.05
    }
  }
};

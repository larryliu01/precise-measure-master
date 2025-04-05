import { ConversionCategory } from './types';

export const volumeCategory: ConversionCategory = {
  name: "Volume",
  baseUnit: "liters",
  icon: "cylinder",
  units: {
    "liters": {
      label: "Liters (L)",
      toBase: (l: number) => l,
      fromBase: (l: number) => l
    },
    "milliliters": {
      label: "Milliliters (mL)",
      toBase: (ml: number) => ml / 1000,
      fromBase: (l: number) => l * 1000
    },
    "cubic_meters": {
      label: "Cubic Meters (m³)",
      toBase: (m3: number) => m3 * 1000,
      fromBase: (l: number) => l / 1000
    },
    "cubic_decimeters": {
      label: "Cubic Decimeters (dm³)",
      toBase: (dm3: number) => dm3, // 1 dm³ = 1 liter
      fromBase: (l: number) => l
    },
    "cubic_centimeters": {
      label: "Cubic Centimeters (cm³)",
      toBase: (cm3: number) => cm3 / 1000,
      fromBase: (l: number) => l * 1000
    },
    "cubic_feet": {
      label: "Cubic Feet (ft³)",
      toBase: (ft3: number) => ft3 * 28.3168,
      fromBase: (l: number) => l / 28.3168
    },
    "cubic_inches": {
      label: "Cubic Inches (in³)",
      toBase: (in3: number) => in3 * 0.0163871,
      fromBase: (l: number) => l / 0.0163871
    },
    "gallons_us": {
      label: "US Gallons (gal)",
      toBase: (gal: number) => gal * 3.78541,
      fromBase: (l: number) => l / 3.78541
    },
    "gallons_uk": {
      label: "UK Gallons",
      toBase: (galUK: number) => galUK * 4.54609,
      fromBase: (l: number) => l / 4.54609
    },
    "quarts_us": {
      label: "US Quarts (qt)",
      toBase: (qt: number) => qt * 0.946353,
      fromBase: (l: number) => l / 0.946353
    },
    "pints_us": {
      label: "US Pints (pt)",
      toBase: (pt: number) => pt * 0.473176,
      fromBase: (l: number) => l / 0.473176
    },
    "fluid_ounces_us": {
      label: "US Fluid Ounces (fl oz)",
      toBase: (flOz: number) => flOz * 0.0295735,
      fromBase: (l: number) => l / 0.0295735
    },
    "tablespoons_us": {
      label: "Tablespoons (tbsp)",
      toBase: (tbsp: number) => tbsp * 0.0147868,
      fromBase: (l: number) => l / 0.0147868
    },
    "teaspoons_us": {
      label: "Teaspoons (tsp)",
      toBase: (tsp: number) => tsp * 0.00492892,
      fromBase: (l: number) => l / 0.00492892
    },
    "cups": {
      label: "Cups",
      toBase: (cup: number) => cup * 0.24,
      fromBase: (l: number) => l / 0.24
    }
  }
};

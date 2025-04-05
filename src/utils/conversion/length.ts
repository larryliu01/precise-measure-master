import { ConversionCategory } from './types';

export const lengthCategory: ConversionCategory = {
  name: "Length",
  baseUnit: "meters",
  icon: "ruler",
  units: {
    meters: {
      label: "Meters (m)",
      toBase: (m: number) => m,
      fromBase: (m: number) => m
    },
    kilometers: {
      label: "Kilometers (km)",
      toBase: (km: number) => km * 1000,
      fromBase: (m: number) => m / 1000
    },
    centimeters: {
      label: "Centimeters (cm)",
      toBase: (cm: number) => cm / 100,
      fromBase: (m: number) => m * 100
    },
    millimeters: {
      label: "Millimeters (mm)",
      toBase: (mm: number) => mm / 1000,
      fromBase: (m: number) => m * 1000
    },
    micrometers: {
      label: "Micrometers (μm)",
      toBase: (um: number) => um / 1000000,
      fromBase: (m: number) => m * 1000000
    },
    nanometers: {
      label: "Nanometers (nm)",
      toBase: (nm: number) => nm / 1000000000,
      fromBase: (m: number) => m * 1000000000
    },
    miles: {
      label: "Miles (mi)",
      toBase: (mi: number) => mi * 1609.344,
      fromBase: (m: number) => m / 1609.344
    },
    yards: {
      label: "Yards (yd)",
      toBase: (yd: number) => yd * 0.9144,
      fromBase: (m: number) => m / 0.9144
    },
    feet: {
      label: "Feet (ft)",
      toBase: (ft: number) => ft * 0.3048,
      fromBase: (m: number) => m / 0.3048
    },
    inches: {
      label: "Inches (in)",
      toBase: (inch: number) => inch * 0.0254,
      fromBase: (m: number) => m / 0.0254
    }
  }
};

// Helper function to parse feet and inches format (e.g. "5ft 3in" or "5'3\"")
export const parseFeetInches = (input: string): number => {
  // Normalize input (remove all spaces, convert to lowercase)
  input = input.replace(/\s+/g, '').toLowerCase();
  
  // First try to match patterns like 5ft3in, 5'3", etc.
  const feetInchesRegex = /(\d+(?:\.\d+)?)(?:ft|'|feet)(\d+(?:\.\d+)?)(?:in|"|inches)?/i;
  // Then try feet only like 5ft, 5', 5feet
  const feetOnlyRegex = /(\d+(?:\.\d+)?)(?:ft|'|feet)/i;
  // Then try inches only like 3in, 3", 3inches
  const inchesOnlyRegex = /(\d+(?:\.\d+)?)(?:in|"|inches)/i;
  // Decimal feet - like 5.5ft
  const decimalFeetRegex = /(\d+\.\d+)(?:ft|'|feet)/i;
  
  let feet = 0;
  let inches = 0;
  
  const feetInchesMatch = input.match(feetInchesRegex);
  const feetOnlyMatch = input.match(feetOnlyRegex);
  const inchesOnlyMatch = input.match(inchesOnlyRegex);
  const decimalFeetMatch = input.match(decimalFeetRegex);
  
  if (feetInchesMatch) {
    feet = parseFloat(feetInchesMatch[1]);
    inches = parseFloat(feetInchesMatch[2]);
  } else if (decimalFeetMatch) {
    // This handles cases like "5.5ft"
    return parseFloat(decimalFeetMatch[1]);
  } else if (feetOnlyMatch) {
    feet = parseFloat(feetOnlyMatch[1]);
  } else if (inchesOnlyMatch) {
    inches = parseFloat(inchesOnlyMatch[1]);
  } else {
    // Try to parse as just a number (assume feet)
    const numericMatch = input.match(/^(\d+(?:\.\d+)?)$/);
    if (numericMatch) {
      feet = parseFloat(numericMatch[1]);
    }
  }
  
  // Convert to decimal feet
  return feet + (inches / 12);
};

// Helper function to format a value to feet and inches
export const formatFeetInches = (feetDecimal: number): string => {
  const feet = Math.floor(feetDecimal);
  const inches = Math.round((feetDecimal - feet) * 12);
  
  // Handle case where inches rounds to 12
  if (inches === 12) {
    return `${feet + 1}ft 0in`;
  }
  
  return `${feet}ft ${inches}in`;
};

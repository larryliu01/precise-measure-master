
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
  // Remove all spaces
  input = input.replace(/\s+/g, '');
  
  // Match patterns like 5ft3in, 5'3", etc.
  const feetInchesRegex = /(\d+)(?:ft|'|feet)(\d+)(?:in|"|inches)?/i;
  const feetOnlyRegex = /(\d+)(?:ft|'|feet)$/i;
  const inchesOnlyRegex = /(\d+)(?:in|"|inches)$/i;
  
  let feet = 0;
  let inches = 0;
  
  const feetInchesMatch = input.match(feetInchesRegex);
  const feetOnlyMatch = input.match(feetOnlyRegex);
  const inchesOnlyMatch = input.match(inchesOnlyRegex);
  
  if (feetInchesMatch) {
    feet = parseInt(feetInchesMatch[1], 10);
    inches = parseInt(feetInchesMatch[2], 10);
  } else if (feetOnlyMatch) {
    feet = parseInt(feetOnlyMatch[1], 10);
  } else if (inchesOnlyMatch) {
    inches = parseInt(inchesOnlyMatch[1], 10);
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

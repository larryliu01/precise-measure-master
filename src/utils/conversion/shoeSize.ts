import { ConversionCategory } from './types';

export const shoeSizeCategory: ConversionCategory = {
  name: "Shoe Size",
  baseUnit: "us_mens",
  icon: "footprints",
  units: {
    "us_mens": {
      label: "US Men's",
      toBase: (size: number) => size,
      fromBase: (size: number) => size
    },
    "us_womens": {
      label: "US Women's",
      toBase: (size: number) => size - 1.5,
      fromBase: (size: number) => size + 1.5
    },
    "uk": {
      label: "UK",
      toBase: (size: number) => size + 0.5,
      fromBase: (size: number) => size - 0.5
    },
    "eu": {
      label: "EU",
      toBase: (size: number) => (size - 31.5) / 1.5,
      fromBase: (size: number) => (size * 1.5) + 31.5
    },
    "cm": {
      label: "Centimeters",
      toBase: (size: number) => (size - 22) / 0.5 + 6,
      fromBase: (size: number) => ((size - 6) * 0.5) + 22
    },
    "inches": {
      label: "Inches",
      toBase: (size: number) => (size - 8.5) / 0.25 + 6,
      fromBase: (size: number) => ((size - 6) * 0.25) + 8.5
    },
    "mondopoint": {
      label: "Mondopoint (mm)",
      toBase: (size: number) => (size - 220) / 5 + 6,
      fromBase: (size: number) => ((size - 6) * 5) + 220
    },
    "brannock": {
      label: "Brannock Device",
      toBase: (size: number) => size,
      fromBase: (size: number) => size
    },
    "japan": {
      label: "Japan (cm)",
      toBase: (size: number) => (size - 22) / 0.5 + 6,
      fromBase: (size: number) => ((size - 6) * 0.5) + 22
    },
    "korea": {
      label: "Korea (mm)",
      toBase: (size: number) => (size - 220) / 5 + 6,
      fromBase: (size: number) => ((size - 6) * 5) + 220
    }
  }
}; 
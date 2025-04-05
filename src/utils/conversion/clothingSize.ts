import { ConversionCategory } from './types';

export const clothingSizeCategory: ConversionCategory = {
  name: "Clothing Size",
  baseUnit: "us_mens",
  icon: "shirt",
  units: {
    "us_mens": {
      label: "US Men's",
      toBase: (size: number) => size,
      fromBase: (size: number) => size
    },
    "us_womens": {
      label: "US Women's",
      toBase: (size: number) => size - 21,
      fromBase: (size: number) => size + 21
    },
    "uk_mens": {
      label: "UK Men's",
      toBase: (size: number) => size - 0.5,
      fromBase: (size: number) => size + 0.5
    },
    "uk_womens": {
      label: "UK Women's",
      toBase: (size: number) => size - 23,
      fromBase: (size: number) => size + 23
    },
    "eu": {
      label: "EU",
      toBase: (size: number) => (size - 31) / 2,
      fromBase: (size: number) => (size * 2) + 31
    },
    "japan": {
      label: "Japan (cm)",
      toBase: (size: number) => size - 18,
      fromBase: (size: number) => size + 18
    },
    "xs_to_xxl": {
      label: "XS to XXL",
      toBase: (size: number) => {
        // Convert size code to actual size
        // XS=0, S=1, M=2, L=3, XL=4, XXL=5
        const sizeMap: Record<number, number> = {
          0: 6,   // XS ≈ US 6
          1: 8,   // S ≈ US 8
          2: 10,  // M ≈ US 10
          3: 12,  // L ≈ US 12
          4: 14,  // XL ≈ US 14
          5: 16   // XXL ≈ US 16
        };
        return sizeMap[size] || size;
      },
      fromBase: (size: number) => {
        if (size <= 7) return 0;      // XS
        else if (size <= 9) return 1;  // S
        else if (size <= 11) return 2; // M
        else if (size <= 13) return 3; // L
        else if (size <= 15) return 4; // XL
        else return 5;                // XXL
      }
    },
    "waist_inches": {
      label: "Waist (inches)",
      toBase: (waist: number) => {
        if (waist >= 28 && waist <= 40) {
          return (waist - 28) / 2 + 8; // Convert waist size to US size
        }
        return waist;
      },
      fromBase: (size: number) => {
        if (size >= 8 && size <= 14) {
          return (size - 8) * 2 + 28; // Convert US size to waist size
        }
        return size;
      }
    },
    "chest_inches": {
      label: "Chest (inches)",
      toBase: (chest: number) => {
        if (chest >= 34 && chest <= 46) {
          return (chest - 34) / 2 + 8; // Convert chest size to US size
        }
        return chest;
      },
      fromBase: (size: number) => {
        if (size >= 8 && size <= 14) {
          return (size - 8) * 2 + 34; // Convert US size to chest size
        }
        return size;
      }
    }
  }
}; 
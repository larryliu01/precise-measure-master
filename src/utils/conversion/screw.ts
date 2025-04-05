import { ConversionCategory } from './types';

export const screwCategory: ConversionCategory = {
  name: "Screw Size",
  baseUnit: "mm",
  icon: "wrench",
  units: {
    "mm": {
      label: "Millimeters (mm)",
      toBase: (mm: number) => mm,
      fromBase: (mm: number) => mm
    },
    "imperial": {
      label: "Imperial (#)",
      // Conversion based on standard screw size chart
      toBase: (imperial: number) => {
        const sizeMap: Record<number, number> = {
          0: 1.6,   // #0 = 1.6mm
          1: 1.8,   // #1 = 1.8mm
          2: 2.2,   // #2 = 2.2mm
          3: 2.5,   // #3 = 2.5mm
          4: 2.9,   // #4 = 2.9mm
          5: 3.2,   // #5 = 3.2mm
          6: 3.5,   // #6 = 3.5mm
          8: 4.2,   // #8 = 4.2mm
          10: 4.8,  // #10 = 4.8mm
          12: 5.5,  // #12 = 5.5mm
          14: 6.3,  // #14 = 6.3mm
        };
        return sizeMap[imperial] || imperial;
      },
      fromBase: (mm: number) => {
        const closestSizes = [
          { imperial: 0, mm: 1.6 },
          { imperial: 1, mm: 1.8 },
          { imperial: 2, mm: 2.2 },
          { imperial: 3, mm: 2.5 },
          { imperial: 4, mm: 2.9 },
          { imperial: 5, mm: 3.2 },
          { imperial: 6, mm: 3.5 },
          { imperial: 8, mm: 4.2 },
          { imperial: 10, mm: 4.8 },
          { imperial: 12, mm: 5.5 },
          { imperial: 14, mm: 6.3 }
        ];
        
        let closest = closestSizes[0];
        let minDiff = Math.abs(mm - closest.mm);
        
        for (let i = 1; i < closestSizes.length; i++) {
          const diff = Math.abs(mm - closestSizes[i].mm);
          if (diff < minDiff) {
            minDiff = diff;
            closest = closestSizes[i];
          }
        }
        
        return closest.imperial;
      }
    },
    "machine_screw": {
      label: "Machine Screw (M)",
      toBase: (m: number) => m,
      fromBase: (mm: number) => mm
    },
    "fraction_inch": {
      label: "Fraction Inch",
      toBase: (frac: number) => frac * 25.4,
      fromBase: (mm: number) => mm / 25.4
    },
    "gauge": {
      label: "Gauge",
      // Approximate conversion based on standard gauge chart
      toBase: (gauge: number) => {
        const sizeMap: Record<number, number> = {
          20: 0.81,
          18: 1.02,
          16: 1.29,
          14: 1.63,
          12: 2.05,
          10: 2.59,
          8: 3.26,
          6: 4.11,
          4: 5.19,
          2: 6.54,
          1: 7.35,
          0: 8.23
        };
        return sizeMap[gauge] || gauge;
      },
      fromBase: (mm: number) => {
        const gauges = [
          { gauge: 20, mm: 0.81 },
          { gauge: 18, mm: 1.02 },
          { gauge: 16, mm: 1.29 },
          { gauge: 14, mm: 1.63 },
          { gauge: 12, mm: 2.05 },
          { gauge: 10, mm: 2.59 },
          { gauge: 8, mm: 3.26 },
          { gauge: 6, mm: 4.11 },
          { gauge: 4, mm: 5.19 },
          { gauge: 2, mm: 6.54 },
          { gauge: 1, mm: 7.35 },
          { gauge: 0, mm: 8.23 }
        ];
        
        let closest = gauges[0];
        let minDiff = Math.abs(mm - closest.mm);
        
        for (let i = 1; i < gauges.length; i++) {
          const diff = Math.abs(mm - gauges[i].mm);
          if (diff < minDiff) {
            minDiff = diff;
            closest = gauges[i];
          }
        }
        
        return closest.gauge;
      }
    }
  }
}; 
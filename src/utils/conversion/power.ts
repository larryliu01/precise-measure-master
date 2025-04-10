import { ConversionCategory } from './types';

export const powerCategory: ConversionCategory = {
  name: "Power",
  baseUnit: "watts",
  icon: "power",
  units: {
    "watts": {
      label: "Watts (W)",
      toBase: (w: number) => w,
      fromBase: (w: number) => w
    },
    "milliwatts": {
      label: "Milliwatts (mW)",
      toBase: (mw: number) => mw / 1000,
      fromBase: (w: number) => w * 1000
    },
    "kilowatts": {
      label: "Kilowatts (kW)",
      toBase: (kw: number) => kw * 1000,
      fromBase: (w: number) => w / 1000
    },
    "megawatts": {
      label: "Megawatts (MW)",
      toBase: (mw: number) => mw * 1000000,
      fromBase: (w: number) => w / 1000000
    },
    "horsepower_mechanical": {
      label: "Horsepower (hp)",
      toBase: (hp: number) => hp * 745.7,
      fromBase: (w: number) => w / 745.7
    },
    "foot_pounds_per_second": {
      label: "Foot-pounds/second",
      toBase: (ftlbs: number) => ftlbs * 1.35582,
      fromBase: (w: number) => w / 1.35582
    },
    "btu_per_hour": {
      label: "BTU/hour",
      toBase: (btuh: number) => btuh * 0.29307107,
      fromBase: (w: number) => w / 0.29307107
    },
    "calories_per_second": {
      label: "Calories/second",
      toBase: (calps: number) => calps * 4.184,
      fromBase: (w: number) => w / 4.184
    },
    "joules_per_second": {
      label: "Joules/second",
      toBase: (jps: number) => jps,
      fromBase: (w: number) => w
    },
    "gigawatts": {
      label: "Gigawatts (GW)",
      toBase: (gw: number) => gw * 1000000000,
      fromBase: (w: number) => w / 1000000000
    },
    "tons_refrigeration": {
      label: "Tons of Refrigeration",
      toBase: (tr: number) => tr * 3516.8528420667,
      fromBase: (w: number) => w / 3516.8528420667
    },
    "dbm": {
      label: "Decibel-milliwatts (dBm)",
      // Convert dBm to watts: P(W) = 10^((dBm - 30)/10)
      toBase: (dbm: number) => Math.pow(10, (dbm - 30) / 10),
      // Convert watts to dBm: P(dBm) = 10 * log10(P(W)) + 30
      // Handle values <= 0 gracefully (theoretical minimum for real-world applications)
      fromBase: (w: number) => w <= 0 ? -174 : 10 * Math.log10(w) + 30
    }
  }
};


import { ConversionCategory } from './types';

export const energyCategory: ConversionCategory = {
  name: "Energy",
  baseUnit: "joules",
  icon: "zap",
  units: {
    "joules": {
      label: "Joules (J)",
      toBase: (j: number) => j,
      fromBase: (j: number) => j
    },
    "kilojoules": {
      label: "Kilojoules (kJ)",
      toBase: (kj: number) => kj * 1000,
      fromBase: (j: number) => j / 1000
    },
    "calories": {
      label: "Calories (cal)",
      toBase: (cal: number) => cal * 4.184,
      fromBase: (j: number) => j / 4.184
    },
    "kilocalories": {
      label: "Kilocalories (kcal)",
      toBase: (kcal: number) => kcal * 4184,
      fromBase: (j: number) => j / 4184
    },
    "watt_hours": {
      label: "Watt-hours (Wh)",
      toBase: (wh: number) => wh * 3600,
      fromBase: (j: number) => j / 3600
    },
    "kilowatt_hours": {
      label: "Kilowatt-hours (kWh)",
      toBase: (kwh: number) => kwh * 3600000,
      fromBase: (j: number) => j / 3600000
    },
    "electron_volts": {
      label: "Electron Volts (eV)",
      toBase: (ev: number) => ev * 1.602176634e-19,
      fromBase: (j: number) => j / 1.602176634e-19
    },
    "british_thermal_units": {
      label: "British Thermal Units (BTU)",
      toBase: (btu: number) => btu * 1055.06,
      fromBase: (j: number) => j / 1055.06
    },
    "foot_pounds": {
      label: "Foot-pounds (ft⋅lb)",
      toBase: (ftlb: number) => ftlb * 1.35582,
      fromBase: (j: number) => j / 1.35582
    },
    "megajoules": {
      label: "Megajoules (MJ)",
      toBase: (mj: number) => mj * 1000000,
      fromBase: (j: number) => j / 1000000
    }
  }
};

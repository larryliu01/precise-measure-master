import { ConversionCategory } from './types';

export const angleCategory: ConversionCategory = {
  name: "Angle",
  baseUnit: "degrees",
  icon: "compass",
  units: {
    "degrees": {
      label: "Degrees (°)",
      toBase: (deg: number) => deg,
      fromBase: (deg: number) => deg
    },
    "radians": {
      label: "Radians (rad)",
      toBase: (rad: number) => rad * (180 / Math.PI),
      fromBase: (deg: number) => deg * (Math.PI / 180)
    },
    "gradians": {
      label: "Gradians (grad)",
      toBase: (grad: number) => grad * 0.9,
      fromBase: (deg: number) => deg / 0.9
    },
    "arcminutes": {
      label: "Arc Minutes (')",
      toBase: (arcmin: number) => arcmin / 60,
      fromBase: (deg: number) => deg * 60
    },
    "arcseconds": {
      label: "Arc Seconds (\")",
      toBase: (arcsec: number) => arcsec / 3600,
      fromBase: (deg: number) => deg * 3600
    },
    "turns": {
      label: "Turns",
      toBase: (turns: number) => turns * 360,
      fromBase: (deg: number) => deg / 360
    }
  }
}; 
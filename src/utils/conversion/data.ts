
import { ConversionCategory } from './types';

export const dataCategory: ConversionCategory = {
  name: "Data",
  baseUnit: "bytes",
  icon: "database",
  units: {
    "bits": {
      label: "Bits (b)",
      toBase: (b: number) => b / 8,
      fromBase: (B: number) => B * 8
    },
    "bytes": {
      label: "Bytes (B)",
      toBase: (B: number) => B,
      fromBase: (B: number) => B
    },
    "kilobytes": {
      label: "Kilobytes (KB)",
      toBase: (kb: number) => kb * 1000,
      fromBase: (B: number) => B / 1000
    },
    "megabytes": {
      label: "Megabytes (MB)",
      toBase: (mb: number) => mb * 1000000,
      fromBase: (B: number) => B / 1000000
    },
    "gigabytes": {
      label: "Gigabytes (GB)",
      toBase: (gb: number) => gb * 1000000000,
      fromBase: (B: number) => B / 1000000000
    },
    "terabytes": {
      label: "Terabytes (TB)",
      toBase: (tb: number) => tb * 1000000000000,
      fromBase: (B: number) => B / 1000000000000
    },
    "kibibytes": {
      label: "Kibibytes (KiB)",
      toBase: (kib: number) => kib * 1024,
      fromBase: (B: number) => B / 1024
    },
    "mebibytes": {
      label: "Mebibytes (MiB)",
      toBase: (mib: number) => mib * 1048576,
      fromBase: (B: number) => B / 1048576
    },
    "gibibytes": {
      label: "Gibibytes (GiB)",
      toBase: (gib: number) => gib * 1073741824,
      fromBase: (B: number) => B / 1073741824
    },
    "tebibytes": {
      label: "Tebibytes (TiB)",
      toBase: (tib: number) => tib * 1099511627776,
      fromBase: (B: number) => B / 1099511627776
    }
  }
};

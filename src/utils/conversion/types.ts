export interface ConversionUnit {
  label: string;
  toBase: (value: number | string) => number;
  fromBase: (value: number, inputString?: string) => number | string;
}

export interface ConversionCategory {
  name: string;
  baseUnit: string;
  icon: string;
  units: Record<string, ConversionUnit>;
}

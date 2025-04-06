
export interface ConversionUnit {
  label: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface ConversionCategory {
  name: string;
  baseUnit: string;
  icon: string;
  units: Record<string, ConversionUnit>;
}

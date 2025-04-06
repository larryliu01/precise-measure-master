export interface ConversionUnit {
  label: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface CoordinatePair {
  lat: number;
  lng: number;
}

export interface GPSConversionUnit {
  label: string;
  toBase: (value: string | number) => CoordinatePair;
  fromBase: (value: CoordinatePair) => string;
}

export type AnyConversionUnit = ConversionUnit | GPSConversionUnit;

export interface ConversionCategory {
  name: string;
  baseUnit: string;
  icon: string;
  units: Record<string, AnyConversionUnit>;
}

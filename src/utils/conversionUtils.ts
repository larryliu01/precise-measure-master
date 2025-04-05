// Conversion factors for different measurement types
// All conversions are based on the base unit for each category

interface ConversionCategory {
  name: string;
  baseUnit: string;
  icon: string;
  units: Record<string, {
    label: string;
    toBase: (value: number) => number;
    fromBase: (value: number) => number;
  }>;
}

export const conversionCategories: Record<string, ConversionCategory> = {
  length: {
    name: "Length",
    baseUnit: "meters",
    icon: "ruler",
    units: {
      meters: {
        label: "Meters (m)",
        toBase: (m: number) => m,
        fromBase: (m: number) => m
      },
      kilometers: {
        label: "Kilometers (km)",
        toBase: (km: number) => km * 1000,
        fromBase: (m: number) => m / 1000
      },
      centimeters: {
        label: "Centimeters (cm)",
        toBase: (cm: number) => cm / 100,
        fromBase: (m: number) => m * 100
      },
      millimeters: {
        label: "Millimeters (mm)",
        toBase: (mm: number) => mm / 1000,
        fromBase: (m: number) => m * 1000
      },
      micrometers: {
        label: "Micrometers (μm)",
        toBase: (um: number) => um / 1000000,
        fromBase: (m: number) => m * 1000000
      },
      nanometers: {
        label: "Nanometers (nm)",
        toBase: (nm: number) => nm / 1000000000,
        fromBase: (m: number) => m * 1000000000
      },
      miles: {
        label: "Miles (mi)",
        toBase: (mi: number) => mi * 1609.344,
        fromBase: (m: number) => m / 1609.344
      },
      yards: {
        label: "Yards (yd)",
        toBase: (yd: number) => yd * 0.9144,
        fromBase: (m: number) => m / 0.9144
      },
      feet: {
        label: "Feet (ft)",
        toBase: (ft: number) => ft * 0.3048,
        fromBase: (m: number) => m / 0.3048
      },
      inches: {
        label: "Inches (in)",
        toBase: (inch: number) => inch * 0.0254,
        fromBase: (m: number) => m / 0.0254
      }
    }
  },
  area: {
    name: "Area",
    baseUnit: "square meters",
    icon: "square",
    units: {
      "square_meters": {
        label: "Square Meters (m²)",
        toBase: (m2: number) => m2,
        fromBase: (m2: number) => m2
      },
      "square_kilometers": {
        label: "Square Kilometers (km²)",
        toBase: (km2: number) => km2 * 1000000,
        fromBase: (m2: number) => m2 / 1000000
      },
      "square_centimeters": {
        label: "Square Centimeters (cm²)",
        toBase: (cm2: number) => cm2 / 10000,
        fromBase: (m2: number) => m2 * 10000
      },
      "square_millimeters": {
        label: "Square Millimeters (mm²)",
        toBase: (mm2: number) => mm2 / 1000000,
        fromBase: (m2: number) => m2 * 1000000
      },
      "square_miles": {
        label: "Square Miles (mi²)",
        toBase: (mi2: number) => mi2 * 2590000,
        fromBase: (m2: number) => m2 / 2590000
      },
      "square_yards": {
        label: "Square Yards (yd²)",
        toBase: (yd2: number) => yd2 * 0.836127,
        fromBase: (m2: number) => m2 / 0.836127
      },
      "square_feet": {
        label: "Square Feet (ft²)",
        toBase: (ft2: number) => ft2 * 0.092903,
        fromBase: (m2: number) => m2 / 0.092903
      },
      "square_inches": {
        label: "Square Inches (in²)",
        toBase: (in2: number) => in2 * 0.00064516,
        fromBase: (m2: number) => m2 / 0.00064516
      },
      "acres": {
        label: "Acres",
        toBase: (acre: number) => acre * 4046.86,
        fromBase: (m2: number) => m2 / 4046.86
      },
      "hectares": {
        label: "Hectares (ha)",
        toBase: (ha: number) => ha * 10000,
        fromBase: (m2: number) => m2 / 10000
      }
    }
  },
  volume: {
    name: "Volume",
    baseUnit: "liters",
    icon: "cylinder",
    units: {
      "liters": {
        label: "Liters (L)",
        toBase: (l: number) => l,
        fromBase: (l: number) => l
      },
      "milliliters": {
        label: "Milliliters (mL)",
        toBase: (ml: number) => ml / 1000,
        fromBase: (l: number) => l * 1000
      },
      "cubic_meters": {
        label: "Cubic Meters (m³)",
        toBase: (m3: number) => m3 * 1000,
        fromBase: (l: number) => l / 1000
      },
      "cubic_centimeters": {
        label: "Cubic Centimeters (cm³)",
        toBase: (cm3: number) => cm3 / 1000,
        fromBase: (l: number) => l * 1000
      },
      "cubic_feet": {
        label: "Cubic Feet (ft³)",
        toBase: (ft3: number) => ft3 * 28.3168,
        fromBase: (l: number) => l / 28.3168
      },
      "cubic_inches": {
        label: "Cubic Inches (in³)",
        toBase: (in3: number) => in3 * 0.0163871,
        fromBase: (l: number) => l / 0.0163871
      },
      "gallons_us": {
        label: "US Gallons (gal)",
        toBase: (gal: number) => gal * 3.78541,
        fromBase: (l: number) => l / 3.78541
      },
      "gallons_uk": {
        label: "UK Gallons",
        toBase: (galUK: number) => galUK * 4.54609,
        fromBase: (l: number) => l / 4.54609
      },
      "fluid_ounces_us": {
        label: "US Fluid Ounces (fl oz)",
        toBase: (flOz: number) => flOz * 0.0295735,
        fromBase: (l: number) => l / 0.0295735
      },
      "cups": {
        label: "Cups",
        toBase: (cup: number) => cup * 0.24,
        fromBase: (l: number) => l / 0.24
      }
    }
  },
  weight: {
    name: "Weight",
    baseUnit: "kilograms",
    icon: "weight",
    units: {
      "kilograms": {
        label: "Kilograms (kg)",
        toBase: (kg: number) => kg,
        fromBase: (kg: number) => kg
      },
      "grams": {
        label: "Grams (g)",
        toBase: (g: number) => g / 1000,
        fromBase: (kg: number) => kg * 1000
      },
      "milligrams": {
        label: "Milligrams (mg)",
        toBase: (mg: number) => mg / 1000000,
        fromBase: (kg: number) => kg * 1000000
      },
      "metric_tons": {
        label: "Metric Tons (t)",
        toBase: (t: number) => t * 1000,
        fromBase: (kg: number) => kg / 1000
      },
      "pounds": {
        label: "Pounds (lb)",
        toBase: (lb: number) => lb * 0.453592,
        fromBase: (kg: number) => kg / 0.453592
      },
      "ounces": {
        label: "Ounces (oz)",
        toBase: (oz: number) => oz * 0.0283495,
        fromBase: (kg: number) => kg / 0.0283495
      },
      "carats": {
        label: "Carats",
        toBase: (ct: number) => ct * 0.0002,
        fromBase: (kg: number) => kg / 0.0002
      },
      "stone": {
        label: "Stone (st)",
        toBase: (st: number) => st * 6.35029,
        fromBase: (kg: number) => kg / 6.35029
      },
      "short_tons_us": {
        label: "US Tons",
        toBase: (usTon: number) => usTon * 907.185,
        fromBase: (kg: number) => kg / 907.185
      },
      "long_tons_uk": {
        label: "UK Tons",
        toBase: (ukTon: number) => ukTon * 1016.05,
        fromBase: (kg: number) => kg / 1016.05
      }
    }
  },
  temperature: {
    name: "Temperature",
    baseUnit: "celsius",
    icon: "thermometer",
    units: {
      "celsius": {
        label: "Celsius (°C)",
        toBase: (c: number) => c,
        fromBase: (c: number) => c
      },
      "fahrenheit": {
        label: "Fahrenheit (°F)",
        toBase: (f: number) => (f - 32) * 5/9,
        fromBase: (c: number) => c * 9/5 + 32
      },
      "kelvin": {
        label: "Kelvin (K)",
        toBase: (k: number) => k - 273.15,
        fromBase: (c: number) => c + 273.15
      },
      "rankine": {
        label: "Rankine (°R)",
        toBase: (r: number) => (r - 491.67) * 5/9,
        fromBase: (c: number) => c * 9/5 + 491.67
      },
      "reaumur": {
        label: "Réaumur (°Ré)",
        toBase: (re: number) => re * 1.25,
        fromBase: (c: number) => c * 0.8
      },
      "newton": {
        label: "Newton (°N)",
        toBase: (n: number) => n * 100/33,
        fromBase: (c: number) => c * 33/100
      },
      "delisle": {
        label: "Delisle (°De)",
        toBase: (de: number) => 100 - de * 2/3,
        fromBase: (c: number) => (100 - c) * 3/2
      },
      "romer": {
        label: "Rømer (°Rø)",
        toBase: (ro: number) => (ro - 7.5) * 40/21,
        fromBase: (c: number) => c * 21/40 + 7.5
      },
      "planck": {
        label: "Planck Temperature (T_P)",
        toBase: (p: number) => p * 1.416784e+32 - 273.15,
        fromBase: (c: number) => (c + 273.15) / 1.416784e+32
      },
      "leduc": {
        label: "Leduc (°L)",
        toBase: (l: number) => l * 0.6 + 28.3,
        fromBase: (c: number) => (c - 28.3) / 0.6
      }
    }
  },
  time: {
    name: "Time",
    baseUnit: "seconds",
    icon: "clock",
    units: {
      "seconds": {
        label: "Seconds (s)",
        toBase: (s: number) => s,
        fromBase: (s: number) => s
      },
      "milliseconds": {
        label: "Milliseconds (ms)",
        toBase: (ms: number) => ms / 1000,
        fromBase: (s: number) => s * 1000
      },
      "microseconds": {
        label: "Microseconds (μs)",
        toBase: (us: number) => us / 1000000,
        fromBase: (s: number) => s * 1000000
      },
      "nanoseconds": {
        label: "Nanoseconds (ns)",
        toBase: (ns: number) => ns / 1000000000,
        fromBase: (s: number) => s * 1000000000
      },
      "minutes": {
        label: "Minutes (min)",
        toBase: (min: number) => min * 60,
        fromBase: (s: number) => s / 60
      },
      "hours": {
        label: "Hours (h)",
        toBase: (h: number) => h * 3600,
        fromBase: (s: number) => s / 3600
      },
      "days": {
        label: "Days (d)",
        toBase: (d: number) => d * 86400,
        fromBase: (s: number) => s / 86400
      },
      "weeks": {
        label: "Weeks (wk)",
        toBase: (w: number) => w * 604800,
        fromBase: (s: number) => s / 604800
      },
      "months": {
        label: "Months (approx.)",
        toBase: (m: number) => m * 2628000,
        fromBase: (s: number) => s / 2628000
      },
      "years": {
        label: "Years (approx.)",
        toBase: (y: number) => y * 31536000,
        fromBase: (s: number) => s / 31536000
      }
    }
  },
  speed: {
    name: "Speed",
    baseUnit: "meters per second",
    icon: "gauge",
    units: {
      "meters_per_second": {
        label: "Meters per Second (m/s)",
        toBase: (mps: number) => mps,
        fromBase: (mps: number) => mps
      },
      "kilometers_per_hour": {
        label: "Kilometers per Hour (km/h)",
        toBase: (kmh: number) => kmh / 3.6,
        fromBase: (mps: number) => mps * 3.6
      },
      "miles_per_hour": {
        label: "Miles per Hour (mph)",
        toBase: (mph: number) => mph * 0.44704,
        fromBase: (mps: number) => mps / 0.44704
      },
      "feet_per_second": {
        label: "Feet per Second (ft/s)",
        toBase: (fps: number) => fps * 0.3048,
        fromBase: (mps: number) => mps / 0.3048
      },
      "knots": {
        label: "Knots (kn)",
        toBase: (knots: number) => knots * 0.514444,
        fromBase: (mps: number) => mps / 0.514444
      },
      "mach": {
        label: "Mach (at sea level)",
        toBase: (mach: number) => mach * 343,
        fromBase: (mps: number) => mps / 343
      },
      "speed_of_light": {
        label: "Speed of Light (c)",
        toBase: (c: number) => c * 299792458,
        fromBase: (mps: number) => mps / 299792458
      },
      "centimeters_per_second": {
        label: "Centimeters per Second (cm/s)",
        toBase: (cmps: number) => cmps / 100,
        fromBase: (mps: number) => mps * 100
      },
      "kilometers_per_second": {
        label: "Kilometers per Second (km/s)",
        toBase: (kmps: number) => kmps * 1000,
        fromBase: (mps: number) => mps / 1000
      },
      "miles_per_second": {
        label: "Miles per Second (mi/s)",
        toBase: (mips: number) => mips * 1609.344,
        fromBase: (mps: number) => mps / 1609.344
      }
    }
  },
  pressure: {
    name: "Pressure",
    baseUnit: "pascals",
    icon: "gauge",
    units: {
      "pascals": {
        label: "Pascals (Pa)",
        toBase: (pa: number) => pa,
        fromBase: (pa: number) => pa
      },
      "kilopascals": {
        label: "Kilopascals (kPa)",
        toBase: (kpa: number) => kpa * 1000,
        fromBase: (pa: number) => pa / 1000
      },
      "megapascals": {
        label: "Megapascals (MPa)",
        toBase: (mpa: number) => mpa * 1000000,
        fromBase: (pa: number) => pa / 1000000
      },
      "bar": {
        label: "Bar",
        toBase: (bar: number) => bar * 100000,
        fromBase: (pa: number) => pa / 100000
      },
      "psi": {
        label: "PSI",
        toBase: (psi: number) => psi * 6894.76,
        fromBase: (pa: number) => pa / 6894.76
      },
      "atmospheres": {
        label: "Atmospheres (atm)",
        toBase: (atm: number) => atm * 101325,
        fromBase: (pa: number) => pa / 101325
      },
      "torr": {
        label: "Torr",
        toBase: (torr: number) => torr * 133.322,
        fromBase: (pa: number) => pa / 133.322
      },
      "millimeters_mercury": {
        label: "Millimeters of Mercury (mmHg)",
        toBase: (mmhg: number) => mmhg * 133.322,
        fromBase: (pa: number) => pa / 133.322
      },
      "inches_mercury": {
        label: "Inches of Mercury (inHg)",
        toBase: (inhg: number) => inhg * 3386.39,
        fromBase: (pa: number) => pa / 3386.39
      },
      "hectopascals": {
        label: "Hectopascals (hPa)",
        toBase: (hpa: number) => hpa * 100,
        fromBase: (pa: number) => pa / 100
      }
    }
  },
  energy: {
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
  },
  power: {
    name: "Power",
    baseUnit: "watts",
    icon: "power",
    units: {
      "watts": {
        label: "Watts (W)",
        toBase: (w: number) => w,
        fromBase: (w: number) => w
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
      }
    }
  },
  data: {
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
  }
};

// Helper function to parse feet and inches format (e.g. "5ft 3in" or "5'3\"")
export const parseFeetInches = (input: string): number => {
  // Remove all spaces
  input = input.replace(/\s+/g, '');
  
  // Match patterns like 5ft3in, 5'3", etc.
  const feetInchesRegex = /(\d+)(?:ft|'|feet)(\d+)(?:in|"|inches)?/i;
  const feetOnlyRegex = /(\d+)(?:ft|'|feet)$/i;
  const inchesOnlyRegex = /(\d+)(?:in|"|inches)$/i;
  
  let feet = 0;
  let inches = 0;
  
  const feetInchesMatch = input.match(feetInchesRegex);
  const feetOnlyMatch = input.match(feetOnlyRegex);
  const inchesOnlyMatch = input.match(inchesOnlyRegex);
  
  if (feetInchesMatch) {
    feet = parseInt(feetInchesMatch[1], 10);
    inches = parseInt(feetInchesMatch[2], 10);
  } else if (feetOnlyMatch) {
    feet = parseInt(feetOnlyMatch[1], 10);
  } else if (inchesOnlyMatch) {
    inches = parseInt(inchesOnlyMatch[1], 10);
  }
  
  // Convert to decimal feet
  return feet + (inches / 12);
};

// Helper function to format a value to feet and inches
export const formatFeetInches = (feetDecimal: number): string => {
  const feet = Math.floor(feetDecimal);
  const inches = Math.round((feetDecimal - feet) * 12);
  
  // Handle case where inches rounds to 12
  if (inches === 12) {
    return `${feet + 1}ft 0in`;
  }
  
  return `${feet}ft ${inches}in`;
};

// Helper function to convert values
export const convertValue = (
  value: number | string,
  fromUnit: string,
  toUnit: string, 
  category: string
): number | string => {
  // Check if the input is a valid category
  if (!conversionCategories[category]) {
    return "Invalid category";
  }
  
  const categoryData = conversionCategories[category];
  
  // Check if units are valid
  if (!categoryData.units[fromUnit] || !categoryData.units[toUnit]) {
    return "Invalid unit";
  }

  // Handle empty or non-numeric input
  if (value === "" || isNaN(Number(value))) {
    return "";
  }
  
  // Special case for feet/inches in length category
  if (category === "length" && typeof value === "string" && 
      (value.includes("ft") || value.includes("'") || 
       value.includes("feet") || value.includes("in") || 
       value.includes('"') || value.includes("inches"))) {
    
    // Parse the feet/inches format
    const feetDecimal = parseFeet

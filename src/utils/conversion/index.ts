import { ConversionCategory } from './types';
import { lengthCategory, parseFeetInches, formatFeetInches } from './length';
import { areaCategory } from './area';
import { volumeCategory } from './volume';
import { weightCategory } from './weight';
import { temperatureCategory } from './temperature';
import { timeCategory } from './time';
import { speedCategory } from './speed';
import { pressureCategory } from './pressure';
import { energyCategory } from './energy';
import { powerCategory } from './power';
import { dataCategory } from './data';
import { currencyCategory } from './currency';
import { convertValue } from './convert';
import { illuminanceCategory } from './illuminance';
import { screwCategory } from './screw';
import { siCategory } from './si';
import { angleCategory } from './angle';
import { flowrateCategory } from './flowrate';
import { gpsCoordinatesCategory } from './gpsCoordinates';

// Collect all categories
export const conversionCategories: Record<string, ConversionCategory> = {
  length: lengthCategory,
  area: areaCategory,
  volume: volumeCategory,
  weight: weightCategory,
  temperature: temperatureCategory,
  time: timeCategory,
  speed: speedCategory,
  pressure: pressureCategory,
  energy: energyCategory,
  power: powerCategory,
  data: dataCategory,
  illuminance: illuminanceCategory,
  screw: screwCategory,
  si: siCategory,
  angle: angleCategory,
  flowrate: flowrateCategory,
  gps_coordinates: gpsCoordinatesCategory
  // Currency removed from general unit conversion but kept as separate tab
};

// Re-export for convenience
export { 
  lengthCategory, 
  parseFeetInches, 
  formatFeetInches, 
  convertValue, 
  currencyCategory 
};

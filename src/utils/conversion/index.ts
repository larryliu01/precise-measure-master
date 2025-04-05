
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
import { convertValue } from './convert';

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
  data: dataCategory
};

// Export everything
export {
  parseFeetInches,
  formatFeetInches,
  convertValue
};

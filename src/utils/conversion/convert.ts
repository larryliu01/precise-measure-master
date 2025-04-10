import { conversionCategories, currencyCategory } from './index';
import { parseFeetInches, formatFeetInches } from './length';
import { CoordinatePair, GPSConversionUnit, ConversionUnit } from './types';

// Parse a compound time expression like "4h30min" or "2h15m"
const parseTimeExpression = (value: string): number => {
  // Normalize the string first (remove spaces, convert to lowercase)
  const normalized = value.toLowerCase().replace(/\s+/g, '');
  
  // If this is already a simple number, just return it
  if (/^\d+(\.\d+)?$/.test(normalized)) {
    return parseFloat(normalized);
  }
  
  // Look for years pattern
  const yearsMatches = Array.from(normalized.matchAll(/(\d+(?:\.\d+)?)(?:y|yr|year|years)/g));
  let years = 0;
  for (const match of yearsMatches) {
    years += parseFloat(match[1]);
  }
  
  // Look for months pattern
  const monthsMatches = Array.from(normalized.matchAll(/(\d+(?:\.\d+)?)(?:mo|month|months)/g));
  let months = 0;
  for (const match of monthsMatches) {
    months += parseFloat(match[1]);
  }
  
  // Look for weeks pattern
  const weeksMatches = Array.from(normalized.matchAll(/(\d+(?:\.\d+)?)(?:w|wk|week|weeks)/g));
  let weeks = 0;
  for (const match of weeksMatches) {
    weeks += parseFloat(match[1]);
  }
  
  // Look for days pattern
  const daysMatches = Array.from(normalized.matchAll(/(\d+(?:\.\d+)?)(?:d|day|days)/g));
  let days = 0;
  for (const match of daysMatches) {
    days += parseFloat(match[1]);
  }
  
  // Look for hours pattern (e.g., 4h, 4hr, 4hrs)
  // Use global flag to find all matches
  const hoursMatches = Array.from(normalized.matchAll(/(\d+(?:\.\d+)?)(?:h|hr|hour|hours)/g));
  let hours = 0;
  for (const match of hoursMatches) {
    hours += parseFloat(match[1]);
  }
  
  // Look for minutes pattern (e.g., 30min, 30m)
  // We need to be careful with just 'm' as it could be meters or other units
  // First try specific minute terms
  const minutesSpecificMatches = Array.from(normalized.matchAll(/(\d+(?:\.\d+)?)(?:min|minute|minutes)/g));
  let minutes = 0;
  for (const match of minutesSpecificMatches) {
    minutes += parseFloat(match[1]);
  }
  
  // Then try just 'm' if it's in a time context (after a number, not followed by other letters)
  // Only if it's not followed by letters (to avoid matching 'meters', 'miles', etc.)
  if (minutesSpecificMatches.length === 0) {
    const mMatches = Array.from(normalized.matchAll(/(\d+(?:\.\d+)?)m(?![a-z])/g));
    for (const match of mMatches) {
      minutes += parseFloat(match[1]);
    }
  }
  
  // Look for seconds pattern (e.g., 15s, 15sec, 15seconds)
  const secondsMatches = Array.from(normalized.matchAll(/(\d+(?:\.\d+)?)(?:s|sec|second|seconds)/g));
  let seconds = 0;
  for (const match of secondsMatches) {
    seconds += parseFloat(match[1]);
  }
  
  // If we couldn't parse anything, try to interpret as the current unit
  if (years === 0 && months === 0 && weeks === 0 && days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    const numericMatch = normalized.match(/^(\d+(?:\.\d+)?)$/);
    if (numericMatch) {
      return parseFloat(numericMatch[1]);
    }
  }
  
  // Convert all to seconds as the common unit
  return (
    years * 31536000 +
    months * 2628000 +
    weeks * 604800 +
    days * 86400 +
    hours * 3600 +
    minutes * 60 +
    seconds
  );
};

// Helper function to convert values
export const convertValue = (
  value: number | string,
  fromUnit: string,
  toUnit: string, 
  category: string
): number | string => {
  // Handle currency as a special case if it's not in the conversionCategories
  const categoryData = category === 'currency' && !conversionCategories[category]
    ? currencyCategory
    : conversionCategories[category];
  
  // Check if the input is a valid category
  if (!categoryData) {
    return "Invalid category";
  }
  
  // Check if units are valid
  if (!categoryData.units[fromUnit] || !categoryData.units[toUnit]) {
    return "Invalid unit";
  }

  // Handle empty or non-numeric input
  if (value === "" || (typeof value === 'number' && isNaN(value))) {
    return "";
  }
  
  // Special case for GPS coordinates
  if (category === "gps_coordinates") {
    try {
      // Use the appropriate conversion unit functions
      const fromUnitObj = categoryData.units[fromUnit] as GPSConversionUnit;
      const toUnitObj = categoryData.units[toUnit] as GPSConversionUnit;
      
      // Convert to base unit (which is a CoordinatePair)
      const baseValue = fromUnitObj.toBase(value);
      
      // Convert from base unit to target unit
      return toUnitObj.fromBase(baseValue);
    } catch (error) {
      console.error("GPS conversion error:", error);
      return "Invalid GPS format";
    }
  }
  
  // For all other categories, use the regular conversion methods
  const fromUnitObj = categoryData.units[fromUnit] as ConversionUnit;
  const toUnitObj = categoryData.units[toUnit] as ConversionUnit;
  
  // Special case for feet/inches in length category
  if (category === "length" && typeof value === "string" && 
      (value.includes("ft") || value.includes("'") || 
       value.includes("feet") || value.includes("in") || 
       value.includes('"') || value.includes("inches"))) {
    
    // Parse the feet/inches format
    const feetDecimal = parseFeetInches(value);
    
    // Convert from feet to meters (base unit)
    const meters = fromUnitObj.toBase(feetDecimal);
    
    // Convert from meters to the target unit
    const result = toUnitObj.fromBase(meters);
    
    if (toUnit === "feet") {
      return formatFeetInches(result);
    }
    
    return result;
  }
  
  // Special case for time expressions like "4h30min"
  if (category === "time" && typeof value === "string" &&
      (value.includes("h") || value.includes("min") || value.includes("sec") || 
       value.includes("hour") || value.includes("minute") || value.includes("second"))) {
    
    try {
      // Parse the time expression
      const totalSeconds = parseTimeExpression(value);
      
      // No need to use fromUnit's toBase function - the parseTimeExpression already gives us seconds
      // Just convert from seconds (base unit) to target unit
      return toUnitObj.fromBase(totalSeconds);
    } catch (error) {
      console.error("Time parsing error:", error);
      return "Error";
    }
  }
  
  // Standard conversion for numeric values
  try {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    // Convert to base unit
    const baseValue = fromUnitObj.toBase(numValue);
    // Convert from base unit to target unit
    const result = toUnitObj.fromBase(baseValue);
    return result;
  } catch (error) {
    console.error("Conversion error:", error);
    return "Error";
  }
};

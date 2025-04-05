import { conversionCategories, currencyCategory } from './index';
import { parseFeetInches, formatFeetInches } from './length';

// Parse a compound time expression like "4h30min" or "2h15m"
const parseTimeExpression = (value: string): number => {
  // Normalize the string first (remove spaces, convert to lowercase)
  const normalized = value.toLowerCase().replace(/\s+/g, '');
  
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
  if (hours === 0 && minutes === 0 && seconds === 0) {
    const numericMatch = normalized.match(/^(\d+(?:\.\d+)?)$/);
    if (numericMatch) {
      return parseFloat(numericMatch[1]);
    }
  }
  
  // Convert all to seconds as the common unit
  return hours * 3600 + minutes * 60 + seconds;
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
  
  // Special case for feet/inches in length category
  if (category === "length" && typeof value === "string" && 
      (value.includes("ft") || value.includes("'") || 
       value.includes("feet") || value.includes("in") || 
       value.includes('"') || value.includes("inches"))) {
    
    // Parse the feet/inches format
    const feetDecimal = parseFeetInches(value);
    
    // Convert from feet to meters (base unit)
    const meters = categoryData.units.feet.toBase(feetDecimal);
    
    // Convert from meters to the target unit
    const result = categoryData.units[toUnit].fromBase(meters);
    
    if (toUnit === "feet") {
      return formatFeetInches(result);
    }
    
    return result;
  }
  
  // Special case for time expressions like "4h30min"
  if (category === "time" && typeof value === "string" &&
      (value.includes("h") || value.includes("min") || value.includes("sec") || 
       value.includes("hour") || value.includes("minute") || value.includes("second"))) {
    
    // Parse the time expression to get total seconds
    const totalSeconds = parseTimeExpression(value);
    
    // For time expressions, we always use seconds as the base unit
    // regardless of what's selected in fromUnit
    // Then convert from seconds to the target unit
    return categoryData.units[toUnit].fromBase(totalSeconds);
  }
  
  // Standard conversion for numeric values
  try {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    // Convert to base unit
    const baseValue = categoryData.units[fromUnit].toBase(numValue);
    // Convert from base unit to target unit
    const result = categoryData.units[toUnit].fromBase(baseValue);
    return result;
  } catch (error) {
    console.error("Conversion error:", error);
    return "Error";
  }
};

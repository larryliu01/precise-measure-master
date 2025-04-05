import { conversionCategories, currencyCategory } from './index';
import { parseFeetInches, formatFeetInches } from './length';

// Parse a compound time expression like "4h30min" or "2h15m"
const parseTimeExpression = (value: string): number => {
  // Normalize the string first (remove spaces, convert to lowercase)
  const normalized = value.toLowerCase().replace(/\s+/g, '');
  
  // Look for hours pattern (e.g., 4h, 4hr, 4hrs)
  const hoursMatch = normalized.match(/(\d+)(?:h|hr|hour|hours)/);
  const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
  
  // Look for minutes pattern (e.g., 30m, 30min, 30mins)
  const minutesMatch = normalized.match(/(\d+)(?:m|min|minute|minutes)/);
  const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
  
  // Look for seconds pattern (e.g., 15s, 15sec, 15seconds)
  const secondsMatch = normalized.match(/(\d+)(?:s|sec|second|seconds)/);
  const seconds = secondsMatch ? parseInt(secondsMatch[1]) : 0;
  
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
    
    // Parse the time expression
    const totalSeconds = parseTimeExpression(value);
    
    // Convert to the base unit (seconds)
    const baseValue = categoryData.units[fromUnit].toBase(totalSeconds);
    
    // Convert from base to target unit
    return categoryData.units[toUnit].fromBase(baseValue);
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

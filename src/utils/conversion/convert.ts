
import { conversionCategories } from './index';
import { parseFeetInches, formatFeetInches } from './length';

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

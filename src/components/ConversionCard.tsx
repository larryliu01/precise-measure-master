import React, { useState, useEffect } from "react";
import ConversionInput from "./ConversionInput";
import { convertValue, conversionCategories, currencyCategory } from "../utils/conversion";
import { ArrowDownUp } from "lucide-react";

interface ConversionCardProps {
  category: string;
}

// Storage keys for units
const STORAGE_KEYS = {
  FROM_UNIT: 'converter_fromUnit_',
  TO_UNIT: 'converter_toUnit_',
};

const ConversionCard: React.FC<ConversionCardProps> = ({ category }) => {
  const [fromValue, setFromValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("");

  // Set default units when category changes - with localStorage persistence
  useEffect(() => {
    // Handle currency as special case if it's not in conversionCategories
    const categoryData = category === 'currency' && !conversionCategories[category] 
      ? currencyCategory
      : conversionCategories[category];
      
    const units = Object.keys(
      categoryData ? categoryData.units : {}
    );
    
    if (units.length > 0) {
      // Try to load saved units from localStorage for this category
      const savedFromUnit = localStorage.getItem(STORAGE_KEYS.FROM_UNIT + category);
      const savedToUnit = localStorage.getItem(STORAGE_KEYS.TO_UNIT + category);
      
      // Use saved units if they're valid, otherwise use defaults
      const newFromUnit = savedFromUnit && units.includes(savedFromUnit) ? savedFromUnit : units[0];
      const newToUnit = savedToUnit && units.includes(savedToUnit) ? savedToUnit : units.length > 1 ? units[1] : units[0];
      
      setFromUnit(newFromUnit);
      setToUnit(newToUnit);
      
      // Clear input when category changes
      setFromValue("");
      setToValue("");
    }
  }, [category]);
  
  // Save unit selections to localStorage when they change
  useEffect(() => {
    if (fromUnit && category) {
      localStorage.setItem(STORAGE_KEYS.FROM_UNIT + category, fromUnit);
    }
  }, [fromUnit, category]);
  
  useEffect(() => {
    if (toUnit && category) {
      localStorage.setItem(STORAGE_KEYS.TO_UNIT + category, toUnit);
    }
  }, [toUnit, category]);

  // Check if the input might contain compound units
  const hasCompoundUnits = (input: string): boolean => {
    // Check for length compound units (3ft4in, etc.)
    if (category === "length" && 
        (input.includes("ft") || input.includes("'") || input.includes("feet") || 
         input.includes("in") || input.includes('"') || input.includes("inches"))) {
      return true;
    }
    
    // Check for time compound units (4h3min, etc.)
    if (category === "time") {
      // Look for hour/minute/second patterns
      const hasHours = /\d+\s*(?:h|hr|hour|hours)/i.test(input);
      const hasMinutes = /\d+\s*(?:m|min|minute|minutes)/i.test(input);
      const hasSeconds = /\d+\s*(?:s|sec|second|seconds)/i.test(input);
      const hasDays = /\d+\s*(?:d|day|days)/i.test(input);
      const hasWeeks = /\d+\s*(?:w|wk|week|weeks)/i.test(input);
      const hasMonths = /\d+\s*(?:mo|month|months)/i.test(input);
      const hasYears = /\d+\s*(?:y|yr|year|years)/i.test(input);
      
      // Consider it a compound unit if it has any time unit
      if (hasHours || hasMinutes || hasSeconds || hasDays || hasWeeks || hasMonths || hasYears) {
        return true;
      }
    }
    
    // Check for GPS coordinate formats
    if (category === "gps_coordinates") {
      // Check for DMS format (degrees, minutes, seconds)
      if (input.includes('°') || input.includes("'") || input.includes('"') || 
          /\d+\s*(?:deg|degrees)/.test(input) || 
          /\d+\s*(?:min|minutes)/.test(input) || 
          /\d+\s*(?:sec|seconds)/.test(input) || 
          /[NSEW]$/i.test(input)) {
        return true;
      }
      
      // Check for decimal degrees with comma (e.g., 22.331345, 114.216131)
      if (/^-?\d+\.\d+\s*,\s*-?\d+\.\d+$/.test(input)) {
        return true;
      }
      
      // Check for UTM format
      if (/\d+[A-Z]\s+\d+\s+\d+/.test(input)) {
        return true;
      }
      
      // Check for MGRS format
      if (/\d+[A-Z]{3}\s+\d+\s+\d+/.test(input)) {
        return true;
      }
    }
    
    return false;
  };

  // Convert when from value, from unit, or to unit changes
  useEffect(() => {
    if (fromValue && fromUnit && toUnit) {
      try {
        // Check if this might be a compound unit input
        if (hasCompoundUnits(fromValue)) {
          // Use the full input string for special handling
          const result = convertValue(fromValue, fromUnit, toUnit, category);
          setToValue(result.toString());
        } else {
          // For regular inputs, extract just the numeric part
          const numericMatch = fromValue.match(/^[-+]?\d*\.?\d+/);
          if (numericMatch) {
            const numericValue = numericMatch[0];
            const result = convertValue(numericValue, fromUnit, toUnit, category);
            setToValue(result.toString());
          } else {
            setToValue("");
          }
        }
      } catch (error) {
        console.error("Conversion error:", error);
        setToValue("");
      }
    } else {
      setToValue("");
    }
  }, [fromValue, fromUnit, toUnit, category]);

  // Function to swap units and values
  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
  };

  // Handle from value change
  const handleFromValueChange = (val: string) => {
    setFromValue(val);
  };

  // Handle to value change
  const handleToValueChange = (val: string) => {
    setToValue(val);
    if (val && toUnit && fromUnit) {
      try {
        // Check if this might be a compound unit input
        if (hasCompoundUnits(val)) {
          // Use the full input string for special handling
          const result = convertValue(val, toUnit, fromUnit, category);
          setFromValue(result.toString());
        } else {
          // For regular inputs, extract just the numeric part
          const numericMatch = val.match(/^[-+]?\d*\.?\d+/);
          if (numericMatch) {
            const numericValue = numericMatch[0];
            const result = convertValue(numericValue, toUnit, fromUnit, category);
            setFromValue(result.toString());
          }
        }
      } catch (error) {
        console.error("Error converting back:", error);
      }
    }
  };

  // Get appropriate placeholder for the current category
  const getPlaceholderForCategory = (category: string, isInput: boolean): string => {
    if (category === "gps_coordinates") {
      if (isInput) {
        if (fromUnit === "decimal_degrees") {
          return "E.g.: 37.7749, -122.4194";
        } else if (fromUnit === "degrees_minutes_seconds") {
          return "E.g.: 37°46'12\"N 122°25'48\"W";
        } else if (fromUnit === "degrees_decimal_minutes") {
          return "E.g.: 37°46.20'N 122°25.80'W";
        } else if (fromUnit === "utm") {
          return "E.g.: 10S 123456 4567890";
        } else if (fromUnit === "mgrs") {
          return "E.g.: 15SWC8081751205";
        } else if (fromUnit === "geohash") {
          return "E.g.: 9q8yyk8yuv";
        }
      }
    }
    return isInput ? "Enter value" : "";
  };

  return (
    <div className="conversion-card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConversionInput
          category={category}
          value={fromValue}
          unit={fromUnit}
          onValueChange={handleFromValueChange}
          onUnitChange={setFromUnit}
          label="From"
          placeholder={getPlaceholderForCategory(category, true)}
        />

        <ConversionInput
          category={category}
          value={toValue}
          unit={toUnit}
          onValueChange={setToValue}
          onUnitChange={setToUnit}
          label="To"
          readOnly={true}
        />
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSwap}
          className="bg-gradient-to-r from-appcyan/10 to-accent/10 backdrop-blur-sm p-2 rounded-full border border-appwhite/20 shadow-lg hover:shadow-appcyan/20 transition-all duration-300 hover:scale-110 group"
          aria-label="Swap conversion direction"
        >
          <ArrowDownUp className="h-5 w-5 text-appcyan group-hover:text-accent transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default ConversionCard;

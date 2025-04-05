import React, { useState, useEffect } from "react";
import ConversionInput from "./ConversionInput";
import { convertValue, conversionCategories, currencyCategory } from "../utils/conversion";
import { ArrowDownUp } from "lucide-react";

interface ConversionCardProps {
  category: string;
}

const ConversionCard: React.FC<ConversionCardProps> = ({ category }) => {
  const [fromValue, setFromValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("");

  // Set default units when category changes
  useEffect(() => {
    // Handle currency as special case if it's not in conversionCategories
    const categoryData = category === 'currency' && !conversionCategories[category] 
      ? currencyCategory
      : conversionCategories[category];
      
    const units = Object.keys(
      categoryData ? categoryData.units : {}
    );
    
    if (units.length > 0) {
      setFromUnit(units[0]);
      setToUnit(units.length > 1 ? units[1] : units[0]);
    }
  }, [category]);

  // Check if the input might contain compound units
  const hasCompoundUnits = (input: string): boolean => {
    // Check for length compound units (3ft4in, etc.)
    if (category === "length" && 
        (input.includes("ft") || input.includes("'") || input.includes("feet") || 
         input.includes("in") || input.includes('"') || input.includes("inches"))) {
      return true;
    }
    
    // Check for time compound units (4h3min, etc.)
    if (category === "time" && 
        ((input.includes("h") || input.includes("hour")) && 
         (input.includes("m") || input.includes("min") || 
          input.includes("s") || input.includes("sec")))) {
      return true;
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
          placeholder="Enter value"
        />

        <ConversionInput
          category={category}
          value={toValue}
          unit={toUnit}
          onValueChange={handleToValueChange}
          onUnitChange={setToUnit}
          label="To"
        />
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleSwap}
          className="secondary-button"
          aria-label="Swap units"
        >
          <ArrowDownUp className="h-5 w-5 mr-2" />
          Swap
        </button>
      </div>
    </div>
  );
};

export default ConversionCard;

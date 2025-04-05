import React, { useState, useRef, useEffect } from "react";
import UnitSelector from "./UnitSelector";
import { conversionCategories, currencyCategory } from "../utils/conversion";

interface ConversionInputProps {
  category: string;
  value: string;
  unit: string;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: string) => void;
  label: string;
  readOnly?: boolean;
  placeholder?: string;
}

const ConversionInput: React.FC<ConversionInputProps> = ({
  category,
  value,
  unit,
  onValueChange,
  onUnitChange,
  label,
  readOnly = false,
  placeholder = "Enter value"
}) => {
  // Local state for input value - keeps the full text including units
  const [inputText, setInputText] = useState<string>(value);
  // Local state for GPS coordinates
  const [latValue, setLatValue] = useState<string>("");
  const [longValue, setLongValue] = useState<string>("");
  // Keep reference to the last unit that was detected
  const lastDetectedUnitRef = useRef<string>("");
  
  // Update local state when prop value changes
  useEffect(() => {
    // Only update if the value has actually changed and it's different from inputText
    // This avoids unnecessary updates during typing
    if (value !== inputText && category !== "gps_coordinates") {
      setInputText(value);
    }
    
    // For GPS coordinates, parse the incoming value
    if (category === "gps_coordinates" && value) {
      try {
        // Check if value is in the format "lat,long"
        const parts = value.split(',');
        if (parts.length === 2) {
          setLatValue(parts[0].trim());
          setLongValue(parts[1].trim());
        }
      } catch (e) {
        console.error("Error parsing GPS coordinates", e);
      }
    }
  }, [value, category]);
  
  // Get abbreviation for a unit
  const getUnitAbbreviation = (unitKey: string) => {
    const categoryData = category === 'currency' && !conversionCategories[category] 
      ? currencyCategory
      : conversionCategories[category];
      
    if (categoryData && unitKey) {
      const unitInfo = categoryData.units[unitKey];
      if (unitInfo) {
        const abbrevMatch = unitInfo.label.match(/\(([^)]+)\)/);
        return abbrevMatch ? abbrevMatch[1] : "";
      }
    }
    return "";
  };
  
  // Get all possible unit abbreviations and names for the current category
  const getUnitOptions = () => {
    const result = [];
    const categoryData = category === 'currency' && !conversionCategories[category] 
      ? currencyCategory
      : conversionCategories[category];
    
    if (!categoryData) return [];
    
    for (const unitKey in categoryData.units) {
      const unitInfo = categoryData.units[unitKey];
      const unitLabel = unitInfo.label;
      
      // Extract abbreviation from label (text inside parentheses)
      const abbrevMatch = unitLabel.match(/\(([^)]+)\)/);
      const abbreviation = abbrevMatch ? abbrevMatch[1].toLowerCase() : "";
      
      // Get unit name (text before parentheses)
      const nameMatch = unitLabel.match(/^([^(]+)/);
      const name = nameMatch ? nameMatch[1].trim().toLowerCase() : "";
      
      result.push({
        key: unitKey,
        abbreviation,
        name
      });
    }
    
    // Sort by length descending so longer matches take precedence
    return result.sort((a, b) => {
      const aLen = Math.max(a.abbreviation.length, a.name.length);
      const bLen = Math.max(b.abbreviation.length, b.name.length);
      return bLen - aLen;
    });
  };
  
  // Handle input change with unit detection
  const handleInputChange = (input: string) => {
    // Keep track of the full input including units
    setInputText(input);
    
    // Look for number at the start
    const parts = input.match(/^([-+]?\d*\.?\d+)\s*(.*)$/);
    
    if (!parts) {
      // No number pattern found, just update with the raw input
      onValueChange(input);
      return;
    }
    
    const numericValue = parts[1];
    const remainingText = parts[2].toLowerCase().trim();
    
    // If there's text after the number, check if it's a unit
    if (remainingText) {
      // Check against all possible units
      const unitOptions = getUnitOptions();
      let detectedUnit = "";
      
      for (const option of unitOptions) {
        if (
          remainingText === option.abbreviation || 
          remainingText.startsWith(option.abbreviation + " ") ||
          remainingText === option.name ||
          remainingText.startsWith(option.name + " ")
        ) {
          detectedUnit = option.key;
          break;
        }
      }
      
      // If we found a unit, update the unit selector
      if (detectedUnit && detectedUnit !== unit) {
        onUnitChange(detectedUnit);
      }
    }
    
    // Either way, update the value with the full input
    // This allows the user to continue typing units
    onValueChange(input);
  };
  
  // Handle GPS coordinate changes
  const handleGpsCoordinateChange = (lat: string, long: string) => {
    setLatValue(lat);
    setLongValue(long);
    onValueChange(`${lat},${long}`);
  };
  
  // Detect GPS coordinate symbols and update units
  const handleGpsSymbolDetection = (value: string) => {
    // Check for degree symbols to detect DMS/DDM format
    if (value.includes('°') && !value.includes("'") && !value.includes('"')) {
      // Just degrees symbol - likely DDM format
      if (unit !== "degrees_decimal_minutes") {
        onUnitChange("degrees_decimal_minutes");
      }
    } else if (value.includes('°') && (value.includes("'") || value.includes('"'))) {
      // Degrees and minutes/seconds symbols - likely DMS format
      if (unit !== "degrees_minutes_seconds") {
        onUnitChange("degrees_minutes_seconds");
      }
    }
  };

  // Render GPS coordinate inputs when appropriate
  if (category === "gps_coordinates") {
    return (
      <div className="mb-4 w-full">
        <div className="w-full">
          <label className="block text-sm font-medium text-appwhite/80 mb-1">
            {label}
          </label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-appwhite/80 w-12">Lat:</label>
              <div className="flex-grow">
                <input
                  type="text"
                  value={latValue}
                  onChange={(e) => {
                    const newLat = e.target.value;
                    handleGpsSymbolDetection(newLat);
                    handleGpsCoordinateChange(newLat, longValue);
                  }}
                  placeholder="Latitude"
                  readOnly={readOnly}
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-appwhite/80 w-12">Long:</label>
              <div className="flex-grow">
                <input
                  type="text"
                  value={longValue}
                  onChange={(e) => {
                    const newLong = e.target.value;
                    handleGpsSymbolDetection(newLong);
                    handleGpsCoordinateChange(latValue, newLong);
                  }}
                  placeholder="Longitude"
                  readOnly={readOnly}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>
        <UnitSelector
          category={category}
          value={unit}
          onChange={onUnitChange}
          label="Unit"
          id={`${label.toLowerCase()}-unit-selector`}
        />
      </div>
    );
  }

  // Standard render for non-GPS inputs
  return (
    <div className="mb-4 w-full">
      <div className="w-full">
        <label className="block text-sm font-medium text-appwhite/80 mb-1">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-grow">
            <input
              type="text"
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={placeholder}
              readOnly={readOnly}
              className="input-field"
            />
          </div>
        </div>
      </div>
      <UnitSelector
        category={category}
        value={unit}
        onChange={onUnitChange}
        label="Unit"
        id={`${label.toLowerCase()}-unit-selector`}
      />
    </div>
  );
};

export default ConversionInput;
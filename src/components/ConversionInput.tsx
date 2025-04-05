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
  // Keep reference to the last unit that was detected
  const lastDetectedUnitRef = useRef<string>("");
  
  // Update local state when prop value changes
  useEffect(() => {
    // Only update if the value has actually changed and it's different from inputText
    // This avoids unnecessary updates during typing
    if (value !== inputText) {
      setInputText(value);
    }
  }, [value]);
  
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
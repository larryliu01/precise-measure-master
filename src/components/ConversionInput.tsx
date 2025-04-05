import React, { useState, useEffect } from "react";
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

// Function to extract unit abbreviations from input strings
const extractUnitFromInput = (input: string, category: string): { value: string, unitKey: string | null } => {
  // Skip if input is empty or just a number
  if (!input || /^-?\d*\.?\d*$/.test(input)) {
    return { value: input, unitKey: null };
  }

  // Get all units for the current category
  const categoryData = category === 'currency' && !conversionCategories[category]
    ? currencyCategory
    : conversionCategories[category];

  if (!categoryData) {
    return { value: input, unitKey: null };
  }

  const units = categoryData.units;
  
  // Create a mapping of unit labels and their variations to unit keys
  const unitMappings = Object.entries(units).reduce((acc, [key, unitInfo]) => {
    // Extract the abbreviation from the label if it exists (e.g., "Kilograms (kg)" -> "kg")
    const match = unitInfo.label.match(/\(([^)]+)\)/);
    if (match && match[1]) {
      acc[match[1].toLowerCase()] = key;
    }
    return acc;
  }, {} as Record<string, string>);

  // Try to extract numeric value and unit
  const match = input.match(/^(-?\d*\.?\d+)\s*([a-zA-Z°'\"]+)$/);
  if (match) {
    const [, numericPart, unitPart] = match;
    const unitKey = unitMappings[unitPart.toLowerCase()];
    
    if (unitKey) {
      return { value: numericPart, unitKey };
    }
  }

  return { value: input, unitKey: null };
};

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
  // Track if we're currently processing a unit extraction to prevent loops
  const [processingUnitExtraction, setProcessingUnitExtraction] = useState(false);

  const handleInputChange = (inputValue: string) => {
    if (processingUnitExtraction) {
      onValueChange(inputValue);
      return;
    }

    const { value: extractedValue, unitKey } = extractUnitFromInput(inputValue, category);
    
    // If we found a unit in the input, update both value and unit
    if (unitKey) {
      setProcessingUnitExtraction(true);
      onValueChange(extractedValue);
      onUnitChange(unitKey);
      // Reset processing flag after a short delay to ensure state updates complete
      setTimeout(() => setProcessingUnitExtraction(false), 100);
    } else {
      onValueChange(inputValue);
    }
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
              value={value}
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

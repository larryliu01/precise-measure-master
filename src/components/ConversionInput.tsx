
import React, { useState } from "react";
import UnitSelector from "./UnitSelector";

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
              onChange={(e) => onValueChange(e.target.value)}
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

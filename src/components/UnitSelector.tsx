import React from "react";
import { conversionCategories, currencyCategory } from "../utils/conversion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UnitSelectorProps {
  category: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ 
  category, 
  value, 
  onChange,
  label,
  id = `${category}-unit-selector`
}) => {
  // Handle currency as special case if it's not in conversionCategories
  const categoryData = category === 'currency' && !conversionCategories[category] 
    ? currencyCategory
    : conversionCategories[category];
    
  const units = categoryData?.units || {};

  // Only render label if provided
  const labelElement = label ? (
    <label htmlFor={id} className="block text-sm font-medium text-appwhite/80 mb-1">
      {label}
    </label>
  ) : null;

  return (
    <div className={label ? "mb-2" : ""}>
      {labelElement}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          id={id}
          className="w-32 md:w-32 bg-appblue-dark/30 text-appwhite border-2 border-appcyan/30 shadow-inner shadow-appcyan/20 glowing-focus outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0"
        >
          <SelectValue placeholder="Unit" />
        </SelectTrigger>
        <SelectContent className="bg-appblue-light/90 backdrop-blur-md text-appwhite border-appwhite/20 max-h-60">
          {Object.keys(units).map((unit) => (
            <SelectItem 
              key={unit} 
              value={unit}
              className="cursor-pointer hover:bg-appblue-dark"
            >
              {units[unit].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UnitSelector;

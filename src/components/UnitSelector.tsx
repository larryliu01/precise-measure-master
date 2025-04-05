import React from "react";
import { conversionCategories, currencyCategory } from "../utils/conversion";

interface UnitSelectorProps {
  category: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ category, value, onChange, label, id }) => {
  // Handle currency as special case if it's not in conversionCategories
  const categoryData = category === 'currency' && !conversionCategories[category] 
    ? currencyCategory
    : conversionCategories[category];
    
  const units = categoryData?.units || {};

  return (
    <div className="mb-2">
      <label htmlFor={id} className="block text-sm font-medium text-appwhite/80 mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-appblue-dark/30 rounded-xl border-2 border-appcyan/50 px-3 py-2 text-white w-full outline-none shadow-inner shadow-appcyan/20 no-outline"
      >
        {Object.keys(units).map((unit) => (
          <option key={unit} value={unit}>
            {units[unit].label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UnitSelector;

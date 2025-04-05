
import React from "react";
import { conversionCategories } from "../utils/conversionUtils";

interface UnitSelectorProps {
  category: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ category, value, onChange, label, id }) => {
  const units = conversionCategories[category]?.units || {};

  return (
    <div className="mb-2">
      <label htmlFor={id} className="block text-sm font-medium text-appwhite/80 mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-appblue rounded-xl border border-border/50 px-3 py-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-accent/50"
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

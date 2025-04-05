
import React from "react";
import { conversionCategories } from "../utils/conversion";
import { 
  Ruler, 
  Square, 
  Cylinder, 
  Weight, 
  Thermometer, 
  Clock, 
  Gauge, 
  Zap, 
  Power, 
  Database 
} from "lucide-react";

interface CategorySelectorProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  ruler: <Ruler className="h-5 w-5" />,
  square: <Square className="h-5 w-5" />,
  cylinder: <Cylinder className="h-5 w-5" />,
  weight: <Weight className="h-5 w-5" />,
  thermometer: <Thermometer className="h-5 w-5" />,
  clock: <Clock className="h-5 w-5" />,
  gauge: <Gauge className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  power: <Power className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-3 text-appwhite">Select Measurement Type</h2>
      <div className="flex flex-wrap gap-2">
        {Object.keys(conversionCategories).map((categoryKey) => (
          <button
            key={categoryKey}
            onClick={() => onCategoryChange(categoryKey)}
            className={`category-button ${
              selectedCategory === categoryKey ? "active" : ""
            }`}
            aria-label={conversionCategories[categoryKey].name}
          >
            <div className="flex items-center">
              {iconMap[conversionCategories[categoryKey].icon]}
              <span className="ml-2">
                {conversionCategories[categoryKey].name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;

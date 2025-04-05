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
  Database,
  Sun,
  Wrench,
  Compass,
  Droplets,
  Shirt,
  Footprints,
  MapPin
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
  sun: <Sun className="h-5 w-5" />,
  wrench: <Wrench className="h-5 w-5" />,
  compass: <Compass className="h-5 w-5" />,
  droplets: <Droplets className="h-5 w-5" />,
  shirt: <Shirt className="h-5 w-5" />,
  footprints: <Footprints className="h-5 w-5" />,
  "map-pin": <MapPin className="h-5 w-5" />
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onCategoryChange }) => {
  // Ensure we're only showing categories that exist in conversionCategories
  const validCategories = Object.keys(conversionCategories);
  
  // If the selected category is no longer valid, update it
  React.useEffect(() => {
    if (selectedCategory && !validCategories.includes(selectedCategory)) {
      onCategoryChange(validCategories[0] || "length");
    }
  }, [selectedCategory, validCategories, onCategoryChange]);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-3 text-appwhite">Select Measurement Type</h2>
      <div className="flex flex-wrap gap-2 max-h-80 overflow-y-auto p-2">
        {validCategories.map((categoryKey) => (
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

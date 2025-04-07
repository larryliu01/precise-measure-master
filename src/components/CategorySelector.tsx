import React, { useState } from "react";
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
  MapPin,
  ChevronDown,
  ChevronUp
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
  "map-pin": <MapPin className="h-5 w-5" />
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onCategoryChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Ensure we're only showing categories that exist in conversionCategories
  const validCategories = Object.keys(conversionCategories);
  
  // If the selected category is no longer valid, update it
  React.useEffect(() => {
    if (selectedCategory && !validCategories.includes(selectedCategory)) {
      onCategoryChange(validCategories[0] || "length");
    }
  }, [selectedCategory, validCategories, onCategoryChange]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleCategorySelect = (categoryKey: string) => {
    onCategoryChange(categoryKey);
    setIsExpanded(false); // Collapse after selection
  };

  // Get the current category for display
  const currentCategory = selectedCategory ? conversionCategories[selectedCategory] : null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-3 text-appwhite">Select Measurement Type</h2>
      
      {/* Mobile Collapsible Header */}
      <div 
        className="md:hidden bg-appblue-dark/30 rounded-md p-3 border-2 border-appcyan/30 mb-2 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {currentCategory && iconMap[currentCategory.icon]}
            <span className="ml-2 font-medium text-appwhite">
              {currentCategory ? currentCategory.name : "Select Type"}
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-appwhite" />
          ) : (
            <ChevronDown className="h-5 w-5 text-appwhite" />
          )}
        </div>
      </div>
      
      {/* Category Grid - Visible on desktop or when expanded on mobile */}
      <div className={`flex flex-wrap gap-2 p-2 ${isExpanded ? 'max-h-80' : 'max-h-0 md:max-h-80'} 
                      overflow-y-auto transition-all duration-300 ease-in-out md:overflow-visible`}>
        {validCategories.map((categoryKey) => (
          <button
            key={categoryKey}
            onClick={() => handleCategorySelect(categoryKey)}
            className={`category-button ${
              selectedCategory === categoryKey ? "active" : ""
            } ${!isExpanded && 'md:flex hidden'}`}
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

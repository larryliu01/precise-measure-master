
import React, { useState, useEffect } from "react";
import ConversionInput from "./ConversionInput";
import { convertValue, conversionCategories } from "../utils/conversionUtils";
import { ArrowDownUp } from "lucide-react";

interface ConversionCardProps {
  category: string;
}

const ConversionCard: React.FC<ConversionCardProps> = ({ category }) => {
  const [fromValue, setFromValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("");

  // Set default units when category changes
  useEffect(() => {
    const units = Object.keys(
      category ? conversionCategories[category].units : {}
    );
    if (units.length > 0) {
      setFromUnit(units[0]);
      setToUnit(units.length > 1 ? units[1] : units[0]);
    }
  }, [category]);

  // Convert when from value, from unit, or to unit changes
  useEffect(() => {
    if (fromValue && fromUnit && toUnit) {
      const result = convertValue(fromValue, fromUnit, toUnit, category);
      setToValue(result.toString());
    } else {
      setToValue("");
    }
  }, [fromValue, fromUnit, toUnit, category]);

  // Function to swap units and values
  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
  };

  return (
    <div className="conversion-card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConversionInput
          category={category}
          value={fromValue}
          unit={fromUnit}
          onValueChange={setFromValue}
          onUnitChange={setFromUnit}
          label="From"
          placeholder="Enter value"
        />

        <ConversionInput
          category={category}
          value={toValue}
          unit={toUnit}
          onValueChange={(val) => {
            setToValue(val);
            if (val && toUnit && fromUnit) {
              const result = convertValue(val, toUnit, fromUnit, category);
              setFromValue(result.toString());
            }
          }}
          onUnitChange={setToUnit}
          label="To"
        />
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleSwap}
          className="secondary-button"
          aria-label="Swap units"
        >
          <ArrowDownUp className="h-5 w-5 mr-2" />
          Swap
        </button>
      </div>
    </div>
  );
};

export default ConversionCard;

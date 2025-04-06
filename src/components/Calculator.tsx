import React, { useState, useEffect } from "react";
import { commonFormulas } from "../utils/calculation/formulas";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Calculator = () => {
  const [selectedFormula, setSelectedFormula] = useState(commonFormulas[0]);
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [unitSelections, setUnitSelections] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [adjustmentMode, setAdjustmentMode] = useState<string>("tax");

  useEffect(() => {
    // Set the adjustmentMode in unitSelections when it changes
    if (selectedFormula.name === "Price Adjustment Calculator") {
      setUnitSelections(prev => ({ ...prev, adjustmentMode }));
    }
  }, [adjustmentMode, selectedFormula.name]);

  const handleInputChange = (id: string, value: string) => {
    if (value === "") {
      // Explicitly set empty field to undefined
      const newInputs = { ...inputs };
      delete newInputs[id];
      setInputs(newInputs);
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setInputs((prev) => ({ ...prev, [id]: numValue }));
    } else {
      // Remove the input if it's not a valid number
      const newInputs = { ...inputs };
      delete newInputs[id];
      setInputs(newInputs);
    }
  };

  const handleUnitChange = (id: string, unit: string) => {
    setUnitSelections((prev) => ({ ...prev, [id]: unit }));
  };

  const calculateResult = () => {
    // Special handling for Ohm's Law and Distance/Speed/Time calculators
    // which are designed to work with one field left empty
    if (selectedFormula.name === "Ohm's Law Calculator" || 
        selectedFormula.name === "Distance, Speed & Time Calculator") {
      
      // Check if at least 2 inputs are provided
      const filledInputs = selectedFormula.inputs
        .filter(input => inputs[input.id] !== undefined)
        .length;
      
      if (filledInputs >= 2) {
        const calculationResult = selectedFormula.calculate(inputs, unitSelections);
        setResult({ value: calculationResult.result, unit: calculationResult.unit });
        return;
      }
    }
    
    // For other formulas, check if all required inputs are provided
    const allInputsProvided = selectedFormula.inputs.every(
      (input) => inputs[input.id] !== undefined || input.defaultValue !== undefined
    );

    if (allInputsProvided) {
      // Use default values for any missing inputs
      const inputsWithDefaults = { ...inputs };
      selectedFormula.inputs.forEach((input) => {
        if (inputsWithDefaults[input.id] === undefined && input.defaultValue !== undefined) {
          inputsWithDefaults[input.id] = input.defaultValue;
        }
      });

      // Initialize unit selections with defaults for any missing selections
      selectedFormula.inputs.forEach((input) => {
        if (input.units && unitSelections[input.id] === undefined) {
          setUnitSelections(prev => ({ ...prev, [input.id]: input.unit }));
        }
      });

      const calculationResult = selectedFormula.calculate(inputsWithDefaults, unitSelections);
      setResult({ value: calculationResult.result, unit: calculationResult.unit });
    }
  };

  const handleFormulaChange = (value: string) => {
    const formula = commonFormulas.find(f => f.name === value);
    if (formula) {
      setSelectedFormula(formula);
      setResult(null);
      setInputs({});
      
      // Initialize unit selections with defaults for all inputs
      const initialUnitSelections: Record<string, string> = {};
      formula.inputs.forEach((input) => {
        if (input.units) {
          initialUnitSelections[input.id] = input.unit;
        }
      });
      
      // For Price Adjustment Calculator, add adjustment mode
      if (formula.name === "Price Adjustment Calculator") {
        initialUnitSelections.adjustmentMode = adjustmentMode;
      }
      
      setUnitSelections(initialUnitSelections);
    }
  };

  // Render Price Adjustment Calculator mode buttons
  const renderAdjustmentModeButtons = () => {
    if (selectedFormula.name !== "Price Adjustment Calculator") return null;
    
    return (
      <div className="flex flex-col space-y-2 mb-4">
        <label className="block text-sm font-medium text-appwhite/80 mb-1">
          Adjustment Type
        </label>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setAdjustmentMode("tax")}
            className={`flex-1 py-2 px-3 rounded-md transition-colors ${
              adjustmentMode === "tax" 
                ? "bg-appcyan text-appblue font-medium" 
                : "bg-appblue-dark/30 text-appwhite border border-appcyan/30"
            }`}
          >
            Tax
          </button>
          <button
            type="button"
            onClick={() => setAdjustmentMode("tip")}
            className={`flex-1 py-2 px-3 rounded-md transition-colors ${
              adjustmentMode === "tip" 
                ? "bg-appcyan text-appblue font-medium" 
                : "bg-appblue-dark/30 text-appwhite border border-appcyan/30"
            }`}
          >
            Tip
          </button>
          <button
            type="button"
            onClick={() => setAdjustmentMode("discount")}
            className={`flex-1 py-2 px-3 rounded-md transition-colors ${
              adjustmentMode === "discount" 
                ? "bg-appcyan text-appblue font-medium" 
                : "bg-appblue-dark/30 text-appwhite border border-appcyan/30"
            }`}
          >
            Discount
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3 text-appwhite">Choose Calculation</h2>
        <div className="mb-4">
          <Select 
            defaultValue={commonFormulas[0].name} 
            onValueChange={handleFormulaChange}
          >
            <SelectTrigger className="w-full bg-appblue-dark/30 text-appwhite border-2 border-appcyan/30 shadow-inner shadow-appcyan/20 glowing-focus outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select a calculation" />
            </SelectTrigger>
            <SelectContent className="bg-appblue-light text-appwhite border-appwhite/20 max-h-80">
              {commonFormulas.map((formula) => (
                <SelectItem 
                  key={formula.name} 
                  value={formula.name}
                  className="cursor-pointer hover:bg-appblue-dark"
                >
                  {formula.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="unit-card mb-6">
        <h3 className="text-lg mb-2 text-appwhite">{selectedFormula.name}</h3>
        <p className="text-appwhite/70 mb-4">{selectedFormula.description}</p>
        
        <div className="space-y-4">
          {renderAdjustmentModeButtons()}
          
          {selectedFormula.inputs.map((input) => (
            <div key={input.id} className="mb-4">
              <label htmlFor={input.id} className="block text-sm font-medium text-appwhite/80 mb-1">
                {input.label}
              </label>
              <div className="flex gap-2">
                <input
                  id={input.id}
                  type={selectedFormula.name === "Ohm's Law Calculator" || 
                       selectedFormula.name === "Distance, Speed & Time Calculator" 
                       ? "text" : "number"}
                  placeholder={input.placeholder}
                  defaultValue={input.defaultValue}
                  className="input-field flex-1"
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                />
                
                {input.units ? (
                  <Select 
                    defaultValue={input.unit} 
                    onValueChange={(value) => handleUnitChange(input.id, value)}
                  >
                    <SelectTrigger className="w-32 bg-appblue-dark/30 text-appwhite border-2 border-appcyan/30 shadow-inner shadow-appcyan/20 glowing-focus outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent className="bg-appblue-light text-appwhite border-appwhite/20">
                      {input.units.map((unit) => (
                        <SelectItem 
                          key={unit.value} 
                          value={unit.value}
                          className="cursor-pointer hover:bg-appblue-dark"
                        >
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="inline-flex h-10 w-20 flex-shrink-0 items-center justify-center rounded-md border-2 border-appcyan/30 bg-appblue-dark/30 px-3 text-sm text-appwhite shadow-inner shadow-appcyan/20">
                    {input.unit}
                  </div>
                )}
              </div>
            </div>
          ))}

          <button 
            className="main-button w-full mt-4" 
            onClick={calculateResult}
          >
            Calculate
          </button>
          
          {result && (
            <div className="mt-4 p-4 bg-appblue rounded-lg border border-appwhite/20">
              <p className="text-appwhite/80">Result:</p>
              <p className="text-xl font-bold text-appcyan">
                {result.value} {result.unit}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;

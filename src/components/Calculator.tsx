import React, { useState, useEffect } from "react";
import { commonFormulas, Formula } from "../utils/calculation/formulas";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calculator as CalculatorIcon, 
  DollarSign, 
  Clock, 
  Car, 
  ArrowUpDown, 
  Zap, 
  Percent, 
  Weight, 
  FlaskConical, 
  Heart, 
  Lightbulb, 
  Home, 
  BarChart4
} from "lucide-react";

// Map formula names to icons
const formulaIcons: Record<string, React.ReactNode> = {
  "Compound Interest Calculator": <DollarSign className="h-4 w-4 mr-2" />,
  "Distance, Speed & Time Calculator": <Car className="h-4 w-4 mr-2" />,
  "Ohm's Law Calculator": <Zap className="h-4 w-4 mr-2" />,
  "Unit Price Comparison": <BarChart4 className="h-4 w-4 mr-2" />,
  "Fuel Cost for a Trip": <Car className="h-4 w-4 mr-2" />,
  "Body Mass Index (BMI)": <Weight className="h-4 w-4 mr-2" />,
  "Price Adjustment Calculator": <Percent className="h-4 w-4 mr-2" />,
  "Electricity Cost": <Lightbulb className="h-4 w-4 mr-2" />,
  "Mortgage Payment": <Home className="h-4 w-4 mr-2" />,
  "Temperature Converter": <FlaskConical className="h-4 w-4 mr-2" />,
};

// Keys for localStorage
const STORAGE_KEYS = {
  SELECTED_FORMULA: 'calculator_selectedFormula',
  UNIT_SELECTIONS: 'calculator_unitSelections',
  ADJUSTMENT_MODE: 'calculator_adjustmentMode'
};

const Calculator = () => {
  const [selectedFormula, setSelectedFormula] = useState<Formula>(() => {
    try {
      const savedName = localStorage.getItem(STORAGE_KEYS.SELECTED_FORMULA);
      if (savedName) {
        const formula = commonFormulas.find(f => f.name === savedName);
        if (formula) return formula;
      }
    } catch {}
    return commonFormulas[0];
  });
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [unitSelections, setUnitSelections] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UNIT_SELECTIONS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [adjustmentMode, setAdjustmentMode] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ADJUSTMENT_MODE);
    return saved || "tax";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UNIT_SELECTIONS, JSON.stringify(unitSelections));
  }, [unitSelections]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADJUSTMENT_MODE, adjustmentMode);
  }, [adjustmentMode]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_FORMULA, selectedFormula.name);
  }, [selectedFormula]);

  useEffect(() => {
    // Set the adjustmentMode in unitSelections when it changes
    if (selectedFormula.name === "Price Adjustment Calculator") {
      setUnitSelections(prev => ({ ...prev, adjustmentMode }));
    }
  }, [adjustmentMode, selectedFormula.name]);

  const handleInputChange = (id: string, value: string) => {
    // Allow empty strings for Distance/Speed/Time and Ohm's Law calculators
    if ((selectedFormula.name === "Distance, Speed & Time Calculator" || 
        selectedFormula.name === "Ohm's Law Calculator") && value === "") {
      const updatedInputs = { ...inputs };
      delete updatedInputs[id];
      setInputs(updatedInputs);
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setInputs(prev => ({ ...prev, [id]: numValue }));
    }
  };

  const clearInputs = () => {
    setInputs({});
    setResult(null);
  };

  const handleUnitChange = (id: string, unit: string) => {
    setUnitSelections((prev) => {
      const updated = { ...prev, [id]: unit };
      
      // Synchronize units for Unit Price Comparison
      if (selectedFormula.name === "Unit Price Comparison") {
        if (id === "quantity1") {
          updated.quantity2 = unit;
        } else if (id === "quantity2") {
          updated.quantity1 = unit;
        }
      }
      
      return updated;
    });
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
              <SelectValue placeholder="Select a calculation">
                {selectedFormula && (
                  <div className="flex items-center">
                    {formulaIcons[selectedFormula.name] || <CalculatorIcon className="h-4 w-4 mr-2" />}
                    <span>{selectedFormula.name}</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-appblue-light text-appwhite border-appwhite/20 max-h-80">
              {commonFormulas.map((formula) => (
                <SelectItem 
                  key={formula.name} 
                  value={formula.name}
                  className="cursor-pointer hover:bg-appblue-dark"
                >
                  <div className="flex items-center">
                    {formulaIcons[formula.name] || <CalculatorIcon className="h-4 w-4 mr-2" />}
                    <span>{formula.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="unit-card mb-6">
        <h3 className="text-lg mb-2 text-appwhite flex items-center">
          {formulaIcons[selectedFormula.name] || <CalculatorIcon className="h-5 w-5 mr-2" />}
          {selectedFormula.name}
        </h3>
        <p className="text-appwhite/70 mb-4 text-xs">
          {selectedFormula.description}
        </p>
        
        <div className="space-y-4">
          {renderAdjustmentModeButtons()}
          
          {selectedFormula.inputs.map((input) => (
            <div key={input.id} className="mb-4">
              <label htmlFor={input.id} className="block text-sm font-medium text-appwhite/80 mb-1">
                {input.label}
              </label>
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <input
                  id={input.id}
                  type={selectedFormula.name === "Ohm's Law Calculator" || 
                       selectedFormula.name === "Distance, Speed & Time Calculator" 
                       ? "text" : "number"}
                  placeholder={input.placeholder}
                  defaultValue={input.defaultValue}
                  className="input-field flex-1 min-w-0"
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  value={inputs[input.id] !== undefined ? inputs[input.id] : ""}
                />
                
                {input.units ? (
                  <Select 
                    defaultValue={input.unit}
                    value={unitSelections[input.id]}
                    onValueChange={(value) => handleUnitChange(input.id, value)}
                  >
                    <SelectTrigger className="w-32 md:w-32 bg-appblue-dark/30 text-appwhite border-2 border-appcyan/30 shadow-inner shadow-appcyan/20 glowing-focus outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0">
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
                  input.unit && <div className="flex items-center px-3 bg-appblue-dark/30 text-appwhite border-2 border-appcyan/30 rounded-md min-w-12 justify-center">
                    {input.unit}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          <div className="flex gap-4 mt-6 mb-4">
            <button
              type="button"
              onClick={calculateResult}
              className="primary-button flex-1"
            >
              Calculate
            </button>
            
            <button
              type="button"
              onClick={clearInputs}
              className="secondary-button"
            >
              Clear
            </button>
          </div>
          
          {result && (
            <div className="mt-4 p-4 bg-appblue rounded-lg border border-appwhite/20">
              <p className="text-appwhite/80">Result:</p>
              <div className="mt-1">
                {selectedFormula.name === "Compound Interest Calculator" || 
                 selectedFormula.name === "Fuel Cost for a Trip" || 
                 selectedFormula.name === "Mortgage Payment" ? (
                  <p className="text-xl font-bold text-appcyan">
                    ${result.value} {result.unit !== "$" && result.unit !== "$/month" ? result.unit : ""}
                  </p>
                ) : selectedFormula.name === "Body Mass Index (BMI)" ? (
                  <div>
                    <p className="text-xl font-bold text-appcyan mb-2">
                      {result.value} {result.unit.split('\n\n')[0]}
                    </p>
                    <p className="text-appwhite font-medium text-md mb-1">
                      {result.unit.split('\n\n')[1]}
                    </p>
                    <div className="text-appwhite/80 text-sm mt-3 p-2 bg-appblue-dark/40 rounded-md border border-appwhite/10">
                      <p className="whitespace-pre-line">
                        {result.unit.split('\n\n')[2]}
                      </p>
                    </div>
                  </div>
                ) : selectedFormula.name === "Electricity Cost" || 
                   selectedFormula.name === "Unit Price Comparison" ? (
                  <p className="text-xl font-bold text-appcyan">
                    {result.unit}
                  </p>
                ) : (
                  <p className="text-xl font-bold text-appcyan">
                    {result.value} {result.unit}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;

import React, { useState } from "react";
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
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);

  const handleInputChange = (id: string, value: string) => {
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

  const calculateResult = () => {
    // Check if all required inputs are provided
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

      const calculationResult = selectedFormula.calculate(inputsWithDefaults);
      setResult({ value: calculationResult.result, unit: calculationResult.unit });
    }
  };

  const handleFormulaChange = (value: string) => {
    const formula = commonFormulas.find(f => f.name === value);
    if (formula) {
      setSelectedFormula(formula);
      setResult(null);
      setInputs({});
    }
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
            <SelectTrigger className="w-full bg-appblue-light text-appwhite border-appwhite/20">
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
          {selectedFormula.inputs.map((input) => (
            <div key={input.id} className="mb-4">
              <label htmlFor={input.id} className="block text-sm font-medium text-appwhite/80 mb-1">
                {input.label} ({input.unit})
              </label>
              <input
                id={input.id}
                type="number"
                placeholder={input.placeholder}
                defaultValue={input.defaultValue}
                className="input-field"
                onChange={(e) => handleInputChange(input.id, e.target.value)}
              />
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

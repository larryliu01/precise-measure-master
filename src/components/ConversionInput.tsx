import React, { useState, useRef, useEffect } from "react";
import UnitSelector from "./UnitSelector";
import { conversionCategories, currencyCategory } from "../utils/conversion";

interface ConversionInputProps {
  category: string;
  value: string;
  unit: string;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: string) => void;
  label: string;
  readOnly?: boolean;
  placeholder?: string;
}

const ConversionInput: React.FC<ConversionInputProps> = ({
  category,
  value,
  unit,
  onValueChange,
  onUnitChange,
  label,
  readOnly = false,
  placeholder = "Enter value"
}) => {
  // Local state for input value - keeps the full text including units
  const [inputText, setInputText] = useState<string>(value);
  // Local state for GPS coordinates
  const [latValue, setLatValue] = useState<string>("");
  const [longValue, setLongValue] = useState<string>("");
  // Local state for DMS and DDM components
  const [latDegrees, setLatDegrees] = useState<string>("");
  const [latMinutes, setLatMinutes] = useState<string>("");
  const [latSeconds, setLatSeconds] = useState<string>("");
  const [latDirection, setLatDirection] = useState<string>("N");
  const [longDegrees, setLongDegrees] = useState<string>("");
  const [longMinutes, setLongMinutes] = useState<string>("");
  const [longSeconds, setLongSeconds] = useState<string>("");
  const [longDirection, setLongDirection] = useState<string>("E");
  // Keep reference to the last unit that was detected
  const lastDetectedUnitRef = useRef<string>("");
  
  // Update local state when prop value changes
  useEffect(() => {
    // Only update if the value has actually changed and it's different from inputText
    // This avoids unnecessary updates during typing
    if (value !== inputText && category !== "gps_coordinates") {
      setInputText(value);
    }
    
    // For GPS coordinates, parse the incoming value
    if (category === "gps_coordinates" && value) {
      try {
        // Check if value is in the format "lat,long"
        const parts = value.split(',');
        if (parts.length === 2) {
          const latPart = parts[0].trim();
          const longPart = parts[1].trim();
          
          setLatValue(latPart);
          setLongValue(longPart);
          
          // Parse DMS components if needed
          if (unit === "degrees_minutes_seconds") {
            parseAndSetDMS(latPart, true);
            parseAndSetDMS(longPart, false);
          } else if (unit === "degrees_decimal_minutes") {
            parseAndSetDDM(latPart, true);
            parseAndSetDDM(longPart, false);
          }
        }
      } catch (e) {
        console.error("Error parsing GPS coordinates", e);
      }
    }
  }, [value, category, unit]);
  
  // Parse DMS string and set component values
  const parseAndSetDMS = (dmsStr: string, isLatitude: boolean) => {
    // If string is empty, return without changes
    if (!dmsStr || dmsStr.trim() === '') return;
    
    // Remove all spaces
    const normalized = dmsStr.trim();
    
    // Extract degrees, minutes, seconds
    const degMatch = normalized.match(/(-?\d+)°/);
    const minMatch = normalized.match(/(\d+)['′]/);
    const secMatch = normalized.match(/(\d+(?:\.\d+)?)["″]/);
    
    // Extract direction (N/S/E/W)
    const dirMatch = normalized.match(/[NSEW]$/i);
    
    if (isLatitude) {
      setLatDegrees(degMatch ? degMatch[1] : "");
      setLatMinutes(minMatch ? minMatch[1] : "");
      setLatSeconds(secMatch ? secMatch[1] : "");
      if (dirMatch) {
        setLatDirection(dirMatch[0].toUpperCase());
      } else if (degMatch && parseFloat(degMatch[1]) < 0) {
        setLatDirection("S");
        setLatDegrees(Math.abs(parseFloat(degMatch[1])).toString());
      } else {
        setLatDirection("N");
      }
    } else {
      setLongDegrees(degMatch ? degMatch[1] : "");
      setLongMinutes(minMatch ? minMatch[1] : "");
      setLongSeconds(secMatch ? secMatch[1] : "");
      if (dirMatch) {
        setLongDirection(dirMatch[0].toUpperCase());
      } else if (degMatch && parseFloat(degMatch[1]) < 0) {
        setLongDirection("W");
        setLongDegrees(Math.abs(parseFloat(degMatch[1])).toString());
      } else {
        setLongDirection("E");
      }
    }
  };
  
  // Parse DDM string and set component values
  const parseAndSetDDM = (ddmStr: string, isLatitude: boolean) => {
    // If string is empty, return without changes
    if (!ddmStr || ddmStr.trim() === '') return;
    
    // Remove all spaces
    const normalized = ddmStr.trim();
    
    // Extract degrees and decimal minutes
    const degMatch = normalized.match(/(-?\d+)°/);
    const minMatch = normalized.match(/(\d+(?:\.\d+)?)['′]/);
    
    // Extract direction (N/S/E/W)
    const dirMatch = normalized.match(/[NSEW]$/i);
    
    if (isLatitude) {
      setLatDegrees(degMatch ? degMatch[1] : "");
      setLatMinutes(minMatch ? minMatch[1] : "");
      setLatSeconds("");
      if (dirMatch) {
        setLatDirection(dirMatch[0].toUpperCase());
      } else if (degMatch && parseFloat(degMatch[1]) < 0) {
        setLatDirection("S");
        setLatDegrees(Math.abs(parseFloat(degMatch[1])).toString());
      } else {
        setLatDirection("N");
      }
    } else {
      setLongDegrees(degMatch ? degMatch[1] : "");
      setLongMinutes(minMatch ? minMatch[1] : "");
      setLongSeconds("");
      if (dirMatch) {
        setLongDirection(dirMatch[0].toUpperCase());
      } else if (degMatch && parseFloat(degMatch[1]) < 0) {
        setLongDirection("W");
        setLongDegrees(Math.abs(parseFloat(degMatch[1])).toString());
      } else {
        setLongDirection("E");
      }
    }
  };
  
  // Get abbreviation for a unit
  const getUnitAbbreviation = (unitKey: string) => {
    const categoryData = category === 'currency' && !conversionCategories[category] 
      ? currencyCategory
      : conversionCategories[category];
      
    if (categoryData && unitKey) {
      const unitInfo = categoryData.units[unitKey];
      if (unitInfo) {
        const abbrevMatch = unitInfo.label.match(/\(([^)]+)\)/);
        return abbrevMatch ? abbrevMatch[1] : "";
      }
    }
    return "";
  };
  
  // Get all possible unit abbreviations and names for the current category
  const getUnitOptions = () => {
    const result = [];
    const categoryData = category === 'currency' && !conversionCategories[category] 
      ? currencyCategory
      : conversionCategories[category];
    
    if (!categoryData) return [];
    
    for (const unitKey in categoryData.units) {
      const unitInfo = categoryData.units[unitKey];
      const unitLabel = unitInfo.label;
      
      // Extract abbreviation from label (text inside parentheses)
      const abbrevMatch = unitLabel.match(/\(([^)]+)\)/);
      const abbreviation = abbrevMatch ? abbrevMatch[1].toLowerCase() : "";
      
      // Get unit name (text before parentheses)
      const nameMatch = unitLabel.match(/^([^(]+)/);
      const name = nameMatch ? nameMatch[1].trim().toLowerCase() : "";
      
      result.push({
        key: unitKey,
        abbreviation,
        name
      });
    }
    
    // Sort by length descending so longer matches take precedence
    return result.sort((a, b) => {
      const aLen = Math.max(a.abbreviation.length, a.name.length);
      const bLen = Math.max(b.abbreviation.length, b.name.length);
      return bLen - aLen;
    });
  };
  
  // Handle input change with unit detection
  const handleInputChange = (input: string) => {
    // Keep track of the full input including units
    setInputText(input);
    
    // Look for number at the start
    const parts = input.match(/^([-+]?\d*\.?\d+)\s*(.*)$/);
    
    if (!parts) {
      // No number pattern found, just update with the raw input
      onValueChange(input);
      return;
    }
    
    const numericValue = parts[1];
    const remainingText = parts[2].toLowerCase().trim();
    
    // If there's text after the number, check if it's a unit
    if (remainingText) {
      // Check against all possible units
      const unitOptions = getUnitOptions();
      let detectedUnit = "";
      
      for (const option of unitOptions) {
        if (
          remainingText === option.abbreviation || 
          remainingText.startsWith(option.abbreviation + " ") ||
          remainingText === option.name ||
          remainingText.startsWith(option.name + " ")
        ) {
          detectedUnit = option.key;
          break;
        }
      }
      
      // If we found a unit, update the unit selector
      if (detectedUnit && detectedUnit !== unit) {
        onUnitChange(detectedUnit);
      }
    }
    
    // Either way, update the value with the full input
    // This allows the user to continue typing units
    onValueChange(input);
  };
  
  // Handle GPS coordinate changes
  const handleGpsCoordinateChange = (lat: string, long: string) => {
    setLatValue(lat);
    setLongValue(long);
    onValueChange(`${lat},${long}`);
  };
  
  // Detect GPS coordinate symbols and update units
  const handleGpsSymbolDetection = (value: string) => {
    // Check for degree symbols to detect DMS/DDM format
    if (value.includes('°') && !value.includes("'") && !value.includes('"')) {
      // Just degrees symbol - likely DDM format
      if (unit !== "degrees_decimal_minutes") {
        onUnitChange("degrees_decimal_minutes");
      }
    } else if (value.includes('°') && (value.includes("'") || value.includes('"'))) {
      // Degrees and minutes/seconds symbols - likely DMS format
      if (unit !== "degrees_minutes_seconds") {
        onUnitChange("degrees_minutes_seconds");
      }
    }
  };

  // Format DMS components to a string
  const formatDMSComponents = (degrees: string, minutes: string, seconds: string, direction: string) => {
    try {
      // Ensure we have valid numbers
      const deg = degrees ? Math.abs(parseFloat(degrees)) : 0;
      const min = minutes ? parseFloat(minutes) : 0;
      const sec = seconds ? parseFloat(seconds) : 0;
      
      if (isNaN(deg) && isNaN(min) && isNaN(sec)) return "";
      
      let dmsString = "";
      if (!isNaN(deg)) dmsString += `${deg}°`;
      if (!isNaN(min)) dmsString += ` ${min}'`;
      if (!isNaN(sec)) dmsString += ` ${sec}"`;
      if (direction) dmsString += ` ${direction}`;
      
      return dmsString.trim();
    } catch (e) {
      console.error("Error formatting DMS components", e);
      return "";
    }
  };
  
  // Format DDM components to a string
  const formatDDMComponents = (degrees: string, minutes: string, direction: string) => {
    try {
      // Ensure we have valid numbers
      const deg = degrees ? Math.abs(parseFloat(degrees)) : 0;
      const min = minutes ? parseFloat(minutes) : 0;
      
      if (isNaN(deg) && isNaN(min)) return "";
      
      let ddmString = "";
      if (!isNaN(deg)) ddmString += `${deg}°`;
      if (!isNaN(min)) ddmString += ` ${min}'`;
      if (direction) ddmString += ` ${direction}`;
      
      return ddmString.trim();
    } catch (e) {
      console.error("Error formatting DDM components", e);
      return "";
    }
  };
  
  // Handle DMS input changes
  const handleDMSChange = (isLatitude: boolean) => {
    try {
      if (isLatitude) {
        const dmsString = formatDMSComponents(latDegrees, latMinutes, latSeconds, latDirection);
        if (dmsString) {
          handleGpsCoordinateChange(dmsString, longValue);
        }
      } else {
        const dmsString = formatDMSComponents(longDegrees, longMinutes, longSeconds, longDirection);
        if (dmsString) {
          handleGpsCoordinateChange(latValue, dmsString);
        }
      }
    } catch (e) {
      console.error("Error in DMS change handler", e);
    }
  };
  
  // Handle DDM input changes
  const handleDDMChange = (isLatitude: boolean) => {
    try {
      if (isLatitude) {
        const ddmString = formatDDMComponents(latDegrees, latMinutes, latDirection);
        if (ddmString) {
          handleGpsCoordinateChange(ddmString, longValue);
        }
      } else {
        const ddmString = formatDDMComponents(longDegrees, longMinutes, longDirection);
        if (ddmString) {
          handleGpsCoordinateChange(latValue, ddmString);
        }
      }
    } catch (e) {
      console.error("Error in DDM change handler", e);
    }
  };

  // Render GPS coordinate inputs when appropriate
  if (category === "gps_coordinates") {
    return (
      <div className="mb-4 w-full">
        <div className="w-full">
          <label className="block text-sm font-medium text-appwhite/80 mb-1">
            {label}
          </label>
          <div className="flex flex-col gap-2">
            {/* Latitude Inputs */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-appwhite/80">Latitude:</label>
              
              {unit === "decimal_degrees" && (
                // Single input for decimal degrees
                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={latValue}
                      onChange={(e) => {
                        const newLat = e.target.value;
                        handleGpsCoordinateChange(newLat, longValue);
                      }}
                      placeholder="Decimal degrees (e.g. 40.7128)"
                      readOnly={readOnly}
                      className="input-field"
                    />
                  </div>
                </div>
              )}
              
              {unit === "degrees_minutes_seconds" && (
                // Multiple inputs for DMS format
                <div className="flex items-center gap-1">
                  <div className="w-1/5">
                    <input
                      type="text"
                      value={latDegrees}
                      onChange={(e) => {
                        setLatDegrees(e.target.value);
                        handleDMSChange(true);
                      }}
                      placeholder="Degrees"
                      readOnly={readOnly}
                      className="input-field text-center"
                    />
                    <span className="text-xs text-center block">°</span>
                  </div>
                  <div className="w-1/5">
                    <input
                      type="text"
                      value={latMinutes}
                      onChange={(e) => {
                        setLatMinutes(e.target.value);
                        handleDMSChange(true);
                      }}
                      placeholder="Min"
                      readOnly={readOnly}
                      className="input-field text-center"
                    />
                    <span className="text-xs text-center block">'</span>
                  </div>
                  <div className="w-1/5">
                    <input
                      type="text"
                      value={latSeconds}
                      onChange={(e) => {
                        setLatSeconds(e.target.value);
                        handleDMSChange(true);
                      }}
                      placeholder="Sec"
                      readOnly={readOnly}
                      className="input-field text-center"
                    />
                    <span className="text-xs text-center block">"</span>
                  </div>
                  <div className="w-1/5">
                    <select
                      value={latDirection}
                      onChange={(e) => {
                        setLatDirection(e.target.value);
                        handleDMSChange(true);
                      }}
                      disabled={readOnly}
                      className="input-field text-center"
                    >
                      <option value="N">N</option>
                      <option value="S">S</option>
                    </select>
                  </div>
                </div>
              )}
              
              {unit === "degrees_decimal_minutes" && (
                // Multiple inputs for DDM format
                <div className="flex items-center gap-1">
                  <div className="w-1/4">
                    <input
                      type="text"
                      value={latDegrees}
                      onChange={(e) => {
                        setLatDegrees(e.target.value);
                        handleDDMChange(true);
                      }}
                      placeholder="Degrees"
                      readOnly={readOnly}
                      className="input-field text-center"
                    />
                    <span className="text-xs text-center block">°</span>
                  </div>
                  <div className="w-2/5">
                    <input
                      type="text"
                      value={latMinutes}
                      onChange={(e) => {
                        setLatMinutes(e.target.value);
                        handleDDMChange(true);
                      }}
                      placeholder="Decimal Min"
                      readOnly={readOnly}
                      className="input-field text-center"
                    />
                    <span className="text-xs text-center block">'</span>
                  </div>
                  <div className="w-1/4">
                    <select
                      value={latDirection}
                      onChange={(e) => {
                        setLatDirection(e.target.value);
                        handleDDMChange(true);
                      }}
                      disabled={readOnly}
                      className="input-field text-center"
                    >
                      <option value="N">N</option>
                      <option value="S">S</option>
                    </select>
                  </div>
                </div>
              )}
              
              {/* Other formats that aren't DMS or DDM can use the single input */}
              {unit !== "decimal_degrees" && unit !== "degrees_minutes_seconds" && unit !== "degrees_decimal_minutes" && (
                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={latValue}
                      onChange={(e) => {
                        const newLat = e.target.value;
                        handleGpsCoordinateChange(newLat, longValue);
                      }}
                      placeholder="Latitude"
                      readOnly={readOnly}
                      className="input-field"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Longitude Inputs */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-appwhite/80">Longitude:</label>
              
              {unit === "decimal_degrees" && (
                // Single input for decimal degrees
                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={longValue}
                      onChange={(e) => {
                        const newLong = e.target.value;
                        handleGpsCoordinateChange(latValue, newLong);
                      }}
                      placeholder="Decimal degrees (e.g. -74.0060)"
                      readOnly={readOnly}
                      className="input-field"
                    />
                  </div>
                </div>
              )}
              
              {unit === "degrees_minutes_seconds" && (
                // Multiple inputs for DMS format
                <div className="flex items-center gap-1">
                  <div className="w-1/5">
                    <input
                      type="text"
                      value={longDegrees}
                      onChange={(e) => {
                        setLongDegrees(e.target.value);
                        handleDMSChange(false);
                      }}
                      placeholder="Degrees"
                      readOnly={readOnly}
                      className="input-field text-center"
                    />
                    <span className="text-xs text-center block">°</span>
                  </div>
                  <div className="w-1/5">
                    <input
                      type="text"
                      value={longMinutes}
                      onChange={(e) => {
                        setLongMinutes(e.target.value);
                        handleDMSChange(false);
                      }}
                      placeholder="Min"
                      readOnly={readOnly}
                      className="input-field text-center"
                    />
                    <span className="text-xs text-center block">'</span>
                  </div>
                  <div className="w-1/5">
                    <input
                      type="text"
                      value={longSeconds}
                      onChange={(e) => {
                        setLongSeconds(e.target.value);
                        handleDMSChange(false);
                      }}
                      placeholder="Sec"
                      readOnly={readOnly}
                      className="input-field text-center"
                    />
                    <span className="text-xs text-center block">"</span>
                  </div>
                  <div className="w-1/5">
                    <select
                      value={longDirection}
                      onChange={(e) => {
                        setLongDirection(e.target.value);
                        handleDMSChange(false);
                      }}
                      disabled={readOnly}
                      className="input-field text-center"
                    >
                      <option value="E">E</option>
                      <option value="W">W</option>
                    </select>
                  </div>
                </div>
              )}
              
              {unit === "degrees_decimal_minutes" && (
                // Multiple inputs for DDM format
                <div className="flex items-center gap-1">
                  <div className="w-1/4">
                    <input
                      type="text"
                      value={longDegrees}
                      onChange={(e) => {
                        setLongDegrees(e.target.value);
                        handleDDMChange(false);
                      }}
                      placeholder="Degrees"
                      readOnly={readOnly}
                      className="input-field text-center"
                    />
                    <span className="text-xs text-center block">°</span>
                  </div>
                  <div className="w-2/5">
                    <input
                      type="text"
                      value={longMinutes}
                      onChange={(e) => {
                        setLongMinutes(e.target.value);
                        handleDDMChange(false);
                      }}
                      placeholder="Decimal Min"
                      readOnly={readOnly}
                      className="input-field text-center"
                    />
                    <span className="text-xs text-center block">'</span>
                  </div>
                  <div className="w-1/4">
                    <select
                      value={longDirection}
                      onChange={(e) => {
                        setLongDirection(e.target.value);
                        handleDDMChange(false);
                      }}
                      disabled={readOnly}
                      className="input-field text-center"
                    >
                      <option value="E">E</option>
                      <option value="W">W</option>
                    </select>
                  </div>
                </div>
              )}
              
              {/* Other formats that aren't DMS or DDM can use the single input */}
              {unit !== "decimal_degrees" && unit !== "degrees_minutes_seconds" && unit !== "degrees_decimal_minutes" && (
                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={longValue}
                      onChange={(e) => {
                        const newLong = e.target.value;
                        handleGpsCoordinateChange(latValue, newLong);
                      }}
                      placeholder="Longitude"
                      readOnly={readOnly}
                      className="input-field"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <UnitSelector
          category={category}
          value={unit}
          onChange={onUnitChange}
          label="Unit"
          id={`${label.toLowerCase()}-unit-selector`}
        />
      </div>
    );
  }

  // Standard render for non-GPS inputs
  return (
    <div className="mb-4 w-full">
      <div className="w-full">
        <label className="block text-sm font-medium text-appwhite/80 mb-1">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-grow">
            <input
              type="text"
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={placeholder}
              readOnly={readOnly}
              className="input-field"
            />
          </div>
        </div>
      </div>
      <UnitSelector
        category={category}
        value={unit}
        onChange={onUnitChange}
        label="Unit"
        id={`${label.toLowerCase()}-unit-selector`}
      />
    </div>
  );
};

export default ConversionInput;
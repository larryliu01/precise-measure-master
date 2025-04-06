export interface Formula {
  name: string;
  description: string;
  inputs: FormInput[];
  calculate: (inputs: Record<string, number>, unitSelections?: Record<string, string>) => {
    result: number;
    unit: string;
  };
}

export interface FormInput {
  id: string;
  label: string;
  placeholder: string;
  unit: string;
  defaultValue?: number;
  units?: Array<{ value: string; label: string; }>;
}

export const commonFormulas: Formula[] = [
  {
    name: "Compound Interest Calculator",
    description: "Calculate the future value of an investment with compound interest",
    inputs: [
      { id: "principal", label: "Principal Amount", placeholder: "Enter initial amount", unit: "$", defaultValue: 0 },
      { id: "rate", label: "Annual Interest Rate", placeholder: "Enter interest rate", unit: "%", defaultValue: 0 },
      { id: "time", label: "Time Period", placeholder: "Enter time", unit: "years", defaultValue: 0 },
      { 
        id: "frequency", 
        label: "Compounding Frequency", 
        placeholder: "Enter frequency", 
        unit: "yearly",
        defaultValue: 1,
        units: [
          { value: "1", label: "Yearly" },
          { value: "2", label: "Semi-annually" },
          { value: "4", label: "Quarterly" },
          { value: "12", label: "Monthly" },
          { value: "365", label: "Daily" }
        ]
      }
    ],
    calculate: (inputs, unitSelections = {}) => {
      // Ensure all inputs are treated as numbers
      const principal = Number(inputs.principal || 0);
      const rate = Number(inputs.rate || 0);
      const time = Number(inputs.time || 0);
      let frequency = Number(inputs.frequency || 1);
      
      const r = rate / 100; // convert percentage to decimal
      const n = frequency; // compounding frequency
      const t = time; // time in years
      
      // Compound interest formula: A = P(1 + r/n)^(nt)
      const amount = principal * Math.pow(1 + (r / n), n * t);
      
      return { result: parseFloat(amount.toFixed(2)), unit: "$" };
    }
  },
  {
    name: "Distance, Speed & Time Calculator",
    description: "Calculate distance, speed, or time based on the other two values",
    inputs: [
      { 
        id: "calculation", 
        label: "Calculate", 
        placeholder: "Select calculation", 
        unit: "distance",
        defaultValue: 0,
        units: [
          { value: "distance", label: "Distance" },
          { value: "speed", label: "Speed" },
          { value: "time", label: "Time" }
        ]
      },
      { 
        id: "distance", 
        label: "Distance", 
        placeholder: "Enter distance", 
        unit: "km",
        defaultValue: 0,
        units: [
          { value: "km", label: "kilometers" },
          { value: "miles", label: "miles" },
          { value: "m", label: "meters" }
        ]
      },
      { 
        id: "speed", 
        label: "Speed", 
        placeholder: "Enter speed", 
        unit: "km/h",
        defaultValue: 0,
        units: [
          { value: "km/h", label: "km/hour" },
          { value: "mph", label: "miles/hour" },
          { value: "m/s", label: "meters/second" }
        ]
      },
      { 
        id: "time", 
        label: "Time", 
        placeholder: "Enter time", 
        unit: "hours",
        defaultValue: 0,
        units: [
          { value: "hours", label: "hours" },
          { value: "minutes", label: "minutes" },
          { value: "seconds", label: "seconds" }
        ]
      }
    ],
    calculate: (inputs, unitSelections = {}) => {
      // Ensure all inputs are treated as numbers
      let distance = Number(inputs.distance || 0);
      let speed = Number(inputs.speed || 0);
      let time = Number(inputs.time || 0);
      const calculationType = String(inputs.calculation || "distance");
      
      // Normalize units to kilometers, km/h, and hours for calculation
      
      // Convert distance
      if (unitSelections.distance && unitSelections.distance === "miles") {
        distance = distance * 1.60934; // miles to km
      } else if (unitSelections.distance && unitSelections.distance === "m") {
        distance = distance / 1000; // m to km
      }
      
      // Convert speed
      if (unitSelections.speed && unitSelections.speed === "mph") {
        speed = speed * 1.60934; // mph to km/h
      } else if (unitSelections.speed && unitSelections.speed === "m/s") {
        speed = speed * 3.6; // m/s to km/h
      }
      
      // Convert time
      if (unitSelections.time && unitSelections.time === "minutes") {
        time = time / 60; // minutes to hours
      } else if (unitSelections.time && unitSelections.time === "seconds") {
        time = time / 3600; // seconds to hours
      }
      
      let result: number;
      let unit: string;
      
      // Calculate based on what's requested
      if (calculationType === "distance") {
        result = speed * time;
        unit = unitSelections.distance || "km";
        
        // Convert result back to selected unit
        if (unit === "miles") {
          result = result / 1.60934; // km to miles
        } else if (unit === "m") {
          result = result * 1000; // km to m
        }
      } else if (calculationType === "speed") {
        result = distance / time;
        unit = unitSelections.speed || "km/h";
        
        // Convert result back to selected unit
        if (unit === "mph") {
          result = result / 1.60934; // km/h to mph
        } else if (unit === "m/s") {
          result = result / 3.6; // km/h to m/s
        }
      } else { // time
        result = distance / speed;
        unit = unitSelections.time || "hours";
        
        // Convert result back to selected unit
        if (unit === "minutes") {
          result = result * 60; // hours to minutes
        } else if (unit === "seconds") {
          result = result * 3600; // hours to seconds
        }
      }
      
      return { result: parseFloat(result.toFixed(2)), unit };
    }
  },
  {
    name: "Ohm's Law Calculator",
    description: "Calculate voltage, current, or resistance using Ohm's Law",
    inputs: [
      { 
        id: "calculation", 
        label: "Calculate", 
        placeholder: "Select calculation", 
        unit: "voltage",
        defaultValue: 0,
        units: [
          { value: "voltage", label: "Voltage" },
          { value: "current", label: "Current" },
          { value: "resistance", label: "Resistance" }
        ]
      },
      { id: "voltage", label: "Voltage", placeholder: "Enter voltage", unit: "V", defaultValue: 0 },
      { id: "current", label: "Current", placeholder: "Enter current", unit: "A", defaultValue: 0 },
      { id: "resistance", label: "Resistance", placeholder: "Enter resistance", unit: "Ω", defaultValue: 0 }
    ],
    calculate: (inputs) => {
      // Ensure all inputs are treated as numbers
      const voltage = Number(inputs.voltage || 0);
      const current = Number(inputs.current || 0);
      const resistance = Number(inputs.resistance || 0);
      const calculationType = String(inputs.calculation || "voltage");
      
      let result: number;
      let unit: string;
      
      // Ohm's law: V = I × R (Voltage = Current × Resistance)
      if (calculationType === "voltage") {
        result = current * resistance;
        unit = "V";
      } else if (calculationType === "current") {
        result = voltage / resistance;
        unit = "A";
      } else { // resistance
        result = voltage / current;
        unit = "Ω";
      }
      
      return { result: parseFloat(result.toFixed(3)), unit };
    }
  },
  {
    name: "Fuel Cost for a Trip",
    description: "Calculate how much you'll spend on fuel for a trip",
    inputs: [
      { 
        id: "distance", 
        label: "Distance", 
        placeholder: "Enter distance", 
        unit: "miles",
        units: [
          { value: "miles", label: "miles" },
          { value: "km", label: "kilometers" }
        ] 
      },
      { 
        id: "fuelEfficiency", 
        label: "Fuel Efficiency", 
        placeholder: "Enter efficiency", 
        unit: "mpg",
        units: [
          { value: "mpg", label: "miles/gallon" },
          { value: "kpl", label: "km/liter" },
          { value: "l/100km", label: "liters/100km" }
        ] 
      },
      { 
        id: "fuelPrice", 
        label: "Fuel Price", 
        placeholder: "Enter price", 
        unit: "$/gallon",
        units: [
          { value: "$/gallon", label: "$/gallon" },
          { value: "$/liter", label: "$/liter" }
        ] 
      }
    ],
    calculate: (inputs, unitSelections = {}) => {
      let { distance, fuelEfficiency, fuelPrice } = inputs;
      
      // Convert distance if needed
      if (unitSelections.distance === "km") {
        distance = distance * 0.621371; // Convert km to miles
      }
      
      // Convert fuel efficiency if needed
      if (unitSelections.fuelEfficiency === "kpl") {
        fuelEfficiency = fuelEfficiency * 2.352145833; // Convert km/liter to mpg
      } else if (unitSelections.fuelEfficiency === "l/100km") {
        fuelEfficiency = 235.214583 / fuelEfficiency; // Convert l/100km to mpg
      }
      
      // Convert fuel price if needed
      if (unitSelections.fuelPrice === "$/liter") {
        fuelPrice = fuelPrice * 3.78541; // Convert $/liter to $/gallon
      }
      
      // Calculate with all values normalized to miles, mpg, and $/gallon
      const gallons = distance / fuelEfficiency;
      const cost = gallons * fuelPrice;
      return { result: parseFloat(cost.toFixed(2)), unit: "$" };
    }
  },
  {
    name: "Tip Calculator",
    description: "Calculate tip amount and total bill",
    inputs: [
      { id: "billAmount", label: "Bill Amount", placeholder: "Enter bill amount", unit: "$" },
      { id: "tipPercentage", label: "Tip Percentage", placeholder: "Enter tip percentage", unit: "%", defaultValue: 15 }
    ],
    calculate: (inputs) => {
      const tipAmount = inputs.billAmount * (inputs.tipPercentage / 100);
      const total = inputs.billAmount + tipAmount;
      return { result: parseFloat(total.toFixed(2)), unit: "$" };
    }
  },
  {
    name: "Sales Tax Calculator",
    description: "Calculate final price with sales tax",
    inputs: [
      { id: "price", label: "Price before tax", placeholder: "Enter price", unit: "$" },
      { id: "taxRate", label: "Tax Rate", placeholder: "Enter tax rate", unit: "%", defaultValue: 7 }
    ],
    calculate: (inputs) => {
      const tax = inputs.price * (inputs.taxRate / 100);
      const total = inputs.price + tax;
      return { result: parseFloat(total.toFixed(2)), unit: "$" };
    }
  },
  {
    name: "Discount Calculator",
    description: "Calculate final price after discount",
    inputs: [
      { id: "originalPrice", label: "Original Price", placeholder: "Enter original price", unit: "$" },
      { id: "discountPercentage", label: "Discount Percentage", placeholder: "Enter discount", unit: "%" }
    ],
    calculate: (inputs) => {
      const discount = inputs.originalPrice * (inputs.discountPercentage / 100);
      const finalPrice = inputs.originalPrice - discount;
      return { result: parseFloat(finalPrice.toFixed(2)), unit: "$" };
    }
  },
  {
    name: "Mortgage Payment",
    description: "Calculate monthly mortgage payment",
    inputs: [
      { id: "loanAmount", label: "Loan Amount", placeholder: "Enter loan amount", unit: "$" },
      { id: "interestRate", label: "Annual Interest Rate", placeholder: "Enter interest rate", unit: "%" },
      { id: "loanTerm", label: "Loan Term", placeholder: "Enter years", unit: "years" }
    ],
    calculate: (inputs) => {
      const monthlyRate = inputs.interestRate / 100 / 12;
      const numberOfPayments = inputs.loanTerm * 12;
      const payment = (inputs.loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
      return { result: parseFloat(payment.toFixed(2)), unit: "$/month" };
    }
  },
  {
    name: "Body Mass Index (BMI)",
    description: "Calculate BMI based on height and weight",
    inputs: [
      { id: "weight", label: "Weight", placeholder: "Enter weight", unit: "kg" },
      { id: "height", label: "Height", placeholder: "Enter height", unit: "m" }
    ],
    calculate: (inputs) => {
      const bmi = inputs.weight / (inputs.height * inputs.height);
      return { result: parseFloat(bmi.toFixed(1)), unit: "kg/m²" };
    }
  },
  {
    name: "Time to Destination",
    description: "Calculate arrival time based on speed and distance",
    inputs: [
      { id: "distance", label: "Distance", placeholder: "Enter distance", unit: "miles" },
      { id: "speed", label: "Average Speed", placeholder: "Enter speed", unit: "mph" }
    ],
    calculate: (inputs) => {
      const hours = inputs.distance / inputs.speed;
      return { result: parseFloat(hours.toFixed(2)), unit: "hours" };
    }
  },
  {
    name: "Unit Price Comparison",
    description: "Compare price per unit of two products",
    inputs: [
      { id: "price1", label: "Price of Item 1", placeholder: "Enter price 1", unit: "$" },
      { id: "quantity1", label: "Quantity of Item 1", placeholder: "Enter quantity 1", unit: "units" },
      { id: "price2", label: "Price of Item 2", placeholder: "Enter price 2", unit: "$" },
      { id: "quantity2", label: "Quantity of Item 2", placeholder: "Enter quantity 2", unit: "units" }
    ],
    calculate: (inputs) => {
      const unitPrice1 = inputs.price1 / inputs.quantity1;
      const unitPrice2 = inputs.price2 / inputs.quantity2;
      const savings = ((unitPrice1 - unitPrice2) / unitPrice1) * 100;
      return { result: parseFloat(savings.toFixed(2)), unit: "% savings" };
    }
  },
  {
    name: "Electricity Cost",
    description: "Calculate the cost of electricity for an appliance",
    inputs: [
      { id: "power", label: "Power Consumption", placeholder: "Enter power", unit: "watts" },
      { id: "hours", label: "Hours Used Per Day", placeholder: "Enter hours", unit: "hours" },
      { id: "rate", label: "Electricity Rate", placeholder: "Enter rate", unit: "$/kWh", defaultValue: 0.12 }
    ],
    calculate: (inputs) => {
      const kWh = (inputs.power / 1000) * inputs.hours * 30; // monthly usage
      const monthlyCost = kWh * inputs.rate;
      return { result: parseFloat(monthlyCost.toFixed(2)), unit: "$/month" };
    }
  }
];

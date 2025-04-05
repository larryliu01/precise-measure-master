
export interface Formula {
  name: string;
  description: string;
  inputs: FormInput[];
  calculate: (inputs: Record<string, number>) => {
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
}

export const commonFormulas: Formula[] = [
  {
    name: "Fuel Cost for a Trip",
    description: "Calculate how much you'll spend on fuel for a trip",
    inputs: [
      { id: "distance", label: "Distance", placeholder: "Enter distance", unit: "miles" },
      { id: "fuelEfficiency", label: "Fuel Efficiency", placeholder: "Enter MPG", unit: "mpg" },
      { id: "fuelPrice", label: "Fuel Price", placeholder: "Enter price per gallon", unit: "$/gallon" }
    ],
    calculate: (inputs) => {
      const gallons = inputs.distance / inputs.fuelEfficiency;
      const cost = gallons * inputs.fuelPrice;
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

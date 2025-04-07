import React, { useState, useEffect } from 'react';
import { useExchangeRates, fetchExchangeRates } from '../utils/currencyService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowDownUp, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Common currency symbols/codes
const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
];

// Keys for localStorage
const STORAGE_KEYS = {
  FROM_CURRENCY: 'currency_fromCurrency',
  TO_CURRENCY: 'currency_toCurrency',
  AMOUNT: 'currency_amount'
};

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AMOUNT);
    return saved || '1';
  });
  
  const [fromCurrency, setFromCurrency] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FROM_CURRENCY);
    return saved || 'USD';
  });
  
  const [toCurrency, setToCurrency] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TO_CURRENCY);
    return saved || 'EUR';
  });
  
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  // Save selections to localStorage when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FROM_CURRENCY, fromCurrency);
  }, [fromCurrency]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TO_CURRENCY, toCurrency);
  }, [toCurrency]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AMOUNT, amount);
  }, [amount]);
  
  // Fetch real-time exchange rates
  const { rates, loading: apiLoading, error } = useExchangeRates(fromCurrency);
  
  useEffect(() => {
    // Update last updated timestamp
    if (rates) {
      const now = new Date();
      setLastUpdated(now.toLocaleDateString() + ' ' + now.toLocaleTimeString());
    }
  }, [rates]);

  // Convert currency when rates, amount, or currency selections change
  useEffect(() => {
    if (rates && amount && !isNaN(Number(amount))) {
      const rate = toCurrency === fromCurrency ? 1 : rates[toCurrency];
      
      if (rate) {
        const result = parseFloat(amount) * rate;
        // Format with appropriate decimals
        const formatted = result.toLocaleString('en-US', { 
          minimumFractionDigits: 2,
          maximumFractionDigits: 6 
        });
        setConvertedAmount(formatted);
      }
    }
  }, [rates, amount, fromCurrency, toCurrency]);

  // Handle swapping currencies
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Format for display
  const getDisplayAmount = (curr: string, amt: string) => {
    const currency = currencies.find(c => c.code === curr);
    return currency ? `${currency.symbol}${amt}` : `${amt} ${curr}`;
  };

  // Handle manual refresh of rates
  const handleRefresh = async () => {
    try {
      setLoading(true);
      // Re-fetch the exchange rates
      const data = await fetchExchangeRates(fromCurrency);
      
      // Update the timestamp
      const now = new Date();
      setLastUpdated(now.toLocaleDateString() + ' ' + now.toLocaleTimeString());
      
      // Toast notification could be added here
    } catch (err) {
      console.error('Error refreshing rates:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get currency display for trigger
  const getCurrencyDisplay = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? (
      <div className="flex items-center">
        <span className="mr-1">{currency.symbol}</span>
        <span>{currency.code}</span>
      </div>
    ) : "Currency";
  };

  return (
    <div className="conversion-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-appwhite">Currency Exchange</h2>
        <div className="flex items-center text-sm text-appwhite/60 bg-appblue-dark/40 rounded-full px-3 py-1 border border-appwhite/10">
          <span className="mr-2">{loading || apiLoading ? 'Updating...' : `Updated: ${lastUpdated}`}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-appwhite hover:text-appcyan transition-colors"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "animate-spin-slow" : ""} />
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-3 mb-4 bg-red-500/20 border border-red-500/50 rounded-lg text-appwhite text-sm">
          Error loading exchange rates. Using cached rates if available.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* From Currency */}
        <div className="glass-card p-4">
          <label htmlFor="fromAmount" className="block text-sm font-medium text-appwhite/80 mb-2">
            From
          </label>
          <div className="flex gap-2">
            <input
              id="fromAmount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field flex-1"
              placeholder="Enter amount"
              min="0"
            />
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-32 bg-appblue-dark/30 text-appwhite border-2 border-appcyan/30 shadow-inner shadow-appcyan/20 glowing-focus outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Currency">
                  {getCurrencyDisplay(fromCurrency)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-appblue-light/90 backdrop-blur-md text-appwhite border-appwhite/20 max-h-60">
                {currencies.map((currency) => (
                  <SelectItem 
                    key={currency.code} 
                    value={currency.code}
                    className="cursor-pointer hover:bg-appblue-dark"
                  >
                    <div className="flex items-center">
                      <span className="mr-2 text-appcyan">{currency.symbol}</span>
                      <span>{currency.code} - {currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center -my-4 relative z-10">
          <button
            onClick={handleSwap}
            className="bg-gradient-to-r from-appcyan/10 to-accent/10 backdrop-blur-sm p-2 rounded-full border border-appwhite/20 shadow-lg hover:shadow-appcyan/20 transition-all duration-300 hover:scale-110 group"
            aria-label="Swap currencies"
          >
            <ArrowDownUp className="h-5 w-5 text-appcyan group-hover:text-accent transition-colors" />
          </button>
        </div>

        {/* To Currency */}
        <div className="glass-card p-4">
          <label htmlFor="toAmount" className="block text-sm font-medium text-appwhite/80 mb-2">
            To
          </label>
          <div className="flex gap-2">
            {loading || apiLoading ? (
              <Skeleton className="h-10 flex-1 bg-appblue-light/50" />
            ) : (
              <input
                id="toAmount"
                type="text"
                value={convertedAmount}
                readOnly
                className="input-field flex-1 bg-appblue-light/50"
              />
            )}
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-32 bg-appblue-dark/30 text-appwhite border-2 border-appcyan/30 shadow-inner shadow-appcyan/20 glowing-focus outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Currency">
                  {getCurrencyDisplay(toCurrency)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-appblue-light/90 backdrop-blur-md text-appwhite border-appwhite/20 max-h-60">
                {currencies.map((currency) => (
                  <SelectItem 
                    key={currency.code} 
                    value={currency.code}
                    className="cursor-pointer hover:bg-appblue-dark"
                  >
                    <div className="flex items-center">
                      <span className="mr-2 text-appcyan">{currency.symbol}</span>
                      <span>{currency.code} - {currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {rates && !loading && (
        <div className="mt-6 p-4 bg-appblue-light/20 rounded-lg border border-appwhite/10">
          <p className="text-sm text-appwhite/70 mb-1">Current Exchange Rate:</p>
          <p className="text-md text-appwhite flex items-center">
            <span className="text-appcyan mr-1">1 {fromCurrency}</span> = 
            <span className="ml-1 text-accent">{rates[toCurrency]?.toFixed(6) || '—'} {toCurrency}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter; 
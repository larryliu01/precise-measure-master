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
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
];

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
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

  return (
    <div className="conversion-card p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-appwhite">Currency Exchange</h2>
        <div className="flex items-center text-sm text-appwhite/60">
          <span className="mr-2">{loading || apiLoading ? 'Updating...' : `Updated: ${lastUpdated}`}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-appwhite"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-2 mb-4 bg-red-500/20 border border-red-500/50 rounded-md text-appwhite">
          Error loading exchange rates. Using cached rates if available.
        </div>
      )}

      <div className="form-section mb-4">
        <div className="grid grid-cols-1 gap-6 mb-4">
          {/* From Currency */}
          <div>
            <label htmlFor="fromAmount" className="block text-sm font-medium text-appwhite/80 mb-1">
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
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent className="bg-appblue-light text-appwhite border-appwhite/20">
                  {currencies.map((currency) => (
                    <SelectItem 
                      key={currency.code} 
                      value={currency.code}
                      className="cursor-pointer hover:bg-appblue-dark"
                    >
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* To Currency */}
          <div>
            <label htmlFor="toAmount" className="block text-sm font-medium text-appwhite/80 mb-1">
              To
            </label>
            <div className="flex gap-2">
              {loading || apiLoading ? (
                <Skeleton className="h-10 flex-1 bg-appblue-light" />
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
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent className="bg-appblue-light text-appwhite border-appwhite/20">
                  {currencies.map((currency) => (
                    <SelectItem 
                      key={currency.code} 
                      value={currency.code}
                      className="cursor-pointer hover:bg-appblue-dark"
                    >
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <button
            onClick={handleSwap}
            className="secondary-button"
            aria-label="Swap currencies"
          >
            <ArrowDownUp className="h-5 w-5 mr-2" />
            Swap
          </button>
        </div>
      </div>

      {rates && !loading && (
        <div className="mt-4 p-4 bg-appblue-dark/30 rounded-lg border border-appwhite/10 backdrop-blur-sm">
          <p className="text-sm text-appwhite/70 mb-1">Exchange Rate:</p>
          <p className="text-md text-appwhite">
            1 {fromCurrency} = {rates[toCurrency]?.toFixed(6) || '—'} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter; 
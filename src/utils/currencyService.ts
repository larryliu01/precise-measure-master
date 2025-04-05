import { useEffect, useState } from 'react';

// Exchange rate cache structure
interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

// Cache will be stored here
let exchangeRatesCache: ExchangeRates | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Function to fetch current exchange rates
export const fetchExchangeRates = async (baseCurrency: string = 'USD'): Promise<ExchangeRates> => {
  // Check if we have valid cached data
  const now = Date.now();
  if (
    exchangeRatesCache &&
    exchangeRatesCache.base === baseCurrency &&
    now - exchangeRatesCache.timestamp < CACHE_DURATION
  ) {
    return exchangeRatesCache;
  }

  try {
    // Use the ExchangeRate-API (free open API)
    const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    
    const data = await response.json();
    
    // Update the cache
    exchangeRatesCache = {
      base: baseCurrency,
      rates: data.rates,
      timestamp: now
    };
    
    return exchangeRatesCache;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    
    // If we have any cached data, return it as fallback
    if (exchangeRatesCache) {
      return exchangeRatesCache;
    }
    
    // Otherwise throw the error
    throw error;
  }
};

// React hook for using exchange rates in components
export const useExchangeRates = (baseCurrency: string = 'USD') => {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getRates = async () => {
      try {
        setLoading(true);
        const data = await fetchExchangeRates(baseCurrency);
        setRates(data.rates);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error fetching rates'));
      } finally {
        setLoading(false);
      }
    };

    getRates();
  }, [baseCurrency]);

  return { rates, loading, error };
}; 
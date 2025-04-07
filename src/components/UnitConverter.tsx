import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CategorySelector from './CategorySelector';
import ConversionCard from './ConversionCard';
import CurrencyConverter from './CurrencyConverter';
import Calculator from './Calculator';
import { conversionCategories } from '../utils/conversion';
import Footer from './Footer';
import { Sparkles } from 'lucide-react';

// Keys for localStorage
const STORAGE_KEYS = {
  SELECTED_CATEGORY: 'unitConverter_selectedCategory',
  SELECTED_TAB: 'unitConverter_selectedTab',
  RECENT_CATEGORIES: 'unitConverter_recentCategories'
};

const UnitConverter: React.FC = () => {
  // Initialize state from localStorage or default values
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_CATEGORY);
    return saved && Object.keys(conversionCategories).includes(saved) ? saved : 'length';
  });
  
  const [selectedTab, setSelectedTab] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_TAB);
    return saved || 'units';
  });
  
  const [recentCategories, setRecentCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RECENT_CATEGORIES);
    return saved ? JSON.parse(saved) : [];
  });

  // Update recent categories when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      setRecentCategories((prev) => {
        // Remove the selected category if it exists
        const filtered = prev.filter((cat) => cat !== selectedCategory);
        // Add it to the beginning
        const updated = [selectedCategory, ...filtered].slice(0, 3);
        
        // Save to localStorage
        localStorage.setItem(STORAGE_KEYS.RECENT_CATEGORIES, JSON.stringify(updated));
        return updated;
      });
    }
  }, [selectedCategory]);
  
  // Save selected category to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_CATEGORY, selectedCategory);
  }, [selectedCategory]);
  
  // Handle tab change and save to localStorage
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    localStorage.setItem(STORAGE_KEYS.SELECTED_TAB, value);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 max-w-4xl mx-auto">
      <header className="text-center mb-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-24 bg-gradient-radial from-appcyan/10 to-transparent opacity-70 blur-xl -z-10"></div>
        
        <div className="inline-flex items-center justify-center mb-2">
          <Sparkles className="h-5 w-5 mr-2 text-appcyan animate-pulse-glow" />
          <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-appcyan-light via-appcyan to-accent bg-clip-text text-transparent">
            Precision Unit Converter
          </h1>
        </div>
        
        <p className="text-sm text-appwhite/60 max-w-lg mx-auto">
          Convert units with precision and ease
        </p>
      </header>

      <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full mb-6">
        <TabsList className="grid grid-cols-3 mb-6 bg-appblue-dark/40 border border-appwhite/10 p-1 rounded-lg">
          <TabsTrigger 
            value="units" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-appcyan/80 data-[state=active]:to-accent/80 data-[state=active]:text-appblue rounded-md data-[state=active]:shadow-md">
            Unit Conversion
          </TabsTrigger>
          <TabsTrigger 
            value="currency"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-appcyan/80 data-[state=active]:to-accent/80 data-[state=active]:text-appblue rounded-md data-[state=active]:shadow-md">
            Currency
          </TabsTrigger>
          <TabsTrigger 
            value="calculator"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-appcyan/80 data-[state=active]:to-accent/80 data-[state=active]:text-appblue rounded-md data-[state=active]:shadow-md">
            Calculation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="units" className="space-y-6">
          <div className="mb-6">
            <CategorySelector
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <div className="mb-8">
            <ConversionCard category={selectedCategory} />
          </div>

          {recentCategories.length > 1 && (
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-3 text-appwhite">Recently Used</h2>
              <div className="flex flex-wrap gap-2">
                {recentCategories.filter(cat => cat !== selectedCategory).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="category-button"
                  >
                    {conversionCategories[category].name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3 text-appwhite">Tips</h2>
            <div className="unit-card">
              <ul className="list-disc list-inside text-appwhite/80 space-y-2">
                <li>For length conversions, you can enter values like "5ft 3in" or "5'3"</li>
                <li>For time conversions, you can enter values like "2h 30min 15s" or "1d 6h"</li>
                <li>Time units support: s (seconds), min (minutes), h (hours), d (days), wk (weeks), mo (months), yr (years)</li>
                <li>Use the swap button to reverse the conversion direction</li>
                <li>All conversions happen in real-time as you type</li>
                <li>Your recently used measurement types appear below the converter</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="currency" className="space-y-6">
          <div className="mb-8">
            <CurrencyConverter />
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3 text-appwhite">Currency Exchange Tips</h2>
            <div className="unit-card">
              <ul className="list-disc list-inside text-appwhite/80 space-y-2">
                <li>Exchange rates are updated from the internet in real-time</li>
                <li>Use the swap button to reverse the conversion direction</li>
                <li>The refresh button updates to the latest exchange rates</li>
                <li>Rates are cached for one hour to minimize API calls</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="calculator" className="space-y-6">
          <Calculator />
        </TabsContent>
      </Tabs>

      <Footer />
    </div>
  );
};

export default UnitConverter;

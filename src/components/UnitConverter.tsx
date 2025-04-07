import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CategorySelector from './CategorySelector';
import ConversionCard from './ConversionCard';
import CurrencyConverter from './CurrencyConverter';
import Calculator from './Calculator';
import { conversionCategories } from '../utils/conversion';
import Footer from './Footer';
import { Sparkles } from 'lucide-react';

const UnitConverter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('length');
  const [recentCategories, setRecentCategories] = useState<string[]>([]);

  // Update recent categories when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      setRecentCategories((prev) => {
        // Remove the selected category if it exists
        const filtered = prev.filter((cat) => cat !== selectedCategory);
        // Add it to the beginning
        return [selectedCategory, ...filtered].slice(0, 3);
      });
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen p-4 sm:p-6 max-w-4xl mx-auto">
      <header className="text-center mb-10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-24 bg-gradient-radial from-appcyan/10 to-transparent opacity-70 blur-xl -z-10"></div>
        
        <div className="inline-flex items-center justify-center mb-2">
          <Sparkles className="h-7 w-7 mr-2 text-appcyan animate-pulse-glow" />
          <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-appcyan-light via-appcyan to-accent bg-clip-text text-transparent">
            Precision Unit Converter
          </h1>
        </div>
        
        <p className="text-appwhite/60 max-w-lg mx-auto">
          Convert between different units with accuracy and ease
        </p>
      </header>

      <Tabs defaultValue="units" className="w-full mb-8">
        <TabsList className="grid grid-cols-3 mb-8 bg-appblue-dark/40 border border-appwhite/10 p-1 rounded-lg">
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

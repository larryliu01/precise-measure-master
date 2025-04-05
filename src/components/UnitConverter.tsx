
import React, { useState, useEffect } from 'react';
import CategorySelector from './CategorySelector';
import ConversionCard from './ConversionCard';
import { conversionCategories } from '../utils/conversion';
import Footer from './Footer';

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
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Precision Unit Converter</h1>
        <p className="text-appwhite/60">Convert between different units quickly and easily</p>
      </header>

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
            <li>Use the swap button to reverse the conversion direction</li>
            <li>All conversions happen in real-time as you type</li>
            <li>Your recently used measurement types appear below the converter</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UnitConverter;

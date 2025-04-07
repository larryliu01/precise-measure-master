import React from 'react';
import UnitConverter from '../components/UnitConverter';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        <UnitConverter />
      </div>
    </div>
  );
};

export default Index;

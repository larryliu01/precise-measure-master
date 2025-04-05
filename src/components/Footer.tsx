
import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="mt-8 text-center">
      <p className="text-white/40 text-sm">
        © {new Date().getFullYear()} Unit Converter - All measurements are approximate
      </p>
    </div>
  );
};

export default Footer;

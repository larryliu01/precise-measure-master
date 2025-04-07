import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 mb-6 text-center relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-24 bg-gradient-radial from-appcyan/5 to-transparent opacity-50 blur-xl -z-10"></div>
      
      <div className="flex items-center justify-center text-appwhite/40 text-sm mb-2">
        <span>Made with</span>
        <Heart className="h-4 w-4 mx-1 text-appcyan animate-pulse" />
        <span>for precision</span>
      </div>
      
      <p className="text-appwhite/40 text-sm">
        © {new Date().getFullYear()} Precision Unit Converter - All measurements are approximate
      </p>
    </footer>
  );
};

export default Footer;

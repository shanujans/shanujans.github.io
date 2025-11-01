
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/50 py-6 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <p className="font-jetbrains-mono text-sm">
          &copy; {currentYear} Shanujan Suresh. All Rights Reserved.
        </p>
        <p className="text-xs mt-1">
          Designed & Built with <span className="text-red-500">&hearts;</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Logo Mark */}
      <div className="h-12 w-12 relative">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="48" height="48" fill="none" stroke="#0066FF" strokeWidth="2"/>
          <rect x="4" y="4" width="16" height="40" fill="none" stroke="#0066FF" strokeWidth="2"/>
          <rect x="24" y="4" width="20" height="20" fill="none" stroke="#0066FF" strokeWidth="2"/>
        </svg>
      </div>
      
      {/* Wordmark */}
      <div className="flex flex-col">
        <span className="text-2xl font-normal tracking-wide text-[#0066FF]">ATELIER</span>
        <span className="text-2xl font-normal tracking-wide text-[#0066FF]">GRIS</span>
      </div>
    </div>
  );
};

export default Logo; 
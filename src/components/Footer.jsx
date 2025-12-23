import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center">
         <div className="flex items-center justify-center gap-2 mb-3">
             <div className="grid grid-cols-2 gap-0.5 w-5 h-5 opacity-80">
                <div className="bg-nc-sky rounded-tl-[2px]"></div>
                <div className="bg-nc-wood rounded-tr-[2px]"></div>
                <div className="bg-nc-grass rounded-bl-[2px]"></div>
                <div className="bg-nc-hair rounded-br-[2px]"></div>
             </div>
             <span className="font-bold text-gray-700 tracking-tight">NumeriCalm</span>
         </div>
        <p className="text-xs text-gray-400">
          &copy; {currentYear} NumeriCalm. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
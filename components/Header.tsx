
import React from 'react';

interface HeaderProps {
  location: string;
  onSearch: () => void;
  onNotify: () => void;
}

const Header: React.FC<HeaderProps> = ({ location, onSearch, onNotify }) => {
  return (
    <header className="flex items-center justify-between px-6 pt-8 pb-2 bg-transparent z-50">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-2xl drop-shadow-[0_0_8px_rgba(96,122,251,0.6)]">location_on</span>
        <span className="font-bold text-lg tracking-tight text-white">{location}</span>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onSearch}
          className="w-9 h-9 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-sm hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-primary text-xl">search</span>
        </button>
        <button 
          onClick={onNotify}
          className="w-9 h-9 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-sm hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-primary text-xl">notifications</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

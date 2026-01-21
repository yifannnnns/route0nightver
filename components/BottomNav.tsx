
import React from 'react';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onViewChange }) => {
  const NavItem = ({ view, icon, label, isMain = false }: { view: View, icon: string, label: string, isMain?: boolean }) => {
    const isActive = currentView === view;

    const renderIcon = () => {
      if (icon === '〇') {
        return (
          <span className={`text-xl font-black leading-none transition-all duration-300 ${isActive ? 'scale-125 text-primary' : 'text-slate-400'}`}>
            〇
          </span>
        );
      }
      return <span className={`material-symbols-outlined ${isActive ? 'text-primary' : 'text-slate-400'}`}>{icon}</span>;
    };

    const renderMainIcon = () => {
      if (view === View.EXPLORE) {
        return (
          <div className="relative flex items-center justify-center">
             {/* The white "O" ring from the Road 0 branding - background removed for a floating look */}
             <div className={`relative w-12 h-12 rounded-full border-[3px] border-white transition-all duration-500 ${isActive ? 'scale-100 opacity-100 shadow-[0_0_20px_rgba(255,255,255,0.6)]' : 'opacity-60 scale-90'}`}>
                <div className="absolute top-[2px] right-[-2px] w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]"></div>
             </div>
          </div>
        );
      }
      return <span className="material-symbols-outlined text-white text-3xl">{icon}</span>;
    };

    if (isMain) {
      return (
        <div 
          className="flex flex-col items-center justify-center relative -top-3 cursor-pointer px-2" 
          onClick={() => onViewChange(view)}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'scale-110' : ''}`}>
            {renderMainIcon()}
          </div>
          <span className={`text-[10px] font-black mt-1 uppercase transition-colors tracking-widest ${isActive ? 'text-primary' : 'text-slate-300'}`}>{label}</span>
          {isActive && (
            <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_#00F0FF]"></div>
          )}
        </div>
      );
    }

    return (
      <div 
        className="flex-1 flex flex-col items-center justify-center gap-1 group cursor-pointer relative py-2" 
        onClick={() => onViewChange(view)}
      >
        <div className={`transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:text-slate-200'}`}>
          {renderIcon()}
        </div>
        <span className={`text-[9px] font-black uppercase tracking-tighter transition-colors ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-200'}`}>{label}</span>
        {isActive && (
          <div className="absolute bottom-[-4px] w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_#00F0FF] animate-pulse"></div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 px-6 z-[100] pointer-events-none">
      {/* Container with enhanced glassmorphism */}
      <nav className="max-w-md mx-auto pointer-events-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] h-16 flex items-center justify-around px-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
        <NavItem view={View.DISCOVER} icon="〇" label="发现" />
        <NavItem view={View.TRIP} icon="calendar_month" label="日历" />
        <NavItem view={View.EXPLORE} icon="concentric" label="导览" isMain />
        <NavItem view={View.HUB} icon="groups" label="广场" />
        <NavItem view={View.ME} icon="person" label="我的" />
      </nav>
    </div>
  );
};

export default BottomNav;

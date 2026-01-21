
import React from 'react';
import { RoadSegment } from '../types';

interface RoadSegmentDetailScreenProps {
  segment: RoadSegment;
  onBack: () => void;
}

const RoadSegmentDetailScreen: React.FC<RoadSegmentDetailScreenProps> = ({ segment, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-background-dark overflow-y-auto no-scrollbar pb-32 animate-in slide-in-from-right-10 duration-500">
      {/* Hero Atmosphere Area */}
      <div className="relative h-[60vh] flex-shrink-0">
        <img 
          src={segment.image} 
          className="w-full h-full object-cover" 
          alt={segment.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
        
        {/* Navigation Overlays */}
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full glass-circle flex items-center justify-center text-white z-50 shadow-lg active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="absolute bottom-8 left-6 right-6">
          <div className="flex items-center gap-2 mb-3">
             <span className="w-8 h-[2px] bg-primary"></span>
             <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Xiangshan Road 0</span>
          </div>
          <h2 className="text-5xl font-black mb-2 leading-tight tracking-tighter drop-shadow-xl">{segment.name}</h2>
          <p className="text-xl font-bold text-white/90 italic mb-6 drop-shadow-lg">{segment.description}</p>
          
          {/* Quick Stats Chips */}
          <div className="flex gap-3">
             <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">distance</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{segment.length || '---'}</span>
             </div>
             <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{segment.duration || '---'}</span>
             </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8 relative z-20">
        {/* Intro Content */}
        <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 shadow-2xl space-y-8">
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
               特色介绍 • INTRODUCTION
            </h3>
            <p className="text-base text-slate-300 leading-relaxed font-medium opacity-90">
              {segment.fullIntro || segment.description}
            </p>
          </section>

          {/* Highlights List - Acts as "Main Spots" */}
          {segment.highlights && (
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                 沿途主要景点 • KEY SPOTS
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {segment.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 p-4 rounded-2xl hover:border-primary/40 transition-all group">
                    <span className="text-primary font-black text-xs opacity-50">0{i+1}</span>
                    <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">{h}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Gallery Carousel */}
          {segment.gallery && (
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                 实拍氛围 • ATMOSPHERE
              </h3>
              <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-2 px-2">
                {segment.gallery.map((img, i) => (
                  <div key={i} className="flex-shrink-0 w-64 h-44 rounded-3xl overflow-hidden shadow-xl border border-white/10 group">
                    <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery" />
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Action CTA */}
          <div className="pt-8">
             <button className="w-full bg-cyan-blue-gradient text-white py-5 rounded-[28px] font-black text-sm shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
               <span className="material-symbols-outlined">navigation</span>
               定位此环线起点 • START NAVIGATION
             </button>
             <p className="text-center mt-4 text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em]">
               Sustainable Tourism • Enjoy The Loop
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadSegmentDetailScreen;

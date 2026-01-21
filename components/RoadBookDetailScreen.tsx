
import React from 'react';
import { RoadBook } from '../types';

interface RoadBookDetailScreenProps {
  book: RoadBook;
  onBack: () => void;
}

const RoadBookDetailScreen: React.FC<RoadBookDetailScreenProps> = ({ book, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-background-dark overflow-y-auto no-scrollbar pb-32 animate-in slide-in-from-right-10 duration-500">
      {/* Header Area */}
      <div className="relative h-72 flex-shrink-0">
        <img 
          src={book.image} 
          className="w-full h-full object-cover" 
          alt={book.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full glass-circle flex items-center justify-center text-white z-50 shadow-lg active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-primary/40 text-primary bg-primary/10`}>
              {book.type === 'official' ? 'Official Selection' : 'Community Niche'}
            </span>
          </div>
          <h2 className="text-3xl font-black mb-1 leading-tight tracking-tighter">{book.title}</h2>
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-sm font-bold italic">Curated by {book.author}</p>
            <div className="flex items-center gap-2">
               <span className="material-symbols-outlined text-primary text-lg">share</span>
               <span className="material-symbols-outlined text-primary text-lg">bookmark</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8">
        {/* Intro Section */}
        <section className="pt-6 border-t border-white/5">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">auto_stories</span>
            路书简介 • INTRODUCTION
          </h3>
          <div className="bg-slate-900/40 rounded-3xl p-5 border border-white/5">
             <p className="text-sm text-slate-300 leading-relaxed font-medium">
               {book.intro}
             </p>
          </div>
        </section>

        {/* Route Map Area */}
        <section>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">map</span>
            漫游路线 • ROUTE MAP
          </h3>
          <div className="relative aspect-[16/10] bg-slate-900/60 rounded-[32px] overflow-hidden border border-white/5 p-4 group">
            <div className="absolute inset-0 opacity-20 bg-cover bg-center grayscale" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&w=800')` }}></div>
            
            {/* SVG Route Line */}
            <svg width="100%" height="100%" className="absolute inset-0 z-10">
              <path 
                d={`M ${book.points.map(p => `${p.coordinate.x}% ${p.coordinate.y}%`).join(' L ')}`}
                fill="none"
                stroke="#607AFB"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="route-glow"
              />
            </svg>

            {/* Point Markers */}
            {book.points.map((point, idx) => (
              <div 
                key={point.id}
                className="absolute z-20 transition-transform group-hover:scale-110"
                style={{ top: `${point.coordinate.y}%`, left: `${point.coordinate.x}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg ring-4 ring-primary/20 text-[10px] font-black text-white">
                  {idx + 1}
                </div>
              </div>
            ))}
            
            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
               <button className="bg-primary text-white p-3 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">directions_car</span>
                  <span className="text-[10px] font-black uppercase">开启整条路线导航</span>
               </button>
            </div>
          </div>
        </section>

        {/* Timeline List of Points */}
        <section>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">format_list_numbered</span>
            线路点位 • POINT LIST
          </h3>
          
          <div className="space-y-12 relative">
            {/* Timeline Vertical Line */}
            <div className="absolute top-2 left-6 bottom-8 w-[1px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent"></div>

            {book.points.map((point, idx) => (
              <div key={point.id} className="relative pl-14 group">
                {/* Point Number Bubble */}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full border border-primary/30 bg-slate-900 flex items-center justify-center z-10 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <span className="text-sm font-black text-primary group-hover:text-white">{idx + 1}</span>
                </div>

                <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-4 p-4">
                    <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={point.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={point.name} />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-black text-lg mb-2 text-white/90 group-hover:text-primary transition-colors">{point.name}</h4>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic line-clamp-2">“{point.description}”</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-2">
                           <span className="text-[9px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded-lg font-bold">已打卡 4.2w</span>
                        </div>
                        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-xl transition-colors">
                           <span className="material-symbols-outlined text-[14px]">navigation</span> 去这里
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="pt-12 flex flex-col items-center">
           <button className="w-full bg-gradient-to-r from-primary to-accent text-white py-5 rounded-[32px] font-black text-sm shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all">
             立即出发 • START JOURNEY
           </button>
           <p className="mt-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">象山〇号环岛公路 · 漫游版权所有</p>
        </div>
      </div>
    </div>
  );
};

export default RoadBookDetailScreen;

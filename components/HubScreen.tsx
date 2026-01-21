
import React from 'react';
import { CommunityCircle } from '../types';

interface HubScreenProps {
  communities: CommunityCircle[];
  onCircleClick: (comm: CommunityCircle) => void;
}

const HubScreen: React.FC<HubScreenProps> = ({ communities, onCircleClick }) => {
  const mainHub = communities.find(c => c.type === 'main');
  const satellites = communities.filter(c => c.type !== 'main');

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar animate-in slide-in-from-bottom-5 duration-700">
      {/* Header Section */}
      <div className="px-6 pt-4 mb-8">
        <h1 className="text-3xl font-black tracking-tighter">社群广场</h1>
        <p className="text-slate-500 text-sm font-medium">象山公路旅行者的精神角落</p>
      </div>

      {/* Bubble Navigation Area */}
      <div className="relative w-full h-[400px] flex items-center justify-center flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-72 h-72 rounded-full border border-primary/10 animate-[spin_10s_linear_infinite]"></div>
           <div className="absolute w-48 h-48 rounded-full border border-accent/10 animate-[spin_15s_linear_infinite_reverse]"></div>
        </div>

        {/* Main Hub */}
        {mainHub && (
          <div 
            onClick={() => onCircleClick(mainHub)}
            className={`z-20 ${mainHub.size} rounded-full p-1 bg-gradient-to-br from-primary via-primary/80 to-accent main-hub-shadow flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 floating`}
          >
            <div 
              className="w-full h-full rounded-full bg-cover bg-center flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group shadow-inner"
              style={{
                backgroundImage: `linear-gradient(rgba(96, 122, 251, 0.4), rgba(0, 0, 0, 0.7)), url("${mainHub.image}")`
              }}
            >
              <span className="material-symbols-outlined text-white text-3xl mb-1 group-hover:scale-110 transition-transform">auto_awesome</span>
              <p className="text-white text-sm font-black uppercase tracking-widest leading-none">全部圈子</p>
              <p className="text-white/60 text-[10px] mt-1 font-bold">128 个活动中</p>
            </div>
          </div>
        )}

        {/* Satellites */}
        {satellites.map((comm) => (
          <div 
            key={comm.id}
            onClick={() => onCircleClick(comm)}
            className={`absolute z-10 ${comm.size} glass-circle rounded-full overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:translate-y-[-5px] transition-all hover:border-primary/50 group`}
            style={{ ...comm.position }}
          >
            {comm.image && (
              <div 
                className="absolute inset-0 opacity-20 bg-cover bg-center transition-all duration-500 group-hover:opacity-60 scale-110"
                style={{ backgroundImage: `url("${comm.image}")` }}
              ></div>
            )}
            <div className="relative z-10 flex flex-col items-center p-2 text-center">
              <span className="material-symbols-outlined text-primary text-xl mb-1 group-hover:scale-110 transition-transform">{comm.icon}</span>
              <span className="text-[10px] font-black leading-tight tracking-wider uppercase text-white/80">{comm.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Discover Feed (Dianping Style) */}
      <div className="px-6 pb-20 space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-lg font-bold flex items-center gap-2">
             <span className="material-symbols-outlined text-primary">local_fire_department</span>
             本周热门
           </h2>
           <button className="text-primary text-xs font-bold">查看更多</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
           {[1,2,3,4].map(i => (
             <div key={i} className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all cursor-pointer">
                <div className="h-40 overflow-hidden">
                   <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&q=80&w=400`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="p-3">
                   <h3 className="text-xs font-bold line-clamp-2 mb-2 leading-relaxed">在〇号公路尽头发现的秘密咖啡馆，日落绝美...</h3>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                         <div className="w-5 h-5 rounded-full bg-slate-700"></div>
                         <span className="text-[9px] text-slate-500 font-medium">象山旅行家</span>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] text-slate-500 font-bold">
                         <span className="material-symbols-outlined text-[10px]">favorite</span> 1.2k
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default HubScreen;

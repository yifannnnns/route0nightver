
import React, { useEffect, useState } from 'react';
import { CommunityCircle, Insight } from '../types';
import { getCommunityInsights } from '../geminiService';

interface CommunityScreenProps {
  community: CommunityCircle;
  onBack: () => void;
}

const CommunityScreen: React.FC<CommunityScreenProps> = ({ community, onBack }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getCommunityInsights(community.name);
      setInsights(data);
      setLoading(false);
    };
    fetch();
  }, [community]);

  return (
    <div className="flex flex-col h-full bg-background-dark/80 backdrop-blur-md overflow-y-auto no-scrollbar animate-in slide-in-from-bottom-10 duration-500">
      <div className="relative h-64 flex-shrink-0">
        <img 
          src={community.image || 'https://picsum.photos/800/600'} 
          className="w-full h-full object-cover" 
          alt={community.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full glass-circle flex items-center justify-center text-white"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="absolute bottom-6 left-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="material-symbols-outlined text-primary text-3xl">{community.icon}</span>
            <h2 className="text-3xl font-extrabold">{community.name}</h2>
          </div>
          <p className="text-slate-400 text-sm">{community.subtitle || '〇号公路社群推荐'}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">AI 深度指南</h3>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-slate-800/50 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {insights.map((insight, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase text-primary tracking-widest bg-primary/10 px-2 py-0.5 rounded">
                      {insight.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{insight.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{insight.content}</p>
                </div>
              ))}
              {insights.length === 0 && (
                <p className="text-center text-slate-500 py-10">未找到相关见解，请稍后重试。</p>
              )}
            </div>
          )}
        </section>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">近期动态</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
             {[1,2,3].map(i => (
               <div key={i} className="flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden relative">
                 <img src={`https://picsum.photos/seed/${community.id}${i}/300/200`} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/20"></div>
                 <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-white"></div>
                    <span className="text-[10px] font-bold text-white">用户 {i}</span>
                 </div>
               </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommunityScreen;

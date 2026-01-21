
import React from 'react';
import { ROAD_SEGMENTS, ROAD_BOOKS, ROAD_STAYS } from '../constants';
import { RoadBook, RoadSegment } from '../types';

interface DiscoverScreenProps {
  onRoadBookClick: (book: RoadBook) => void;
  onRoadSegmentClick: (segment: RoadSegment) => void;
}

const DiscoverScreen: React.FC<DiscoverScreenProps> = ({ onRoadBookClick, onRoadSegmentClick }) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-24 animate-in fade-in duration-500">
      <div className="px-6 pt-6 mb-6">
        <h1 className="text-3xl font-black tracking-tighter">发现象山</h1>
        <p className="text-slate-500 text-sm font-medium italic">漫游〇号公路，发现不期而遇的惊喜</p>
      </div>

      {/* 1. 特色环线 */}
      <section className="mb-8">
        <div className="px-6 flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">route</span>
            十大特色环线
          </h2>
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-4 px-6">
          {ROAD_SEGMENTS.map(segment => (
            <div 
              key={segment.id} 
              onClick={() => onRoadSegmentClick(segment)}
              className="flex-shrink-0 w-44 group cursor-pointer"
            >
              <div className="h-56 rounded-3xl overflow-hidden relative mb-2 shadow-lg">
                <img src={segment.image} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" alt={segment.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-black leading-tight">{segment.name}</p>
                  <p className="text-white/60 text-[9px] font-bold uppercase mt-1">{segment.length}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 路书推荐 */}
      <section className="mb-8 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">menu_book</span>
            路书推荐
          </h2>
          <div className="flex gap-2">
            <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">官方</span>
            <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">小众</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {ROAD_BOOKS.map(book => (
            <div 
              key={book.id} 
              onClick={() => onRoadBookClick(book)}
              className="flex gap-4 p-3 rounded-2xl bg-slate-900 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                <img src={book.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <h3 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors">{book.title}</h3>
                  <p className="text-[10px] text-slate-500">作者：{book.author}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`self-start text-[9px] font-black uppercase tracking-widest ${book.type === 'official' ? 'text-primary' : 'text-accent'}`}>
                    {book.type === 'official' ? 'Official Guide' : 'Deep Niche'}
                  </span>
                  <span className="material-symbols-outlined text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 特色住宿 */}
      <section className="mb-8 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">bed</span>
            特色住宿
          </h2>
          <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors">查看全部</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {ROAD_STAYS.map(stay => (
            <div key={stay.id} className="bg-slate-900 rounded-3xl overflow-hidden border border-white/5 group cursor-pointer hover:border-primary/40 transition-all shadow-xl">
              <div className="h-32 relative overflow-hidden">
                <img src={stay.image} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" alt={stay.name} />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-lg flex items-center gap-1">
                   <span className="material-symbols-outlined text-[10px] text-yellow-400 fill-current">star</span>
                   <span className="text-[9px] font-black text-white">{stay.rating}</span>
                </div>
                <div className="absolute bottom-2 left-2 bg-primary text-slate-900 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase">
                  {stay.type === 'camping' ? '露营' : stay.type === 'hotel' ? '酒店' : stay.type === 'bnb' ? '民宿' : '青旅'}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-xs font-bold mb-1 line-clamp-1 group-hover:text-primary transition-colors">{stay.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary text-[10px] font-black">{stay.price}</span>
                  <div className="flex gap-1">
                    {stay.tags.slice(0, 1).map((tag, idx) => (
                      <span key={idx} className="text-[8px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 便民服务 */}
      <section className="mb-8 px-6">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary">support_agent</span>
          便民服务
        </h2>
        <div className="grid grid-cols-4 gap-3 text-center">
          {[
            {icon: 'local_parking', label: '停车场'},
            {icon: 'wc', label: '卫生间'},
            {icon: 'ev_station', label: '充电桩'},
            {icon: 'medical_services', label: '医疗点'},
            {icon: 'info', label: '问讯处'},
            {icon: 'shopping_bag', label: '便利店'},
            {icon: 'restaurant', label: '餐饮'},
            {icon: 'wifi', label: '免费WiFi'}
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-slate-900/50 border border-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">{item.icon}</span>
              <span className="text-[10px] font-bold text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 户外运动 */}
      <section className="px-6">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary">sports_kabaddi</span>
          户外运动
        </h2>
        <div className="grid grid-cols-2 gap-4">
           <div className="relative h-28 rounded-2xl overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1541625602330-2277a4c4bb99?auto=format&fit=crop&w=300" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                 <p className="text-white font-black italic">海滨骑行</p>
              </div>
           </div>
           <div className="relative h-28 rounded-2xl overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=300" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                 <p className="text-white font-black italic">桨板冲浪</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default DiscoverScreen;

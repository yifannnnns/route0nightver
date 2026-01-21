
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { EVENTS } from '../constants';
import { RoadEvent } from '../types';

const CalendarScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'my'>('upcoming');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [bookedEvents, setBookedEvents] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<string | null>(null);
  
  // Generate next 14 days for the calendar bar
  const dateList = useMemo(() => {
    const dates = [];
    const now = new Date();
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      dates.push({
        full: d,
        dayNum: d.getDate(),
        dayStr: weekDays[d.getDay()],
        month: d.getMonth() + 1,
        isToday: i === 0,
        id: `${d.getMonth() + 1}.${d.getDate()}`
      });
    }
    return dates;
  }, []);

  const [selectedDateId, setSelectedDateId] = useState<string>(dateList[0].id);

  const categories = [
    { id: 'all', label: '全部', icon: 'dashboard' },
    { id: 'music', label: '音乐', icon: 'music_note' },
    { id: 'market', label: '集市', icon: 'shopping_bag' },
    { id: 'sport', label: '运动', icon: 'fitness_center' },
    { id: 'culture', label: '文化', icon: 'museum' },
  ];

  const filteredEvents = useMemo(() => {
    let list = activeTab === 'upcoming' 
      ? EVENTS 
      : EVENTS.filter(e => bookedEvents.includes(e.id));
    
    if (activeCategory !== 'all') {
      list = list.filter(e => e.type === activeCategory);
    }
    
    // Optional: Add filtering by selected date if your event data matches the dateId
    // For now we keep it visual as requested unless specific date mapping is needed
    
    return list;
  }, [activeTab, activeCategory, bookedEvents, selectedDateId]);

  const handleBook = (e: RoadEvent) => {
    if (bookedEvents.includes(e.id)) return;
    setBookedEvents([...bookedEvents, e.id]);
    setShowToast(`预约成功：${e.title}`);
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-background-dark relative animate-in fade-in duration-500 overflow-hidden">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-accent text-slate-900 rounded-full font-black text-sm shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-base">check_circle</span>
          {showToast}
        </div>
      )}

      {/* Header Sticky Section */}
      <div className="flex-shrink-0 pt-6 bg-background-dark/80 backdrop-blur-xl z-50">
        <div className="px-6 flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-black tracking-tighter">〇感日历</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">Roaming Calendar</p>
          </div>
          <div className="flex bg-slate-900 rounded-2xl p-1 border border-white/5">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'upcoming' ? 'bg-primary text-white shadow-lg' : 'text-slate-500'}`}
            >
              探索
            </button>
            <button 
              onClick={() => setActiveTab('my')}
              className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'my' ? 'bg-primary text-white shadow-lg' : 'text-slate-500'}`}
            >
              已订 {bookedEvents.length > 0 && `(${bookedEvents.length})`}
            </button>
          </div>
        </div>

        {/* Horizontal Calendar Bar */}
        <div className="px-6 mb-4">
          <div className="flex items-center justify-between mb-3">
             <span className="text-[10px] font-black text-primary tracking-widest uppercase">2024 MAY / JUN</span>
             <span className="material-symbols-outlined text-slate-600 text-sm">calendar_month</span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mask-linear-right">
            {dateList.map((date) => (
              <button
                key={date.id}
                onClick={() => setSelectedDateId(date.id)}
                className={`flex-shrink-0 w-12 h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border ${
                  selectedDateId === date.id 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-slate-900/50 border-white/5 text-slate-500 hover:border-white/20'
                }`}
              >
                <span className={`text-[8px] font-black mb-1.5 ${selectedDateId === date.id ? 'text-white/70' : 'text-slate-600'}`}>
                  {date.dayStr}
                </span>
                <span className="text-lg font-black leading-none">
                  {date.dayNum}
                </span>
                {/* Simulated event indicator dot */}
                <div className={`w-1 h-1 rounded-full mt-2 ${selectedDateId === date.id ? 'bg-white' : 'bg-primary opacity-40'}`}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Categories Chips */}
        <div className="px-6 flex gap-2 overflow-x-auto no-scrollbar pb-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${activeCategory === cat.id ? 'bg-primary/20 border-primary text-primary' : 'bg-slate-900 border-white/5 text-slate-400'}`}
            >
              <span className="material-symbols-outlined text-[14px]">{cat.icon}</span>
              <span className="text-[10px] font-bold">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24 space-y-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className="group relative bg-slate-900/40 rounded-[32px] overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-300"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={event.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30"></div>
                
                {/* Float Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="bg-white text-slate-900 px-3 py-1 rounded-xl shadow-2xl flex flex-col items-center">
                    <span className="text-[8px] font-black uppercase tracking-tighter opacity-60 leading-none mb-1">MAY</span>
                    <span className="text-xl font-black leading-none">{event.date.split('.')[1]}</span>
                  </div>
                  {event.isHot && (
                    <div className="bg-accent text-slate-900 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase italic tracking-widest animate-pulse">
                      Highly Rec
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                    <span className="material-symbols-outlined text-[12px] text-primary">schedule</span>
                    <span className="text-[10px] font-bold text-white/90">{event.time}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-black text-lg drop-shadow-lg">{event.price}</p>
                  </div>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${event.type === 'music' ? 'bg-primary' : event.type === 'sport' ? 'bg-accent' : 'bg-pink-500'}`}></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{event.type}</span>
                </div>
                <h3 className="text-xl font-black mb-2 leading-tight tracking-tight group-hover:text-primary transition-colors">{event.title}</h3>
                <div className="flex items-center gap-1 text-slate-400 mb-6">
                   <span className="material-symbols-outlined text-[14px]">location_on</span>
                   <span className="text-[10px] font-bold">{event.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                       {[...Array(3)].map((_, i) => (
                         <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?u=${event.id}${i}`} className="w-full h-full object-cover" />
                         </div>
                       ))}
                       <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] font-black text-primary">+{event.participants}</div>
                    </div>
                  </div>
                  
                  {bookedEvents.includes(event.id) ? (
                    <button className="bg-green-500/10 text-green-500 border border-green-500/20 px-6 py-2 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">check_circle</span> 已预约
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleBook(event)}
                      className={`relative px-6 py-2 rounded-2xl text-[10px] font-black uppercase shadow-xl transition-all active:scale-95 flex flex-col items-center ${event.slotsLeft && event.slotsLeft < 20 ? 'bg-accent text-slate-900 shadow-accent/20' : 'bg-primary text-white shadow-primary/20'}`}
                    >
                      <span>立即预约</span>
                      {event.slotsLeft && (
                        <span className="text-[7px] opacity-70 absolute -top-1 -right-1 bg-red-500 text-white px-1.5 rounded-full border-2 border-slate-900">
                          仅剩{event.slotsLeft}
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
             <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center border border-white/5">
                <span className="material-symbols-outlined text-3xl text-slate-700">event_busy</span>
             </div>
             <div>
                <p className="text-sm font-bold text-slate-500">暂无相关活动</p>
                <button onClick={() => {setActiveTab('upcoming'); setActiveCategory('all');}} className="mt-2 text-primary text-xs font-black underline">返回发现更多</button>
             </div>
          </div>
        )}

        {/* Sustainable Footer Branding */}
        <div className="p-8 rounded-[40px] bg-gradient-to-br from-primary/10 via-background-dark to-accent/5 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
          <h4 className="font-black text-white text-lg mb-2 flex items-center gap-2 italic uppercase">
            <span className="material-symbols-outlined text-primary">eco</span> Zero Waste Road
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed font-bold">
            所有〇号公路预约活动均严格遵守“无痕自驾”原则。我们鼓励参与者自带水杯，共同守护这一片斑斓海岸的纯净。
          </p>
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
             <span className="text-[9px] font-black text-slate-600 tracking-widest uppercase">Sustainable Tourism 2024</span>
             <button className="text-[9px] font-black text-primary underline">详情指南</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarScreen;

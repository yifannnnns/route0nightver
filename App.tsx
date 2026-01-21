
import React, { useState } from 'react';
import { View, CommunityCircle, RoadBook, RoadSegment } from './types';
import { COMMUNITIES } from './constants';
import HubScreen from './components/HubScreen';
import CommunityScreen from './components/CommunityScreen';
import MapScreen from './components/MapScreen';
import CalendarScreen from './components/CalendarScreen';
import DiscoverScreen from './components/DiscoverScreen';
import RoadBookDetailScreen from './components/RoadBookDetailScreen';
import RoadSegmentDetailScreen from './components/RoadSegmentDetailScreen';
import BottomNav from './components/BottomNav';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.EXPLORE);
  const [activeCommunity, setActiveCommunity] = useState<CommunityCircle | null>(null);
  const [selectedRoadBook, setSelectedRoadBook] = useState<RoadBook | null>(null);
  const [selectedRoadSegment, setSelectedRoadSegment] = useState<RoadSegment | null>(null);

  const handleCommunityClick = (comm: CommunityCircle) => {
    if (comm.type === 'action') return;
    setActiveCommunity(comm);
    setCurrentView(View.COMMUNITY);
  };

  const handleRoadBookClick = (book: RoadBook) => {
    setSelectedRoadBook(book);
    setCurrentView(View.ROAD_BOOK);
  };

  const handleRoadSegmentClick = (segment: RoadSegment) => {
    setSelectedRoadSegment(segment);
    setCurrentView(View.ROAD_SEGMENT_DETAIL);
  };

  const goBack = () => {
    if (currentView === View.COMMUNITY) {
        setCurrentView(View.HUB);
        setActiveCommunity(null);
    } else if (currentView === View.ROAD_BOOK) {
        setCurrentView(View.DISCOVER);
        setSelectedRoadBook(null);
    } else if (currentView === View.ROAD_SEGMENT_DETAIL) {
        setCurrentView(View.DISCOVER);
        setSelectedRoadSegment(null);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background-dark text-white font-display relative">
      {/* Immersive Theme Backgrounds */}
      <div className="absolute inset-0 pointer-events-none opacity-60 overflow-hidden">
        <div className="absolute -top-60 -left-60 w-[800px] h-[800px] rounded-full bg-primary/30 blur-[180px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-blue-gradient opacity-[0.12]"></div>
        <div className="absolute -bottom-60 -right-60 w-[600px] h-[600px] rounded-full bg-secondary/25 blur-[150px]"></div>
      </div>

      <Header location="象山 • 〇号公路" onSearch={() => {}} onNotify={() => {}} />

      <main className="flex-1 relative overflow-hidden">
        {currentView === View.HUB && (
          <HubScreen 
            communities={COMMUNITIES} 
            onCircleClick={handleCommunityClick} 
          />
        )}

        {currentView === View.EXPLORE && (
          <MapScreen />
        )}

        {currentView === View.DISCOVER && (
          <DiscoverScreen 
            onRoadBookClick={handleRoadBookClick} 
            onRoadSegmentClick={handleRoadSegmentClick}
          />
        )}
        
        {currentView === View.COMMUNITY && activeCommunity && (
          <CommunityScreen 
            community={activeCommunity} 
            onBack={goBack} 
          />
        )}

        {currentView === View.ROAD_BOOK && selectedRoadBook && (
          <RoadBookDetailScreen 
            book={selectedRoadBook} 
            onBack={goBack} 
          />
        )}

        {currentView === View.ROAD_SEGMENT_DETAIL && selectedRoadSegment && (
          <RoadSegmentDetailScreen 
            segment={selectedRoadSegment} 
            onBack={goBack} 
          />
        )}

        {currentView === View.TRIP && (
          <CalendarScreen />
        )}

        {currentView === View.ME && (
          <div className="flex flex-col items-center justify-center h-full px-8 text-center animate-in fade-in duration-500">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-primary mb-4 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                <span className="material-symbols-outlined text-4xl text-slate-600">person</span>
            </div>
            <h3 className="text-xl font-black mb-2 text-white italic tracking-tighter">我的象山足迹</h3>
            <div className="w-full h-2.5 bg-slate-800 rounded-full mb-2 overflow-hidden border border-white/5">
                <div className="w-1/3 h-full bg-cyan-blue-gradient shadow-[0_0_20px_#00F0FF]"></div>
            </div>
            <p className="text-slate-500 text-[10px] mb-6 uppercase tracking-[0.3em] font-black">Exploring 32% of Road 0</p>
            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="p-5 rounded-[28px] bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-xl">
                    <p className="text-primary font-black text-3xl">12</p>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Visited</p>
                </div>
                <div className="p-5 rounded-[28px] bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-xl">
                    <p className="text-secondary font-black text-3xl">3</p>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Booked</p>
                </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Navigation */}
      <BottomNav 
        currentView={currentView} 
        onViewChange={(view) => {
          if (view !== View.COMMUNITY && view !== View.ROAD_BOOK && view !== View.ROAD_SEGMENT_DETAIL) {
            setCurrentView(view);
            setActiveCommunity(null);
            setSelectedRoadBook(null);
            setSelectedRoadSegment(null);
          }
        }} 
      />
    </div>
  );
};

export default App;

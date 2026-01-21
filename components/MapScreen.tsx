
import React, { useState, useEffect, useRef } from 'react';
import { POIS } from '../constants';
import { POI } from '../types';

type TransportMode = 'driving' | 'transit' | 'cycling' | 'walking';

// Helper to create themed SVG markers for each category
const createThemedMarker = (color: string, iconPath: string) => {
  const svg = `
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <!-- Outer Glow Ring -->
      <circle cx="20" cy="20" r="16" fill="${color}" fill-opacity="0.1" stroke="${color}" stroke-width="1" filter="url(#glow)"/>
      <!-- Main Circle -->
      <circle cx="20" cy="20" r="12" fill="${color}" stroke="white" stroke-width="1.5"/>
      <!-- Icon -->
      <path d="${iconPath}" fill="white" transform="translate(10, 10) scale(0.83)"/>
    </svg>
  `.trim();
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Simplified Material Icon Paths
const ICON_PATHS = {
  scenery: "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z",
  food: "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z",
  transit: "M12 2c-4.42 0-8 .5-8 4v10.5c0 .83.67 1.5 1.5 1.5h1v2c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-2h4v2c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-2h1c.83 0 1.5-.67 1.5-1.5V6c0-3.5-3.58-4-8-4z",
  service: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
  stay: "M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm11-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"
};

const MapScreen: React.FC = () => {
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [activeTheme, setActiveTheme] = useState<string>('all');
  const [activeMode, setActiveMode] = useState<TransportMode>('driving');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersRef = useRef<{ markers: any, polyline: any } | null>(null);

  const themes = [
    { id: 'all', label: '全部', icon: 'apps' },
    { id: 'scenery', label: '日落摄影', icon: 'photo_camera' },
    { id: 'food', label: '海鲜美味', icon: 'restaurant' },
    { id: 'transit', label: '轨道接驳', icon: 'subway' },
    { id: 'service', label: '便民设施', icon: 'support_agent' }
  ];

  const transportModes = [
    { id: 'driving', label: '自驾', icon: 'directions_car', color: '#3B82F6' },
    { id: 'transit', label: '公交', icon: 'directions_bus', color: '#00F0FF' },
    { id: 'cycling', label: '骑行', icon: 'directions_bike', color: '#EC4899' },
    { id: 'walking', label: '步行', icon: 'directions_walk', color: '#94A3B8' }
  ];

  const ROAD_0_COORDS = [
    [29.552, 121.851], [29.565, 121.885], [29.578, 121.921], [29.555, 121.956],
    [29.522, 121.988], [29.488, 122.012], [29.455, 122.035], [29.412, 122.011],
    [29.388, 121.977], [29.355, 121.966], [29.322, 121.988], [29.288, 122.001],
    [29.245, 121.988], [29.211, 121.955], [29.198, 121.922], [29.222, 121.888],
    [29.255, 121.855], [29.288, 121.822], [29.322, 121.788], [29.355, 121.755],
    [29.401, 121.766], [29.444, 121.788], [29.488, 121.811], [29.522, 121.833],
    [29.552, 121.851]
  ];

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const TMap = (window as any).TMap;
      if (!TMap) return;

      const center = new TMap.LatLng(29.4200, 121.9200);
      
      mapInstanceRef.current = new TMap.Map(mapContainerRef.current, {
        center: center,
        zoom: 11,
        pitch: 0,
        rotation: 0,
        mapStyleId: 'style1', 
        viewMode: '2D'
      });

      const markerLayer = new TMap.MultiMarker({
        id: 'marker-layer',
        map: mapInstanceRef.current,
        styles: {
          'scenery': new TMap.MarkerStyle({ 
            width: 40, 
            height: 40, 
            anchor: { x: 20, y: 20 }, 
            src: createThemedMarker('#00F0FF', ICON_PATHS.scenery) 
          }),
          'food': new TMap.MarkerStyle({ 
            width: 40, 
            height: 40, 
            anchor: { x: 20, y: 20 }, 
            src: createThemedMarker('#F59E0B', ICON_PATHS.food) 
          }),
          'transit': new TMap.MarkerStyle({ 
            width: 40, 
            height: 40, 
            anchor: { x: 20, y: 20 }, 
            src: createThemedMarker('#3B82F6', ICON_PATHS.transit) 
          }),
          'service': new TMap.MarkerStyle({ 
            width: 40, 
            height: 40, 
            anchor: { x: 20, y: 20 }, 
            src: createThemedMarker('#10B981', ICON_PATHS.service) 
          }),
          'stay': new TMap.MarkerStyle({ 
            width: 40, 
            height: 40, 
            anchor: { x: 20, y: 20 }, 
            src: createThemedMarker('#8B5CF6', ICON_PATHS.stay) 
          })
        },
        geometries: []
      });

      const polylineLayer = new TMap.MultiPolyline({
        id: 'road-0-layer',
        map: mapInstanceRef.current,
        styles: {
          'driving': new TMap.PolylineStyle({ color: '#3B82F6', width: 8, borderWidth: 2, borderColor: '#FFFFFF', lineCap: 'round', showArrow: true }),
          'transit': new TMap.PolylineStyle({ color: '#00F0FF', width: 6, dashArray: [10, 5], lineCap: 'round' }),
          'cycling': new TMap.PolylineStyle({ color: '#EC4899', width: 5, lineCap: 'round' }),
          'walking': new TMap.PolylineStyle({ color: '#94A3B8', width: 4, dashArray: [2, 4], lineCap: 'round' })
        },
        geometries: [{
          id: 'road0',
          styleId: 'driving',
          paths: ROAD_0_COORDS.map(p => new TMap.LatLng(p[0], p[1]))
        }]
      });

      markerLayer.on('click', (evt: any) => {
        const poi = POIS.find(p => p.id === evt.geometry.id);
        if (poi) {
          setSelectedPOI(poi);
          mapInstanceRef.current.panTo(new TMap.LatLng(poi.lat, poi.lng));
        }
      });

      layersRef.current = { markers: markerLayer, polyline: polylineLayer };
    }
  }, []);

  useEffect(() => {
    if (layersRef.current?.polyline) {
      layersRef.current.polyline.updateGeometries([{
        id: 'road0',
        styleId: activeMode,
        paths: ROAD_0_COORDS.map(p => new (window as any).TMap.LatLng(p[0], p[1]))
      }]);
    }
  }, [activeMode]);

  useEffect(() => {
    if (layersRef.current?.markers) {
      const filteredPOIs = activeTheme === 'all' 
        ? POIS 
        : POIS.filter(poi => poi.category === activeTheme);

      const geometries = filteredPOIs.map(poi => ({
        id: poi.id,
        styleId: poi.category,
        position: new (window as any).TMap.LatLng(poi.lat, poi.lng),
        properties: { title: poi.name }
      }));

      layersRef.current.markers.setGeometries(geometries);
    }
  }, [activeTheme]);

  return (
    <div className="flex flex-col h-full bg-[#0b0e1a] relative animate-in fade-in duration-700">
      <div ref={mapContainerRef} className="absolute inset-0 z-0 grayscale-[0.3] invert-[0.02]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background-dark/60 via-transparent to-background-dark/80 z-10" />

      {/* Top UI Layer: Themed Tabs */}
      <div className="z-50 px-6 pt-4 overflow-x-auto no-scrollbar flex gap-2">
        {themes.map(theme => (
          <button
            key={theme.id}
            onClick={() => setActiveTheme(theme.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTheme === theme.id ? 'bg-primary text-slate-900 shadow-lg shadow-primary/40' : 'bg-slate-900/80 backdrop-blur-md text-slate-400 border border-white/5'}`}
          >
            <span className="material-symbols-outlined text-[14px]">{theme.icon}</span>
            {theme.label}
          </button>
        ))}
      </div>

      {/* Mode Switcher */}
      <div className="absolute right-6 top-24 z-50 flex flex-col gap-3">
        {transportModes.map(mode => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id as TransportMode)}
            className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border backdrop-blur-xl ${
              activeMode === mode.id 
                ? 'bg-slate-900 border-primary text-white scale-110 shadow-2xl' 
                : 'bg-slate-900/40 border-white/5 text-slate-500 hover:bg-slate-900/60'
            }`}
          >
            <span className="material-symbols-outlined text-lg" style={{ color: activeMode === mode.id ? mode.color : undefined }}>{mode.icon}</span>
            <span className="text-[7px] font-black uppercase mt-0.5">{mode.label}</span>
          </button>
        ))}
      </div>

      <div className="absolute left-6 bottom-32 z-20 flex flex-col gap-1 pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-2">
           <div className="w-4 h-1 rounded-full bg-primary shadow-[0_0_12px_#00F0FF]"></div>
           <span className="text-[8px] font-black text-white uppercase tracking-widest">Xiangshan Road 0</span>
        </div>
      </div>

      <div className="z-10 px-6 py-2 flex items-center justify-between mt-auto bg-slate-900/60 backdrop-blur-xl">
         <div className="flex flex-col">
           <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">Road 0 Navigator</span>
           <span className="text-[12px] font-bold">象山 · 〇号环岛公路地图</span>
         </div>
         <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00F0FF]"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Online</span>
         </div>
      </div>

      <div className="z-40 px-6 pb-4">
        {selectedPOI && (
          <div className="bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom-10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800 text-primary`}>
                    <span className="material-symbols-outlined text-sm">
                      {selectedPOI.category === 'transit' ? 'subway' : selectedPOI.category === 'food' ? 'restaurant' : 'push_pin'}
                    </span>
                  </div>
                  <h3 className="font-black text-xl tracking-tight">{selectedPOI.name}</h3>
                </div>
                <p className="text-[10px] text-slate-500 font-black tracking-widest uppercase ml-10">
                  {selectedPOI.category} • {selectedPOI.tags.join(' / ')}
                </p>
              </div>
              <button onClick={() => setSelectedPOI(null)} className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            
            <p className="text-sm text-slate-300 mb-6 leading-relaxed font-medium bg-slate-800/20 p-3 rounded-2xl">
               “{selectedPOI.description}”
            </p>
            
            <div className="flex gap-3">
              <button className="flex-[2] bg-primary text-slate-900 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-primary/40 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-base">near_me</span> 开启导航
              </button>
              <button className="flex-1 bg-slate-800/80 text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-base">share</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapScreen;

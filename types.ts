
export enum View {
  HUB = 'hub',
  EXPLORE = 'explore',
  DISCOVER = 'discover',
  COMMUNITY = 'community',
  TRIP = 'trip',
  ME = 'me',
  ROAD_BOOK = 'road_book',
  ROAD_SEGMENT_DETAIL = 'road_segment_detail'
}

export interface CommunityCircle {
  id: string;
  name: string;
  subtitle?: string;
  icon: string;
  image: string;
  type: 'main' | 'satellite' | 'action';
  position?: { top?: string, bottom?: string, left?: string, right?: string };
  size: string;
}

export interface Insight {
  title: string;
  content: string;
  category: string;
}

export interface POI {
  id: string;
  name: string;
  category: 'scenery' | 'food' | 'stay' | 'transit' | 'service';
  lat: number;
  lng: number;
  description: string;
  tags: string[];
}

export interface RoadEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'market' | 'music' | 'sport' | 'culture';
  image: string;
  price: string;
  isHot?: boolean;
  slotsLeft?: number;
  participants: number;
}

export interface RoadSegment {
  id: string;
  name: string;
  image: string;
  description: string;
  fullIntro?: string;
  length?: string;
  duration?: string;
  highlights?: string[];
  gallery?: string[];
}

export interface RoutePoint {
  id: string;
  name: string;
  description: string;
  image: string;
  coordinate: { x: number, y: number }; // Relative position for mini-map
}

export interface RoadBook {
  id: string;
  title: string;
  author: string;
  type: 'official' | 'niche';
  image: string;
  intro: string;
  points: RoutePoint[];
}

export interface Stay {
  id: string;
  name: string;
  type: 'camping' | 'hotel' | 'bnb' | 'hostel';
  image: string;
  price: string;
  rating: string;
  tags: string[];
}

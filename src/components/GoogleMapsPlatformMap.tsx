import React, { useState, useEffect, useRef } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow, 
  useMap 
} from '@vis.gl/react-google-maps';
import { 
  Navigation, 
  Car, 
  Compass, 
  MapPin, 
  Sparkles, 
  Phone, 
  Search,
  ExternalLink
} from 'lucide-react';
import { Venue, ParkingZone } from '../types/navratri';

interface GoogleMapsPlatformMapProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onSelectVenue: (venue: Venue) => void;
  onBookPass: (venue: Venue) => void;
  onCallOrganizer: (venue: Venue) => void;
  heightClass?: string;
  apiKey?: string;
}

// Controller component to pan/zoom map programmatically
const MapController: React.FC<{ target: { lat: number; lng: number } | null }> = ({ target }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !target) return;
    map.panTo(target);
    map.setZoom(14);
  }, [map, target]);

  return null;
};

export const GoogleMapsPlatformMap: React.FC<GoogleMapsPlatformMapProps> = ({
  venues,
  selectedVenue,
  onSelectVenue,
  onBookPass,
  onCallOrganizer,
  heightClass = 'h-[620px]',
  apiKey = (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDPVOcOKfkAEMKnVgUVZF7Gm5g1LT19WXo'
}) => {
  const [activeFilter, setActiveFilter] = useState<'parking' | 'shuttle' | 'crowd'>('parking');
  const [activeInfoWindow, setActiveInfoWindow] = useState<Venue | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapError, setMapError] = useState<string | null>(null);

  const defaultCenter = { lat: 23.0850, lng: 72.5200 };
  const center = selectedVenue ? { lat: selectedVenue.lat, lng: selectedVenue.lng } : defaultCenter;

  const activeVenue = selectedVenue || venues[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const matched = venues.find(v => 
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matched) {
      onSelectVenue(matched);
      setActiveInfoWindow(matched);
    }
  };

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden shadow-2xl border border-[#222938] bg-[#0a0e16]`}>
      <APIProvider apiKey={apiKey}>
        <Map
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
          defaultCenter={center}
          defaultZoom={13}
          gestureHandling="greedy"
          disableDefaultUI={false}
          className="w-full h-full"
          colorScheme="DARK"
        >
          <MapController target={selectedVenue ? { lat: selectedVenue.lat, lng: selectedVenue.lng } : null} />

          {/* Venue Markers using AdvancedMarker */}
          {venues.map((venue) => {
            const isSelected = selectedVenue?.id === venue.id;

            return (
              <AdvancedMarker
                key={venue.id}
                position={{ lat: venue.lat, lng: venue.lng }}
                onClick={() => {
                  onSelectVenue(venue);
                  setActiveInfoWindow(venue);
                }}
                title={venue.name}
              >
                <div className="relative flex flex-col items-center cursor-pointer group">
                  {isSelected && (
                    <span className="absolute -top-1 w-12 h-12 rounded-full bg-[#facc15]/30 animate-ping pointer-events-none" />
                  )}
                  <div className={`w-8 h-8 rounded-full ${isSelected ? 'bg-[#facc15] ring-4 ring-[#facc15]/50' : 'bg-[#181c24] border-2 border-[#facc15]'} flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110`}>
                    <span className={`text-xs font-bold ${isSelected ? 'text-[#0f131c]' : 'text-[#facc15]'}`}>
                      🪔
                    </span>
                  </div>
                  <div className="mt-1 px-2 py-0.5 rounded bg-[#0f131c]/95 border border-[#334155] shadow-lg pointer-events-none">
                    <span className="text-[10px] font-bold text-[#facc15] whitespace-nowrap">
                      {venue.name.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </AdvancedMarker>
            );
          })}

          {/* Parking Zone Markers */}
          {activeFilter === 'parking' && venues.flatMap(v => v.parkingZones).map((pz) => {
            const statusColor = 
              pz.status === 'flowing' ? '#10b981' :
              pz.status === 'filling' ? '#facc15' : '#dc2626';

            return (
              <AdvancedMarker
                key={pz.id}
                position={{ lat: pz.lat, lng: pz.lng }}
                title={`${pz.name} - ${pz.availableSpots} spots`}
              >
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0f131c]/90 border border-[#334155] shadow-xl text-[9px] font-extrabold uppercase whitespace-nowrap cursor-pointer hover:scale-105 transition-transform">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} />
                  <span style={{ color: statusColor }}>
                    {pz.name.split(' ')[0]} • {pz.status === 'full' ? 'FULL' : `${pz.availableSpots} SPOTS`}
                  </span>
                </div>
              </AdvancedMarker>
            );
          })}

          {/* InfoWindow for selected venue */}
          {activeInfoWindow && (
            <InfoWindow
              position={{ lat: activeInfoWindow.lat, lng: activeInfoWindow.lng }}
              onCloseClick={() => setActiveInfoWindow(null)}
              headerContent={
                <div className="font-bold text-white text-xs">{activeInfoWindow.name}</div>
              }
            >
              <div className="p-1 max-w-[220px] text-xs text-[#dfe2ee]">
                <p className="text-[11px] text-[#94a3b8] mb-1.5">{activeInfoWindow.area}</p>
                <p className="text-[11px] mb-2">Headliner: <strong className="text-white">{activeInfoWindow.artistHeadliner}</strong></p>
                <div className="flex items-center justify-between text-[11px] mb-2 font-semibold">
                  <span className="text-[#facc15]">Pass: ₹{activeInfoWindow.ticketTiers[0]?.price || 499}</span>
                  <span className="text-emerald-400">{activeInfoWindow.parkingZones[0]?.availableSpots || 0} parking spots</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={() => onBookPass(activeInfoWindow)}
                    className="py-1 px-2 rounded bg-[#facc15] text-[#0f131c] font-bold text-[10px]"
                  >
                    Book Pass
                  </button>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${activeInfoWindow.lat},${activeInfoWindow.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1 px-2 rounded bg-[#2563eb] text-white font-bold text-[10px] text-center"
                  >
                    Navigate
                  </a>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

      {/* Top Filter Buttons & Google Maps Search */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pointer-events-none">
        {/* Layer Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#0f131c]/90 backdrop-blur-md p-1.5 rounded-xl border border-[#334155] shadow-xl pointer-events-auto">
          <button
            onClick={() => setActiveFilter('parking')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === 'parking'
                ? 'bg-[#facc15] text-[#0f131c]'
                : 'bg-[#181c24] text-[#94a3b8] hover:text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeFilter === 'parking' ? 'bg-[#0f131c]' : 'bg-emerald-400'}`} />
            Parking Spots
          </button>
          <button
            onClick={() => setActiveFilter('shuttle')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === 'shuttle'
                ? 'bg-[#facc15] text-[#0f131c]'
                : 'bg-[#181c24] text-[#94a3b8] hover:text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeFilter === 'shuttle' ? 'bg-[#0f131c]' : 'bg-[#2563eb]'}`} />
            Shuttle Routes
          </button>
          <button
            onClick={() => setActiveFilter('crowd')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === 'crowd'
                ? 'bg-[#facc15] text-[#0f131c]'
                : 'bg-[#181c24] text-[#94a3b8] hover:text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeFilter === 'crowd' ? 'bg-[#0f131c]' : 'bg-[#dc2626]'}`} />
            Crowd Heatmap
          </button>
        </div>

        {/* Google Maps Search Bar */}
        <form 
          onSubmit={handleSearchSubmit}
          className="flex items-center gap-1 bg-[#0f131c]/90 backdrop-blur-md p-1.5 rounded-xl border border-[#334155] shadow-xl pointer-events-auto w-full md:w-auto"
        >
          <Search className="w-3.5 h-3.5 text-[#facc15] ml-1.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Google Maps places..."
            className="bg-transparent text-xs text-white placeholder-[#94a3b8] outline-none px-2 py-0.5 w-44 md:w-52 border-none"
          />
          <button
            type="submit"
            className="px-2.5 py-1 rounded-md bg-[#222938] hover:bg-[#31353e] text-[#facc15] text-[11px] font-bold transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Floating Bottom Card: Live Venue Telemetry & Direct Navigation */}
      {activeVenue && (
        <div className="absolute bottom-4 left-4 right-4 z-30 bg-[#0f131c]/95 backdrop-blur-xl p-4 lg:p-5 rounded-2xl border border-[#334155] shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Venue Info */}
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#222938] border border-[#334155] flex items-center justify-center text-[#facc15] shrink-0 shadow">
                <MapPin className="w-6 h-6 text-[#facc15]" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-white leading-tight">
                    {activeVenue.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-[#facc15]/20 text-[#facc15] text-[10px] font-bold border border-[#facc15]/30 uppercase">
                    {activeVenue.parkingZones[0]?.gate || 'Gate #1 Entry'}
                  </span>
                  <span className="text-xs text-[#94a3b8]">
                    • Headliner: <strong className="text-white">{activeVenue.artistHeadliner}</strong>
                  </span>
                </div>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  {activeVenue.address} • {activeVenue.parkingZones[0]?.walkTimeMins || 3} min walk from parking
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {activeVenue.metroShuttle && (
                <div className="hidden sm:flex items-center gap-2 bg-[#181c24] px-3 py-1.5 rounded-xl border border-[#334155]">
                  <div className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[#94a3b8]">
                      {activeVenue.metroShuttle.routeName.split('(')[0]}
                    </span>
                    <span className="text-xs font-bold text-white">
                      Next in {activeVenue.metroShuttle.nextInMins}m
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={() => onCallOrganizer(activeVenue)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#222938] hover:bg-[#31353e] text-[#dfe2ee] font-semibold text-xs border border-[#334155] transition-colors"
                title="Call Ground Control"
              >
                <Phone className="w-3.5 h-3.5 text-[#facc15]" />
                <span className="hidden sm:inline">Call</span>
              </button>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activeVenue.lat},${activeVenue.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate Gate</span>
              </a>

              <button
                onClick={() => onBookPass(activeVenue)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#facc15] hover:bg-[#eab308] text-[#0f131c] font-bold text-xs shadow transition-all"
              >
                <span>Book Pass ₹{activeVenue.ticketTiers[0]?.price || 499}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

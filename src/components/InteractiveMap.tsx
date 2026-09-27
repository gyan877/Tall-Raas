import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Navigation, 
  Car, 
  Compass, 
  Layers, 
  ExternalLink, 
  MapPin, 
  RefreshCw,
  Search,
  Sparkles,
  Phone
} from 'lucide-react';
import { Venue, ParkingZone } from '../types/navratri';
import { GoogleMapsPlatformMap } from './GoogleMapsPlatformMap';

interface InteractiveMapProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onSelectVenue: (venue: Venue) => void;
  onBookPass: (venue: Venue) => void;
  onCallOrganizer: (venue: Venue) => void;
  heightClass?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  venues,
  selectedVenue,
  onSelectVenue,
  onBookPass,
  onCallOrganizer,
  heightClass = 'h-[620px]'
}) => {
  const [mapEngine, setMapEngine] = useState<'google' | 'leaflet'>('google');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeFilter, setActiveFilter] = useState<'parking' | 'shuttle' | 'crowd' | 'rentals'>('parking');
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [searchingMaps, setSearchingMaps] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Default center: Ahmedabad SG Highway
  const defaultCenter: [number, number] = [23.0850, 72.5200];
  const center = selectedVenue ? [selectedVenue.lat, selectedVenue.lng] as [number, number] : defaultCenter;

  if (mapEngine === 'google') {
    return (
      <div className="relative">
        <div className="absolute top-4 right-4 z-40">
          <button
            onClick={() => setMapEngine('leaflet')}
            className="px-2.5 py-1 rounded-lg bg-[#0f131c]/90 border border-[#334155] text-[10px] font-bold text-[#94a3b8] hover:text-white transition-colors pointer-events-auto"
            title="Switch map view"
          >
            Street Map
          </button>
        </div>
        <GoogleMapsPlatformMap
          venues={venues}
          selectedVenue={selectedVenue}
          onSelectVenue={onSelectVenue}
          onBookPass={onBookPass}
          onCallOrganizer={onCallOrganizer}
          heightClass={heightClass}
        />
      </div>
    );
  }

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: selectedVenue ? 14 : 12,
      zoomControl: false,
      attributionControl: false
    });

    // Dark CartoDB Matter tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      className: 'dark-map-tiles'
    }).addTo(map);

    // Label overlay with high contrast
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      opacity: 0.8
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update center when selected venue changes
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedVenue) return;
    mapInstanceRef.current.flyTo([selectedVenue.lat, selectedVenue.lng], 14, {
      duration: 1.2
    });
  }, [selectedVenue]);

  // Render markers and telemetry
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const markersGroup = markersLayerRef.current;
    markersGroup.clearLayers();

    // 1. Render Venue Markers
    venues.forEach((venue) => {
      const isSelected = selectedVenue?.id === venue.id;

      // Custom pulsing gold icon
      const venueHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          ${isSelected ? '<span class="absolute w-12 h-12 rounded-full bg-[#facc15]/30 animate-ping"></span>' : ''}
          <div class="w-8 h-8 rounded-full ${isSelected ? 'bg-[#facc15] ring-4 ring-[#facc15]/40' : 'bg-[#181c24] border-2 border-[#facc15]'} flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
            <span class="text-xs font-bold ${isSelected ? 'text-[#0f131c]' : 'text-[#facc15]'}">🪔</span>
          </div>
          <div class="absolute bottom-full mb-1 flex flex-col items-center pointer-events-none">
            <span class="px-2 py-0.5 rounded bg-[#0f131c]/95 text-[#facc15] text-[10px] font-bold shadow-md border border-[#334155] whitespace-nowrap">
              ${venue.name}
            </span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: venueHtml,
        className: 'custom-venue-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([venue.lat, venue.lng], { icon: customIcon });

      marker.on('click', () => {
        onSelectVenue(venue);
      });

      markersGroup.addLayer(marker);

      // 2. Render Parking Zone Markers if filter is active
      if (activeFilter === 'parking' || activeFilter === 'crowd') {
        venue.parkingZones.forEach((pz) => {
          const statusBg = 
            pz.status === 'flowing' ? 'bg-emerald-500' :
            pz.status === 'filling' ? 'bg-[#facc15]' : 'bg-[#dc2626]';
          
          const statusText = 
            pz.status === 'flowing' ? 'text-emerald-400' :
            pz.status === 'filling' ? 'text-[#facc15]' : 'text-[#dc2626]';

          const parkingHtml = `
            <div class="flex items-center gap-1 bg-[#0f131c]/95 px-2 py-0.5 rounded-full border border-[#334155] shadow-lg cursor-pointer hover:scale-105 transition-transform">
              <span class="w-2 h-2 rounded-full ${statusBg} ${pz.status === 'filling' ? 'animate-pulse' : ''}"></span>
              <span class="text-[9px] font-extrabold ${statusText} tracking-wider uppercase whitespace-nowrap">
                ${pz.name.split(' ')[0]} • ${pz.status === 'full' ? 'FULL' : `${pz.availableSpots} SPOTS`}
              </span>
            </div>
          `;

          const pIcon = L.divIcon({
            html: parkingHtml,
            className: 'custom-parking-pin',
            iconSize: [110, 24],
            iconAnchor: [55, 12]
          });

          const pMarker = L.marker([pz.lat, pz.lng], { icon: pIcon });
          pMarker.bindPopup(`
            <div class="p-1 text-xs">
              <p class="font-bold text-white mb-0.5">${pz.name}</p>
              <p class="text-[11px] text-[#94a3b8] mb-1">${venue.name} • Gate: ${pz.gate}</p>
              <div class="flex items-center justify-between text-[11px]">
                <span class="${statusText} font-semibold">${pz.availableSpots} / ${pz.totalSpots} spots free</span>
                <span class="text-[#dfe2ee]">${pz.walkTimeMins} min walk</span>
              </div>
            </div>
          `);
          markersGroup.addLayer(pMarker);

          // Route dashed line between venue and parking lot
          if (isSelected) {
            const polyline = L.polyline([[venue.lat, venue.lng], [pz.lat, pz.lng]], {
              color: pz.status === 'flowing' ? '#10b981' : pz.status === 'filling' ? '#facc15' : '#dc2626',
              weight: 3,
              opacity: 0.7,
              dashArray: '4, 6'
            });
            markersGroup.addLayer(polyline);
          }
        });
      }

      // 3. Render Shuttle Routes if active
      if (activeFilter === 'shuttle' && venue.metroShuttle) {
        // Draw decorative route line
        const metroCoords: [number, number][] = [
          [venue.lat + 0.015, venue.lng - 0.012],
          [venue.lat + 0.008, venue.lng - 0.005],
          [venue.lat, venue.lng]
        ];
        const shuttleLine = L.polyline(metroCoords, {
          color: '#3b82f6',
          weight: 4,
          opacity: 0.85,
          dashArray: '8, 8'
        });
        markersGroup.addLayer(shuttleLine);
      }
    });

  }, [venues, selectedVenue, activeFilter]);

  // SerpAPI / Google Maps Places Search
  const handleSerpApiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapSearchQuery.trim()) return;

    setSearchingMaps(true);
    try {
      const res = await fetch(`/api/places/search?q=${encodeURIComponent(mapSearchQuery)}`);
      const data = await res.json();
      
      // Filter or find in existing venues first
      const matched = venues.find(v => 
        v.name.toLowerCase().includes(mapSearchQuery.toLowerCase()) ||
        v.area.toLowerCase().includes(mapSearchQuery.toLowerCase()) ||
        v.city.toLowerCase().includes(mapSearchQuery.toLowerCase())
      );

      if (matched) {
        onSelectVenue(matched);
      } else {
        // Center around query in Gujarat if coordinates known or fallback
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([23.0500, 72.5300], 13);
        }
      }
    } catch (err) {
      console.warn('Map search lookup:', err);
    } finally {
      setSearchingMaps(false);
    }
  };

  const activeVenue = selectedVenue || venues[0];

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden shadow-2xl border border-[#222938] bg-[#0a0e16]`}>
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Filter Buttons & Google Maps SerpAPI Search */}
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

        {/* Google Maps / SerpAPI Search Box */}
        <form 
          onSubmit={handleSerpApiSearch}
          className="flex items-center gap-1 bg-[#0f131c]/90 backdrop-blur-md p-1.5 rounded-xl border border-[#334155] shadow-xl pointer-events-auto w-full md:w-auto"
        >
          <Search className="w-3.5 h-3.5 text-[#facc15] ml-1.5 shrink-0" />
          <input
            type="text"
            value={mapSearchQuery}
            onChange={(e) => setMapSearchQuery(e.target.value)}
            placeholder="Search Google Maps places..."
            className="bg-transparent text-xs text-white placeholder-[#94a3b8] outline-none px-2 py-0.5 w-44 md:w-52 border-none"
          />
          <button
            type="submit"
            disabled={searchingMaps}
            className="px-2.5 py-1 rounded-md bg-[#222938] hover:bg-[#31353e] text-[#facc15] text-[11px] font-bold transition-colors"
          >
            {searchingMaps ? '...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Map Controls (Zoom / Recenter) */}
      <div className="absolute top-20 right-4 z-20 flex flex-col gap-1.5 bg-[#0f131c]/90 backdrop-blur-md p-1 rounded-lg border border-[#334155] shadow-xl">
        <button
          onClick={() => mapInstanceRef.current?.zoomIn()}
          className="w-8 h-8 rounded bg-[#181c24] hover:bg-[#222938] text-white font-bold flex items-center justify-center transition-colors"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={() => mapInstanceRef.current?.zoomOut()}
          className="w-8 h-8 rounded bg-[#181c24] hover:bg-[#222938] text-white font-bold flex items-center justify-center transition-colors"
          title="Zoom Out"
        >
          −
        </button>
        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.flyTo([activeVenue.lat, activeVenue.lng], 14);
            }
          }}
          className="w-8 h-8 rounded bg-[#181c24] hover:bg-[#222938] text-[#facc15] flex items-center justify-center transition-colors"
          title="Recenter to active venue"
        >
          <Compass className="w-4 h-4" />
        </button>
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

            {/* Live Telemetry Pill & Action Buttons */}
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

              {/* Call Organizer Button */}
              <button
                onClick={() => onCallOrganizer(activeVenue)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#222938] hover:bg-[#31353e] text-[#dfe2ee] font-semibold text-xs border border-[#334155] transition-colors"
                title="Call Ground Control"
              >
                <Phone className="w-3.5 h-3.5 text-[#facc15]" />
                <span className="hidden sm:inline">Call</span>
              </button>

              {/* Google Maps External Turn-by-Turn Navigation */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activeVenue.lat},${activeVenue.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate Gate</span>
              </a>

              {/* Instant Book Pass */}
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

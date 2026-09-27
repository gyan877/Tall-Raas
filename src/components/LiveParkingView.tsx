import React, { useState } from 'react';
import { 
  Car, 
  MapPin, 
  Navigation, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Bus, 
  Shield, 
  Filter, 
  ExternalLink,
  PhoneCall,
  Search
} from 'lucide-react';
import { Venue, ParkingZone } from '../types/navratri';
import { InteractiveMap } from './InteractiveMap';

interface LiveParkingViewProps {
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
  onBookPass: (venue: Venue) => void;
  onCallOrganizer: (venue: Venue) => void;
}

export const LiveParkingView: React.FC<LiveParkingViewProps> = ({
  venues,
  onSelectVenue,
  onBookPass,
  onCallOrganizer
}) => {
  const [filterType, setFilterType] = useState<'all' | 'available' | 'flowing' | 'valet'>('all');
  const [selectedZone, setSelectedZone] = useState<{ venue: Venue; zone: ParkingZone } | null>(null);
  const [parkingSearch, setParkingSearch] = useState('');

  // Collect all parking zones with their parent venue
  const allZones = venues.flatMap(venue => 
    venue.parkingZones.map(zone => ({ venue, zone }))
  );

  const filteredZones = allZones.filter(({ venue, zone }) => {
    if (parkingSearch) {
      const q = parkingSearch.toLowerCase();
      const matchVenue = venue.name.toLowerCase().includes(q) || venue.area.toLowerCase().includes(q);
      const matchZone = zone.name.toLowerCase().includes(q) || zone.gate.toLowerCase().includes(q);
      if (!matchVenue && !matchZone) return false;
    }

    if (filterType === 'available') return zone.availableSpots > 0;
    if (filterType === 'flowing') return zone.status === 'flowing';
    if (filterType === 'valet') return zone.name.toLowerCase().includes('valet');
    return true;
  });

  const totalCapacity = allZones.reduce((acc, curr) => acc + curr.zone.totalSpots, 0);
  const totalAvailable = allZones.reduce((acc, curr) => acc + curr.zone.availableSpots, 0);
  const occupancyPercent = Math.round(((totalCapacity - totalAvailable) / totalCapacity) * 100);

  return (
    <div className="w-full flex flex-col gap-8 pb-16">
      {/* Hero Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181c24] text-[#facc15] text-xs font-bold uppercase tracking-wider border border-[#334155]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Sensor Telemetry: {totalAvailable} Available Slots
            </span>
            <span className="text-xs text-[#94a3b8] uppercase tracking-wider font-semibold">
              Ahmedabad • SG Highway • Vadodara
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Live <span className="text-[#facc15]">Parking</span> &amp; Transit
          </h1>
          <p className="text-sm md:text-base text-[#94a3b8] leading-relaxed">
            Avoid nocturnal festival bottlenecks. View real-time gate occupancies, valet reservations, shuttle departures, and direct Google Maps navigation to entry arches.
          </p>
        </div>

        {/* Global Occupancy Card */}
        <div className="flex items-center gap-4 bg-[#181c24] border border-[#334155] p-3.5 rounded-2xl shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-[#222938] flex items-center justify-center text-[#facc15]">
            <Car className="w-6 h-6 text-[#facc15]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[#94a3b8] uppercase font-bold tracking-wider">
              Network Occupancy
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">{occupancyPercent}%</span>
              <span className="text-xs text-emerald-400 font-semibold">
                ({totalAvailable} of {totalCapacity} Free)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map View with Parking Layers */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#facc15]" />
            Live Ground &amp; Gate Satellite Overview
          </span>
          <span className="text-xs text-[#94a3b8]">
            Click any pin to inspect entry gate directions
          </span>
        </div>
        <InteractiveMap
          venues={venues}
          selectedVenue={selectedZone?.venue || venues[0]}
          onSelectVenue={(v) => onSelectVenue(v)}
          onBookPass={onBookPass}
          onCallOrganizer={onCallOrganizer}
          heightClass="h-[460px]"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#181c24] border border-[#222938] p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-[#facc15] text-[#0f131c]'
                : 'bg-[#222938] text-[#94a3b8] hover:text-white'
            }`}
          >
            All Lots ({allZones.length})
          </button>
          <button
            onClick={() => setFilterType('available')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterType === 'available'
                ? 'bg-[#facc15] text-[#0f131c]'
                : 'bg-[#222938] text-[#94a3b8] hover:text-white'
            }`}
          >
            Plenty of Space
          </button>
          <button
            onClick={() => setFilterType('flowing')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterType === 'flowing'
                ? 'bg-[#facc15] text-[#0f131c]'
                : 'bg-[#222938] text-[#94a3b8] hover:text-white'
            }`}
          >
            Flowing Traffic Only
          </button>
          <button
            onClick={() => setFilterType('valet')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterType === 'valet'
                ? 'bg-[#facc15] text-[#0f131c]'
                : 'bg-[#222938] text-[#94a3b8] hover:text-white'
            }`}
          >
            Valet Reserved
          </button>
        </div>

        {/* Search input */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#222938] rounded-xl border border-[#334155] w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-[#94a3b8] shrink-0" />
          <input
            type="text"
            value={parkingSearch}
            onChange={(e) => setParkingSearch(e.target.value)}
            placeholder="Search venue or lot..."
            className="bg-transparent text-xs text-white placeholder-[#94a3b8] outline-none flex-1 border-none py-0"
          />
        </div>
      </div>

      {/* Parking Zone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredZones.map(({ venue, zone }) => {
          const statusBg =
            zone.status === 'flowing' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
            zone.status === 'filling' ? 'bg-[#facc15]/20 text-[#facc15] border-[#facc15]/40' :
            'bg-[#dc2626]/20 text-[#f87171] border-[#dc2626]/40';

          const statusText =
            zone.status === 'flowing' ? 'Flowing Smoothly' :
            zone.status === 'filling' ? 'Filling Fast' : 'Lot Full / Divert';

          const fillPercentage = Math.round(((zone.totalSpots - zone.availableSpots) / zone.totalSpots) * 100);

          return (
            <div
              key={`${venue.id}-${zone.id}`}
              className="bg-[#181c24] border border-[#222938] hover:border-[#334155] rounded-2xl p-5 shadow-lg flex flex-col justify-between gap-4 transition-all"
            >
              <div className="flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-[#94a3b8] font-semibold uppercase tracking-wider">
                      {venue.name}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {zone.name}
                    </h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusBg}`}>
                    {statusText}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#94a3b8]">Occupancy</span>
                    <span className="font-bold text-white">
                      {zone.availableSpots} of {zone.totalSpots} free ({fillPercentage}% full)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#222938] overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        zone.status === 'flowing' ? 'bg-emerald-500' :
                        zone.status === 'filling' ? 'bg-[#facc15]' : 'bg-[#dc2626]'
                      }`}
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 rounded-xl bg-[#222938] flex flex-col">
                    <span className="text-[10px] text-[#94a3b8] uppercase font-semibold">Entry Gate</span>
                    <span className="font-bold text-white">{zone.gate}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#222938] flex flex-col">
                    <span className="text-[10px] text-[#94a3b8] uppercase font-semibold">Walk to Lawn</span>
                    <span className="font-bold text-[#facc15] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {zone.walkTimeMins} mins
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${zone.lat},${zone.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Google Maps Route
                </a>
                <button
                  onClick={() => onCallOrganizer(venue)}
                  className="p-2 rounded-xl bg-[#222938] hover:bg-[#31353e] text-[#dfe2ee] border border-[#334155] transition-colors"
                  title="Call Ground Security"
                >
                  <PhoneCall className="w-4 h-4 text-[#facc15]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Metro Shuttle Transit Section */}
      <div className="bg-[#181c24] border border-[#222938] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#222938] border border-[#334155] flex items-center justify-center text-[#3b82f6]">
              <Bus className="w-5 h-5 text-[#3b82f6]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Official Navratri Metro Feeder Shuttles</h3>
              <p className="text-xs text-[#94a3b8]">Free AC shuttles linking major Metro stations directly to ground gates</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-[#222938] text-emerald-400 text-xs font-bold border border-emerald-500/30">
            Running 7:30 PM – 2:30 AM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-[#222938] border border-[#334155] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Route #7: Thaltej Metro ↔ Shankus Mahotsav</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Departing in 4m
              </span>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Picks up at Thaltej Cross Road Concourse Gate 2. Dedicated express lane on SG Highway. Drops at Shankus Gate 3.
            </p>
            <div className="flex items-center justify-between text-xs text-[#facc15] pt-1 font-semibold">
              <span>Frequency: Every 15 mins</span>
              <span className="text-emerald-400">Zero Traffic Delay</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#222938] border border-[#334155] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Route #3: Bopal Junction ↔ Mirchi Rock N Dhol</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#facc15]/20 text-[#facc15] border border-[#facc15]/30">
                Departing in 8m
              </span>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Loops around SP Ring Road and Amanora Ground. Direct drop-off at Gate 4 Fountain court.
            </p>
            <div className="flex items-center justify-between text-xs text-[#facc15] pt-1 font-semibold">
              <span>Frequency: Every 20 mins</span>
              <span className="text-[#dfe2ee]">Wheelchair Accessible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

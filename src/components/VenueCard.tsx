import React, { useState } from 'react';
import { 
  MapPin, 
  Ticket, 
  Phone, 
  Navigation, 
  Sparkles, 
  Clock, 
  Car, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Venue } from '../types/navratri';

interface VenueCardProps {
  venue: Venue;
  isSelected: boolean;
  onSelect: () => void;
  onBookPass: () => void;
  onViewParking: () => void;
  onCallOrganizer: () => void;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  isSelected,
  onSelect,
  onBookPass,
  onViewParking,
  onCallOrganizer
}) => {
  const [expanded, setExpanded] = useState(false);

  const primaryParking = venue.parkingZones[0] || {
    name: 'Zone A',
    availableSpots: 100,
    status: 'flowing',
    gate: 'Gate 1'
  };

  const statusColor = 
    primaryParking.status === 'flowing' ? 'text-emerald-400' :
    primaryParking.status === 'filling' ? 'text-[#facc15]' : 'text-[#dc2626]';

  const statusDot = 
    primaryParking.status === 'flowing' ? 'bg-emerald-400' :
    primaryParking.status === 'filling' ? 'bg-[#facc15] animate-pulse' : 'bg-[#dc2626]';

  const lowestPrice = Math.min(...venue.ticketTiers.map(t => t.price));

  return (
    <article 
      className={`group relative flex flex-col bg-[#181c24] border rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${
        isSelected ? 'border-[#facc15] ring-2 ring-[#facc15]/30' : 'border-[#222938] hover:border-[#334155]'
      }`}
    >
      {/* Venue Header Image */}
      <div className="relative w-full h-48 overflow-hidden bg-[#222938] cursor-pointer" onClick={onSelect}>
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181c24] via-[#181c24]/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-[#0f131c]/90 text-[#facc15] text-[11px] font-bold uppercase tracking-wider border border-[#334155] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#facc15] animate-ping" />
            {venue.featuredTag}
          </span>
          {venue.organizer.verified && (
            <span className="px-2.5 py-1 rounded-full bg-[#0f131c]/90 text-emerald-400 text-[11px] font-semibold border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Verified Desk
            </span>
          )}
        </div>

        {/* Bottom Banner inside Image */}
        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-md bg-[#0f131c]/90 text-[#dfe2ee] text-[11px] font-medium border border-[#334155] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#facc15]" />
            {venue.area}
          </span>
          <span className="text-lg font-extrabold text-[#facc15] drop-shadow">
            ₹{lowestPrice}
            <span className="text-xs font-normal text-[#94a3b8]"> / pass</span>
          </span>
        </div>
      </div>

      {/* Venue Body */}
      <div className="p-5 flex flex-col gap-3.5 flex-grow justify-between">
        <div className="flex flex-col gap-2">
          {/* Title & Sangath Match */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 
                className="text-lg font-bold text-white group-hover:text-[#facc15] transition-colors leading-snug cursor-pointer"
                onClick={onSelect}
              >
                {venue.name}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-[#94a3b8] mt-1">
                <Sparkles className="w-3.5 h-3.5 text-[#facc15] shrink-0" />
                <span>Headlining: <strong className="text-white">{venue.artistHeadliner}</strong></span>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <span className="text-lg font-extrabold text-[#facc15] leading-none">
                {venue.sangathMatchPercent}%
              </span>
              <span className="text-[9px] uppercase font-bold text-[#94a3b8] tracking-wider">
                Sangath Match
              </span>
            </div>
          </div>

          {/* Description snippet */}
          <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-2">
            {venue.description}
          </p>

          {/* Live Parking Status Bar */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#222938] border border-[#334155]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#facc15]/20 text-[#facc15] flex items-center justify-center font-bold text-xs shrink-0">
                P
              </span>
              <span className="text-xs font-semibold text-white">
                {primaryParking.name}
              </span>
              <span className="text-[11px] text-[#94a3b8]">
                ({primaryParking.availableSpots} spots left)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${statusDot}`} />
              <span className={`text-[11px] uppercase font-bold ${statusColor}`}>
                {primaryParking.status === 'flowing' ? 'Flowing' : primaryParking.status === 'filling' ? 'Filling' : 'Lot Full'}
              </span>
            </div>
          </div>

          {/* Expandable details toggle */}
          {expanded && (
            <div className="mt-1 pt-3 border-t border-[#222938] flex flex-col gap-2.5 text-xs animate-fadeIn">
              <div className="flex items-center justify-between text-[#94a3b8]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#facc15]" /> Timings:
                </span>
                <span className="font-semibold text-white">{venue.schedule.startTime} – {venue.schedule.endTime}</span>
              </div>
              <div className="flex items-center justify-between text-[#94a3b8]">
                <span>Maha Aarti:</span>
                <span className="font-semibold text-[#facc15]">{venue.schedule.aartiTime}</span>
              </div>
              {venue.dressCode && (
                <div className="p-2 rounded-lg bg-[#0f131c] border border-[#334155] text-[11px] text-[#dfe2ee]">
                  <span className="font-bold text-[#facc15]">Dress Code:</span> {venue.dressCode}
                </div>
              )}
              {venue.organizer.announcements.length > 0 && (
                <div className="p-2 rounded-lg bg-[#222938] border border-[#dc2626]/30 text-[11px] text-white flex flex-col gap-1">
                  <span className="font-bold text-[#dc2626] flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Live Ground Bulletin:
                  </span>
                  <span>{venue.organizer.announcements[0]}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Actions */}
        <div className="pt-2 flex flex-col gap-2">
          {/* Main Action Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onBookPass}
              className="py-2.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5"
            >
              <Ticket className="w-3.5 h-3.5" />
              Book Pass
            </button>
            <button
              onClick={onViewParking}
              className="py-2.5 rounded-xl bg-[#222938] hover:bg-[#31353e] text-[#dfe2ee] font-semibold text-xs border border-[#334155] transition-colors flex items-center justify-center gap-1.5"
            >
              <Car className="w-3.5 h-3.5 text-[#facc15]" />
              View Parking
            </button>
          </div>

          {/* Secondary Action Row: Call Organizer + Google Maps Directions + Expand */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={onCallOrganizer}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#181c24] hover:bg-[#222938] text-[#94a3b8] hover:text-[#facc15] text-[11px] font-semibold border border-[#334155] transition-colors flex items-center justify-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#facc15]" />
              Call Desk
            </button>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#181c24] hover:bg-[#222938] text-[#94a3b8] hover:text-[#2563eb] text-[11px] font-semibold border border-[#334155] transition-colors flex items-center justify-center gap-1"
            >
              <Navigation className="w-3 h-3 text-[#2563eb]" />
              Maps Route
            </a>

            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-lg bg-[#181c24] hover:bg-[#222938] text-[#94a3b8] border border-[#334155] transition-colors"
              title={expanded ? 'Less info' : 'More info'}
            >
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

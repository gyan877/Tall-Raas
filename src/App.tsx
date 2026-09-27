import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Search, 
  Filter, 
  Ticket, 
  Car, 
  Users, 
  Clock, 
  Compass, 
  ShieldCheck, 
  ChevronRight, 
  Radio, 
  Navigation, 
  Layers, 
  AlertCircle
} from 'lucide-react';
import { Header } from './components/Header';
import { InteractiveMap } from './components/InteractiveMap';
import { VenueCard } from './components/VenueCard';
import { LiveParkingView } from './components/LiveParkingView';
import { RaasSangathMatch } from './components/RaasSangathMatch';
import { OrganizerDesk } from './components/OrganizerDesk';
import { PassBookingModal } from './components/PassBookingModal';
import { PassWalletModal } from './components/PassWalletModal';
import { CallOrganizerModal } from './components/CallOrganizerModal';
import { NotificationsModal } from './components/NotificationsModal';
import { INITIAL_VENUES, INITIAL_SANGATH_PROFILES, INITIAL_SAFE_HUBS } from './data/initialData';
import { Venue, SangathProfile, BookedPass, SafeMeetupHub } from './types/navratri';

export default function App() {
  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<'explore' | 'parking' | 'sangath' | 'organizer'>('explore');
  const [selectedCity, setSelectedCity] = useState<string>('ahmedabad');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Navratri night selection
  const [selectedNight, setSelectedNight] = useState<number>(4);

  // Artist & style filters
  const [selectedStyleFilter, setSelectedStyleFilter] = useState<string>('all');
  const [crowdFilter, setCrowdFilter] = useState<'all' | 'Packed' | 'Vibrant' | 'Relaxed'>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'budget' | 'mid' | 'vip'>('all');

  // Venues data with localStorage persistence
  const [venues, setVenues] = useState<Venue[]>(() => {
    try {
      const saved = localStorage.getItem('taal_raas_venues');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_VENUES;
  });

  // Sangath profiles data with localStorage persistence
  const [profiles, setProfiles] = useState<SangathProfile[]>(() => {
    try {
      const saved = localStorage.getItem('taal_raas_profiles');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_SANGATH_PROFILES;
  });

  // Booked Passes with localStorage persistence
  const [bookedPasses, setBookedPasses] = useState<BookedPass[]>(() => {
    try {
      const saved = localStorage.getItem('taal_raas_passes');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'initial-pass-1',
        bookingCode: 'TR-2025-AHM-8821',
        venueId: 'shankus-mahotsav',
        venueName: 'Shankus Dandiya Mahotsav',
        venueArea: 'SG Highway, Ahmedabad',
        nightNumber: 4,
        dateStr: 'Night 4 • Tonight',
        tierName: 'Early Bird Single Pass',
        ticketCount: 1,
        unitPrice: 499,
        totalPrice: 499,
        buyerName: 'Aanya Patel',
        buyerPhone: '+91 98980 12345',
        attendeeNames: ['Aanya Patel'],
        bookedAt: '07:15 PM',
        gateEntry: 'Gate 3 General',
        parkingPassIncluded: true,
        status: 'valid'
      }
    ];
  });

  // Selected venue for map focal point
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(venues[0]);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingVenueTarget, setBookingVenueTarget] = useState<Venue | null>(null);

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callVenueTarget, setCallVenueTarget] = useState<Venue | null>(null);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Sync venues and passes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('taal_raas_venues', JSON.stringify(venues));
    } catch (e) {}
  }, [venues]);

  useEffect(() => {
    try {
      localStorage.setItem('taal_raas_passes', JSON.stringify(bookedPasses));
    } catch (e) {}
  }, [bookedPasses]);

  useEffect(() => {
    try {
      localStorage.setItem('taal_raas_profiles', JSON.stringify(profiles));
    } catch (e) {}
  }, [profiles]);

  // Venue actions
  const handleUpdateVenue = (updated: Venue) => {
    setVenues(prev => prev.map(v => v.id === updated.id ? updated : v));
    if (selectedVenue?.id === updated.id) {
      setSelectedVenue(updated);
    }
  };

  const handleAddVenue = (newVenue: Venue) => {
    setVenues(prev => [newVenue, ...prev]);
    setSelectedVenue(newVenue);
  };

  const handleAddProfile = (newProfile: SangathProfile) => {
    setProfiles(prev => [newProfile, ...prev]);
  };

  const handleCheckInPass = (passId: string) => {
    setBookedPasses(prev => prev.map(p => p.id === passId ? { ...p, status: 'checked-in' as const } : p));
  };

  const handleOpenBooking = (venue?: Venue) => {
    setBookingVenueTarget(venue || selectedVenue || venues[0]);
    setIsBookingOpen(true);
  };

  const handleOpenCallModal = (venue: Venue) => {
    setCallVenueTarget(venue);
    setIsCallModalOpen(true);
  };

  const handleBookingConfirmed = (newPass: BookedPass) => {
    setBookedPasses(prev => [newPass, ...prev]);
  };

  // Filtered venues for Explore screen
  const filteredVenues = venues.filter((v) => {
    // City filter
    if (selectedCity && v.city !== selectedCity) return false;

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = v.name.toLowerCase().includes(q);
      const matchArtist = v.artistHeadliner.toLowerCase().includes(q);
      const matchArea = v.area.toLowerCase().includes(q);
      if (!matchName && !matchArtist && !matchArea) return false;
    }

    // Folk style
    if (selectedStyleFilter !== 'all') {
      if (selectedStyleFilter === 'traditional' && v.artistType !== 'traditional') return false;
      if (selectedStyleFilter === 'united_way' && v.artistType !== 'united_way') return false;
      if (selectedStyleFilter === 'bollywood_fusion' && v.artistType !== 'bollywood_fusion') return false;
      if (selectedStyleFilter === 'high_energy' && v.artistType !== 'high_energy') return false;
      if (selectedStyleFilter === 'folk_contemporary' && v.artistType !== 'folk_contemporary') return false;
    }

    // Crowd
    if (crowdFilter !== 'all' && v.crowdDensity !== crowdFilter) return false;

    // Price
    if (priceFilter !== 'all') {
      const lowestPrice = Math.min(...v.ticketTiers.map(t => t.price));
      if (priceFilter === 'budget' && lowestPrice > 500) return false;
      if (priceFilter === 'mid' && (lowestPrice < 500 || lowestPrice > 1200)) return false;
      if (priceFilter === 'vip' && lowestPrice < 1200) return false;
    }

    return true;
  });

  return (
    <div className="bg-[#0f131c] text-[#dfe2ee] min-h-screen flex flex-col font-sans selection:bg-[#facc15] selection:text-[#0f131c]">
      {/* Top Fixed Header */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        selectedCity={selectedCity}
        onCityChange={(city) => setSelectedCity(city)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        bookedPasses={bookedPasses}
        onOpenPassWallet={() => setIsWalletOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        notificationCount={3}
      />

      {/* Google Maps Quota Defense Banner */}
      {quotaExceeded && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 text-[#facc15] px-4 py-2 text-xs md:text-sm text-center fixed top-20 left-0 right-0 z-40 backdrop-blur-md">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-white hover:text-[#facc15]"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="w-full pt-24 min-h-[calc(100vh-140px)] px-4 lg:px-10 max-w-[1440px] mx-auto flex flex-col flex-1">
        {/* SCREEN 1: EXPLORE VENUES */}
        {currentTab === 'explore' && (
          <div className="flex flex-col gap-8 pb-16">
            {/* Hero Banner Section */}
            <section className="relative w-full overflow-hidden bg-[#0a0e16] p-6 lg:p-8 rounded-3xl border border-[#222938] shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="flex flex-col gap-2 max-w-3xl">
                  <div className="flex items-center gap-2 text-[#facc15] text-xs font-bold uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#facc15] animate-ping" />
                    <span>Live Nocturnal Telemetry • Night 0{selectedNight} of 09</span>
                  </div>
                  <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Find Tonight’s Best Garba Circles &amp; Mahotsavs
                  </h1>
                  <p className="text-sm md:text-base text-[#94a3b8] leading-relaxed">
                    Real-time crowd surges, authentic live folk dhol rhythms, acoustic soundscapes, and parking occupancy metrics across {selectedCity.toUpperCase()}.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#181c24] px-4 py-2 rounded-full border border-[#334155] self-start lg:self-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {filteredVenues.length} Active Grounds Live
                  </span>
                </div>
              </div>

              {/* Night Selector Row */}
              <div className="mt-6 pt-5 border-t border-[#222938] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#facc15]" />
                    Select Navratri Night
                  </span>
                  <span className="text-xs text-[#facc15] font-semibold">
                    Night {selectedNight} Active
                  </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {[
                    { n: 1, label: 'N1 • Oct 03' },
                    { n: 2, label: 'N2 • Oct 04' },
                    { n: 3, label: 'N3 • Oct 05' },
                    { n: 4, label: 'N4 • Tonight' },
                    { n: 5, label: 'N5 • Oct 07' },
                    { n: 6, label: 'N6 • Oct 08' },
                    { n: 7, label: 'N7 • Oct 09' },
                    { n: 8, label: 'N8 • Oct 10' },
                    { n: 9, label: 'N9 • Sharad Purnima' },
                  ].map((item) => (
                    <button
                      key={item.n}
                      onClick={() => setSelectedNight(item.n)}
                      className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                        selectedNight === item.n
                          ? 'bg-[#facc15] text-[#0f131c] shadow-[0_0_15px_rgba(250,204,21,0.35)]'
                          : 'bg-[#181c24] text-[#94a3b8] hover:text-white hover:bg-[#222938] border border-[#334155]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Folk Style Chips */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
                  {[
                    { id: 'all', label: 'All Folk Styles' },
                    { id: 'traditional', label: 'Traditional Gujarati Dhol' },
                    { id: 'united_way', label: 'Atul Purohit / United Way Style' },
                    { id: 'bollywood_fusion', label: 'Bollywood Fusion' },
                    { id: 'high_energy', label: 'Kinjal Dave High-Energy' },
                    { id: 'folk_contemporary', label: 'Sachin-Jigar / Folk Contemporary' }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyleFilter(style.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedStyleFilter === style.id
                          ? 'bg-[#222938] text-[#facc15] border border-[#facc15]/50 shadow'
                          : 'bg-[#181c24] text-[#94a3b8] hover:text-white border border-[#222938]'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>

                {/* Sub-Filters: Radius, Crowd Density, Price Tier */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="flex items-center gap-2 bg-[#181c24] px-3.5 py-2 rounded-xl border border-[#334155]">
                    <MapPin className="w-4 h-4 text-[#facc15] shrink-0" />
                    <div className="flex flex-col flex-1">
                      <span className="text-[10px] uppercase font-bold text-[#94a3b8]">Radius</span>
                      <select className="bg-transparent text-white text-xs font-semibold outline-none cursor-pointer border-none py-0">
                        <option value="15" className="bg-[#181c24]">Within 15 km ({selectedCity.toUpperCase()} Metro)</option>
                        <option value="25" className="bg-[#181c24]">Within 25 km</option>
                        <option value="50" className="bg-[#181c24]">Statewide Expressways</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-[#181c24] px-3.5 py-2 rounded-xl border border-[#334155]">
                    <Users className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <div className="flex flex-col flex-1">
                      <span className="text-[10px] uppercase font-bold text-[#94a3b8]">Crowd Density Vibe</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        {(['all', 'Packed', 'Vibrant', 'Relaxed'] as const).map((density) => (
                          <button
                            key={density}
                            onClick={() => setCrowdFilter(density)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                              crowdFilter === density
                                ? 'bg-[#facc15] text-[#0f131c]'
                                : 'bg-[#222938] text-[#94a3b8] hover:text-white'
                            }`}
                          >
                            {density === 'all' ? 'Any' : density}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-[#181c24] px-3.5 py-2 rounded-xl border border-[#334155]">
                    <Ticket className="w-4 h-4 text-[#dc2626] shrink-0" />
                    <div className="flex flex-col flex-1">
                      <span className="text-[10px] uppercase font-bold text-[#94a3b8]">Ticket Tier</span>
                      <select 
                        value={priceFilter}
                        onChange={(e: any) => setPriceFilter(e.target.value)}
                        className="bg-transparent text-white text-xs font-semibold outline-none cursor-pointer border-none py-0"
                      >
                        <option value="all" className="bg-[#181c24]">Any Price Tier</option>
                        <option value="budget" className="bg-[#181c24]">Under ₹500 (Early Bird)</option>
                        <option value="mid" className="bg-[#181c24]">₹500 – ₹1,200 (Passholder Zone)</option>
                        <option value="vip" className="bg-[#181c24]">₹1,200+ (VIP Lounge &amp; Stage)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Venues Grid & Sticky Interactive Map Split */}
            <section className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Curated Grounds Cards */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-white">Curated Grounds</span>
                      <span className="text-xs text-[#94a3b8]">({filteredVenues.length} spotlighted)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#facc15] font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Instant Access Active
                    </div>
                  </div>

                  {filteredVenues.length === 0 ? (
                    <div className="p-12 text-center bg-[#181c24] rounded-2xl border border-[#222938] flex flex-col items-center gap-3">
                      <MapPin className="w-10 h-10 text-[#334155]" />
                      <p className="text-sm font-bold text-white">No grounds match this filter combination</p>
                      <button
                        onClick={() => {
                          setSelectedStyleFilter('all');
                          setCrowdFilter('all');
                          setPriceFilter('all');
                          setSearchQuery('');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#facc15] text-[#0f131c] font-bold text-xs shadow hover:bg-[#eab308]"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    filteredVenues.map((venue) => (
                      <VenueCard
                        key={venue.id}
                        venue={venue}
                        isSelected={selectedVenue?.id === venue.id}
                        onSelect={() => setSelectedVenue(venue)}
                        onBookPass={() => handleOpenBooking(venue)}
                        onViewParking={() => {
                          setSelectedVenue(venue);
                          setCurrentTab('parking');
                        }}
                        onCallOrganizer={() => handleOpenCallModal(venue)}
                      />
                    ))
                  )}
                </div>

                {/* Right Column: Sticky Interactive Leaflet & Google Maps */}
                <div className="lg:col-span-7 flex flex-col gap-4 sticky top-24">
                  <InteractiveMap
                    venues={venues}
                    selectedVenue={selectedVenue}
                    onSelectVenue={(v) => setSelectedVenue(v)}
                    onBookPass={(v) => handleOpenBooking(v)}
                    onCallOrganizer={(v) => handleOpenCallModal(v)}
                    heightClass="h-[740px]"
                  />

                  {/* Satellite Telemetry status indicator */}
                  <div className="flex items-center justify-between px-2 text-[#94a3b8] text-xs">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" /> Plenty of Space
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#facc15]" /> Rapid Filling
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#dc2626]" /> Congested / Lot Full
                      </span>
                    </div>
                    <span className="text-[11px] text-[#64748b]">
                      Satellite Telemetry synced live
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SCREEN 2: LIVE PARKING & TRANSIT */}
        {currentTab === 'parking' && (
          <LiveParkingView
            venues={venues}
            onSelectVenue={(v) => setSelectedVenue(v)}
            onBookPass={(v) => handleOpenBooking(v)}
            onCallOrganizer={(v) => handleOpenCallModal(v)}
          />
        )}

        {/* SCREEN 3: RAAS SANGATH MATCH */}
        {currentTab === 'sangath' && (
          <RaasSangathMatch
            profiles={profiles}
            safeHubs={INITIAL_SAFE_HUBS}
            onAddProfile={handleAddProfile}
            onOpenPassWallet={() => setIsWalletOpen(true)}
          />
        )}

        {/* SCREEN 4: ORGANIZER DESK */}
        {currentTab === 'organizer' && (
          <OrganizerDesk
            venues={venues}
            onUpdateVenue={handleUpdateVenue}
            onAddVenue={handleAddVenue}
            bookedPasses={bookedPasses}
            onCheckInPass={handleCheckInPass}
          />
        )}
      </main>

      {/* Global Modals */}
      <PassBookingModal
        venues={venues}
        initialVenue={bookingVenueTarget}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingConfirmed={handleBookingConfirmed}
      />

      <PassWalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        passes={bookedPasses}
        onOpenBooking={() => handleOpenBooking()}
      />

      <CallOrganizerModal
        venue={callVenueTarget}
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        onBookPass={(v) => handleOpenBooking(v)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateToTab={(tab) => setCurrentTab(tab)}
      />

      {/* Footer */}
      <footer className="w-full bg-[#0a0e16] border-t border-[#222938] py-8 text-[#94a3b8] mt-auto">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="text-base font-extrabold text-[#facc15] tracking-tight">
              Taal &amp; Raas
            </span>
            <p className="text-xs text-[#94a3b8]">
              Gujarat's premier nocturnal folk dance network &amp; live garba companion.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold">
            <button
              onClick={() => setCurrentTab('explore')}
              className="hover:text-[#facc15] transition-colors"
            >
              Explore Venues
            </button>
            <button
              onClick={() => setCurrentTab('parking')}
              className="hover:text-[#facc15] transition-colors"
            >
              Live Parking &amp; Transit
            </button>
            <button
              onClick={() => setCurrentTab('sangath')}
              className="hover:text-[#facc15] transition-colors"
            >
              Raas Sangath Match
            </button>
            <button
              onClick={() => setCurrentTab('organizer')}
              className="hover:text-[#facc15] transition-colors"
            >
              Organizer Portal
            </button>
          </div>

          <div className="text-xs text-[#64748b]">
            © 2026 Taal &amp; Raas. Celebrating Navratri Nights.
          </div>
        </div>
      </footer>
    </div>
  );
}

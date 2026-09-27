import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Ticket, 
  Bell, 
  Menu, 
  X, 
  Sparkles, 
  Users, 
  Compass, 
  Car, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { BookedPass } from '../types/navratri';

interface HeaderProps {
  currentTab: 'explore' | 'parking' | 'sangath' | 'organizer';
  onTabChange: (tab: 'explore' | 'parking' | 'sangath' | 'organizer') => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  bookedPasses: BookedPass[];
  onOpenPassWallet: () => void;
  onOpenNotifications: () => void;
  notificationCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  selectedCity,
  onCityChange,
  searchQuery,
  onSearchChange,
  bookedPasses,
  onOpenPassWallet,
  onOpenNotifications,
  notificationCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userProfileMenuOpen, setUserProfileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Aanya Patel',
    role: 'Solo Passholder',
    city: 'Ahmedabad'
  });

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0f131c]/95 backdrop-blur-xl border-b border-[#222938] shadow-lg">
      <div className="h-20 w-full px-4 lg:px-10 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer shrink-0"
          onClick={() => onTabChange('explore')}
        >
          {/* Stylized Glowing Dandiya Logo Icon */}
          <div className="relative w-10 h-10 rounded-xl bg-[#181c24] border border-[#334155] flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.2)]">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#facc15]" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="4" y1="20" x2="20" y2="4" stroke="#facc15" strokeLinecap="round" />
              <line x1="4" y1="4" x2="20" y2="20" stroke="#dc2626" strokeLinecap="round" />
              <circle cx="12" cy="12" r="3" fill="#facc15" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-[#facc15] tracking-tight flex items-center gap-1.5">
              Taal &amp; Raas
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#facc15]/20 text-[#facc15] border border-[#facc15]/40 tracking-wider">
                2025
              </span>
            </span>
            <span className="text-[11px] text-[#94a3b8] uppercase tracking-wider font-semibold">
              Navratri Nocturnal Companion
            </span>
          </div>
        </div>

        {/* Desktop City Selector & Navigation Tabs */}
        <div className="hidden xl:flex items-center gap-4">
          {/* City Selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#181c24] rounded-full border border-[#334155]">
            <MapPin className="w-4 h-4 text-[#facc15]" />
            <select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="bg-transparent text-[#dfe2ee] text-xs font-semibold outline-none pr-2 cursor-pointer border-none py-0"
            >
              <option value="ahmedabad" className="bg-[#181c24] text-[#dfe2ee]">Ahmedabad</option>
              <option value="vadodara" className="bg-[#181c24] text-[#dfe2ee]">Vadodara</option>
              <option value="surat" className="bg-[#181c24] text-[#dfe2ee]">Surat</option>
              <option value="rajkot" className="bg-[#181c24] text-[#dfe2ee]">Rajkot</option>
              <option value="mumbai" className="bg-[#181c24] text-[#dfe2ee]">Mumbai</option>
            </select>
          </div>

          {/* Navigation Pill Bar */}
          <nav className="flex items-center gap-1 p-1 bg-[#181c24] rounded-full border border-[#222938]">
            <button
              onClick={() => onTabChange('explore')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                currentTab === 'explore'
                  ? 'bg-[#222938] text-[#facc15] border border-[#facc15]/30 shadow'
                  : 'text-[#94a3b8] hover:text-[#dfe2ee] hover:bg-[#222938]'
              }`}
            >
              <Compass className="w-4 h-4" />
              Explore Venues
            </button>
            <button
              onClick={() => onTabChange('parking')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                currentTab === 'parking'
                  ? 'bg-[#222938] text-[#facc15] border border-[#facc15]/30 shadow'
                  : 'text-[#94a3b8] hover:text-[#dfe2ee] hover:bg-[#222938]'
              }`}
            >
              <Car className="w-4 h-4" />
              Live Parking &amp; Transit
            </button>
            <button
              onClick={() => onTabChange('sangath')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                currentTab === 'sangath'
                  ? 'bg-[#222938] text-[#facc15] border border-[#facc15]/30 shadow'
                  : 'text-[#94a3b8] hover:text-[#dfe2ee] hover:bg-[#222938]'
              }`}
            >
              <Users className="w-4 h-4" />
              Raas Sangath Match
            </button>
            <button
              onClick={() => onTabChange('organizer')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                currentTab === 'organizer'
                  ? 'bg-[#222938] text-[#facc15] border border-[#facc15]/30 shadow'
                  : 'text-[#94a3b8] hover:text-[#dfe2ee] hover:bg-[#222938]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#dc2626]" />
              Organizer Desk
            </button>
          </nav>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#181c24] rounded-full border border-[#334155]">
            <Search className="w-4 h-4 text-[#94a3b8] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search passes, artists..."
              className="bg-transparent text-[#dfe2ee] placeholder-[#94a3b8] text-xs outline-none w-32 focus:w-44 transition-all border-none py-0"
            />
          </div>

          {/* Dandiya Pass Action / Wallet */}
          <button
            onClick={onOpenPassWallet}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#facc15] hover:bg-[#eab308] text-[#0f131c] font-bold text-sm shadow transition-all relative"
          >
            <Ticket className="w-4 h-4 text-[#0f131c]" />
            <span className="hidden sm:inline">Dandiya Pass</span>
            {bookedPasses.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#dc2626] text-white text-[10px] font-extrabold animate-pulse">
                {bookedPasses.length}
              </span>
            )}
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full bg-[#181c24] border border-[#334155] text-[#dfe2ee] hover:text-[#facc15] transition-colors"
            title="Real-time venue & parking notifications"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#dc2626] ring-2 ring-[#0f131c]" />
            )}
          </button>

          {/* User Profile Avatar */}
          <div className="relative">
            <div 
              className="flex items-center gap-2 pl-1 cursor-pointer"
              onClick={() => setUserProfileMenuOpen(!userProfileMenuOpen)}
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Aanya Patel"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#facc15]/50"
              />
              <div className="hidden 2xl:flex flex-col text-left">
                <span className="text-xs font-semibold text-[#dfe2ee] leading-tight">
                  {userProfile.name}
                </span>
                <span className="text-[10px] text-[#94a3b8]">
                  {userProfile.city} • {userProfile.role}
                </span>
              </div>
            </div>

            {/* Profile Dropdown */}
            {userProfileMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-[#181c24] border border-[#334155] rounded-xl shadow-2xl p-3 z-50 flex flex-col gap-2">
                <div className="pb-2 border-b border-[#222938]">
                  <p className="text-xs font-bold text-white">{userProfile.name}</p>
                  <p className="text-[11px] text-[#94a3b8]">{userProfile.city} • Solo Passholder</p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> Sangath Verified ID
                  </span>
                </div>
                <button
                  onClick={() => {
                    onTabChange('sangath');
                    setUserProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-[#dfe2ee] hover:bg-[#222938] rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>My Sangath Dance Chemistry</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
                </button>
                <button
                  onClick={() => {
                    onOpenPassWallet();
                    setUserProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-[#dfe2ee] hover:bg-[#222938] rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>My Passes ({bookedPasses.length})</span>
                  <Ticket className="w-3.5 h-3.5 text-[#facc15]" />
                </button>
                <button
                  onClick={() => {
                    onTabChange('organizer');
                    setUserProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-[#dc2626] hover:bg-[#222938] rounded-lg transition-colors"
                >
                  Switch to Organizer Mode
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-[#181c24] border border-[#334155] text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#181c24] border-b border-[#334155] px-6 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#222938] rounded-lg border border-[#334155]">
            <MapPin className="w-4 h-4 text-[#facc15]" />
            <span className="text-xs text-[#94a3b8]">City:</span>
            <select
              value={selectedCity}
              onChange={(e) => {
                onCityChange(e.target.value);
                setMobileMenuOpen(false);
              }}
              className="bg-transparent text-white text-xs font-semibold outline-none flex-1 border-none py-0"
            >
              <option value="ahmedabad" className="bg-[#181c24]">Ahmedabad</option>
              <option value="vadodara" className="bg-[#181c24]">Vadodara</option>
              <option value="surat" className="bg-[#181c24]">Surat</option>
              <option value="rajkot" className="bg-[#181c24]">Rajkot</option>
              <option value="mumbai" className="bg-[#181c24]">Mumbai</option>
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-[#222938] rounded-lg border border-[#334155]">
            <Search className="w-4 h-4 text-[#94a3b8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search passes, artists..."
              className="bg-transparent text-white text-xs outline-none flex-1 border-none py-0"
            />
          </div>

          <nav className="flex flex-col gap-1.5 pt-2">
            <button
              onClick={() => {
                onTabChange('explore');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2.5 rounded-lg text-left text-sm font-semibold flex items-center gap-2 ${
                currentTab === 'explore' ? 'bg-[#222938] text-[#facc15]' : 'text-[#94a3b8]'
              }`}
            >
              <Compass className="w-4 h-4" /> Explore Venues
            </button>
            <button
              onClick={() => {
                onTabChange('parking');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2.5 rounded-lg text-left text-sm font-semibold flex items-center gap-2 ${
                currentTab === 'parking' ? 'bg-[#222938] text-[#facc15]' : 'text-[#94a3b8]'
              }`}
            >
              <Car className="w-4 h-4" /> Live Parking &amp; Transit
            </button>
            <button
              onClick={() => {
                onTabChange('sangath');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2.5 rounded-lg text-left text-sm font-semibold flex items-center gap-2 ${
                currentTab === 'sangath' ? 'bg-[#222938] text-[#facc15]' : 'text-[#94a3b8]'
              }`}
            >
              <Users className="w-4 h-4" /> Raas Sangath Match
            </button>
            <button
              onClick={() => {
                onTabChange('organizer');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2.5 rounded-lg text-left text-sm font-semibold flex items-center gap-2 ${
                currentTab === 'organizer' ? 'bg-[#222938] text-[#facc15]' : 'text-[#94a3b8]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#dc2626]" /> Organizer Desk
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

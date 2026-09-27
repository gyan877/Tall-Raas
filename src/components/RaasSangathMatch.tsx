import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Sparkles, 
  Shield, 
  CheckCircle2, 
  MessageSquare, 
  UserPlus, 
  Heart, 
  SlidersHorizontal, 
  Globe, 
  Award, 
  Calendar, 
  Info,
  Clock,
  Send,
  X,
  Phone,
  Check
} from 'lucide-react';
import { SangathProfile, SafeMeetupHub } from '../types/navratri';

interface RaasSangathMatchProps {
  profiles: SangathProfile[];
  safeHubs: SafeMeetupHub[];
  onAddProfile: (profile: SangathProfile) => void;
  onOpenPassWallet: () => void;
}

export const RaasSangathMatch: React.FC<RaasSangathMatchProps> = ({
  profiles,
  safeHubs,
  onAddProfile,
  onOpenPassWallet
}) => {
  const [activeMode, setActiveMode] = useState<'single' | 'circle' | 'guide'>('single');
  const [originFilter, setOriginFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [venueFilter, setVenueFilter] = useState('all');
  const [langFilter, setLangFilter] = useState('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Invitation state
  const [invitedIds, setInvitedIds] = useState<Record<string, boolean>>({});
  
  // Interactive Chat State
  const [chatTarget, setChatTarget] = useState<SangathProfile | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'match'; text: string; time: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');

  // Create Profile Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProfileForm, setNewProfileForm] = useState({
    name: '',
    age: 24,
    cityOrigin: '',
    destinationNote: '',
    residentType: 'out-state' as 'gujarat' | 'out-state' | 'nri',
    dancingSkill: 'intermediate' as 'pro' | 'intermediate' | 'beginner',
    tonightVenueName: 'Shankus Mahotsav',
    spokenLanguages: 'Hindi, English',
    bio: '',
    type: 'single' as 'single' | 'circle' | 'guide'
  });

  // Filter profiles
  const filteredProfiles = profiles.filter((p) => {
    // Mode filter
    if (activeMode !== p.type) return false;

    // Origin
    if (originFilter !== 'all' && p.residentType !== originFilter) return false;

    // Skill
    if (skillFilter !== 'all' && p.dancingSkill !== skillFilter) return false;

    // Venue
    if (venueFilter !== 'all') {
      const matchVenue = p.tonightVenueName.toLowerCase().includes(venueFilter.toLowerCase());
      if (!matchVenue) return false;
    }

    // Language
    if (langFilter !== 'all') {
      if (langFilter === 'guj' && !p.spokenLanguages.includes('Gujarati')) return false;
      if (langFilter === 'hin' && !p.spokenLanguages.includes('Hindi')) return false;
      if (langFilter === 'eng' && !p.spokenLanguages.includes('English')) return false;
    }

    // Quick tag
    if (selectedTag && !p.tags.includes(selectedTag)) return false;

    return true;
  });

  const handleInvite = (id: string) => {
    setInvitedIds(prev => ({ ...prev, [id]: true }));
  };

  const handleOpenChat = (profile: SangathProfile) => {
    setChatTarget(profile);
    setChatMessages([
      {
        sender: 'match',
        text: `Kem Chho! I'm ${profile.name}. Are you heading to ${profile.tonightVenueName} tonight? We can meet safely at the designated Booth!`,
        time: 'Just now'
      }
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !chatTarget) return;

    const userMsg = inputMessage;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg, time: nowTime }]);
    setInputMessage('');

    // Simulate friendly real-time response from dance companion
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'match',
          text: `Sounds wonderful! Let's rendezvous near ${chatTarget.tonightVenueName} Safe Meetup Booth around 8:30 PM. Look for the illuminated mirror kiosk!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  const handleCreateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileForm.name || !newProfileForm.cityOrigin) return;

    const newProfile: SangathProfile = {
      id: `profile-${Date.now()}`,
      name: newProfileForm.name,
      age: Number(newProfileForm.age),
      cityOrigin: newProfileForm.cityOrigin,
      destinationNote: `${newProfileForm.cityOrigin} → Visiting SG Highway`,
      residentType: newProfileForm.residentType,
      residentTypeLabel: newProfileForm.residentType === 'out-state' ? 'Non-Resident Dancer' : 'Gujarat Resident',
      residentTypeBadgeClass: 'bg-[#181c24] text-[#facc15] border border-[#334155]',
      dancingSkill: newProfileForm.dancingSkill,
      dancingSkillLabel: newProfileForm.dancingSkill === 'pro' ? 'Dodhiya Pro' : newProfileForm.dancingSkill === 'intermediate' ? '3-Taali Enthusiast' : 'Beginner / Eager to Learn',
      tonightVenueId: 'shankus-mahotsav',
      tonightVenueName: newProfileForm.tonightVenueName,
      spokenLanguages: newProfileForm.spokenLanguages.split(',').map(s => s.trim()),
      bio: newProfileForm.bio || 'Excited for Gujarat Navratri nights! Looking for friendly partners or mandli.',
      passDetail: 'ID Verified • Night Pass Ready',
      syncPercent: 92,
      verified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      type: newProfileForm.type,
      activeMinutesAgo: 1,
      tags: ['#SoloFemaleSafe', '#TraditionalKedia', '#LateNightFoodCrawl']
    };

    onAddProfile(newProfile);
    setShowCreateModal(false);
  };

  const resetFilters = () => {
    setOriginFilter('all');
    setSkillFilter('all');
    setVenueFilter('all');
    setLangFilter('all');
    setSelectedTag(null);
  };

  return (
    <div className="w-full flex flex-col gap-10 pb-16">
      {/* Top Banner and Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#222938] text-[#facc15] text-xs font-bold uppercase tracking-wider border border-[#334155]">
              <span className="w-2 h-2 rounded-full bg-[#facc15] animate-ping" />
              Live Matched Tonight: 1,428 Dancers
            </span>
            <span className="text-xs text-[#94a3b8] uppercase tracking-wider font-semibold">
              Ahmedabad • SG Highway • Vadodara
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Raas <span className="text-[#facc15]">Sangath</span>
          </h1>

          <p className="text-base text-[#94a3b8] leading-relaxed">
            Connect with kindred spirits, dance circles, and local step guides. Safe, verified pairings for unforgettable nocturnal Navratri rounds.
          </p>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-[#181c24] p-1.5 rounded-full border border-[#222938] self-start lg:self-end">
          <button
            onClick={() => setActiveMode('single')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs shadow transition-all ${
              activeMode === 'single'
                ? 'bg-[#facc15] text-[#0f131c]'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            Singles Partner
          </button>
          <button
            onClick={() => setActiveMode('circle')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all ${
              activeMode === 'circle'
                ? 'bg-[#facc15] text-[#0f131c]'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            Join a Circle (Mandli)
          </button>
          <button
            onClick={() => setActiveMode('guide')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all ${
              activeMode === 'guide'
                ? 'bg-[#facc15] text-[#0f131c]'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            Teach Me Dodhiya
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-all shadow"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Join Sangath</span>
          </button>
        </div>
      </div>

      {/* Dance Chemistry Filters Panel */}
      <div className="bg-[#181c24] border border-[#222938] p-6 rounded-2xl shadow-xl flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-[#facc15]" />
            Dance Chemistry Filters
          </div>
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-[#facc15] hover:underline transition-all"
          >
            Reset All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Origin Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
              Origin &amp; Resident Type
            </label>
            <div className="relative bg-[#222938] rounded-xl border border-[#334155]">
              <Globe className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-3 pointer-events-none" />
              <select
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value)}
                className="w-full bg-transparent text-white text-xs pl-10 pr-9 py-2.5 outline-none appearance-none cursor-pointer border-none"
              >
                <option value="all" className="bg-[#181c24]">All Origins</option>
                <option value="gujarat" className="bg-[#181c24]">Gujarat Resident (Local)</option>
                <option value="out-state" className="bg-[#181c24]">Out of State / Non-Gujarati</option>
                <option value="nri" className="bg-[#181c24]">NRI / International Guest</option>
              </select>
            </div>
          </div>

          {/* Dancing Skill Level */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
              Dancing Skill Level
            </label>
            <div className="relative bg-[#222938] rounded-xl border border-[#334155]">
              <Award className="w-4 h-4 text-[#facc15] absolute left-3.5 top-3 pointer-events-none" />
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="w-full bg-transparent text-white text-xs pl-10 pr-9 py-2.5 outline-none appearance-none cursor-pointer border-none"
              >
                <option value="all" className="bg-[#181c24]">Any Skill Level</option>
                <option value="pro" className="bg-[#181c24]">Dodhiya Master (12-step &amp; beyond)</option>
                <option value="intermediate" className="bg-[#181c24]">Intermediate (3-Taali / Popat)</option>
                <option value="beginner" className="bg-[#181c24]">Beginner / Eager to Learn</option>
              </select>
            </div>
          </div>

          {/* Tonight's Venue Plan */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
              Tonight's Venue Plan
            </label>
            <div className="relative bg-[#222938] rounded-xl border border-[#334155]">
              <MapPin className="w-4 h-4 text-[#dc2626] absolute left-3.5 top-3 pointer-events-none" />
              <select
                value={venueFilter}
                onChange={(e) => setVenueFilter(e.target.value)}
                className="w-full bg-transparent text-white text-xs pl-10 pr-9 py-2.5 outline-none appearance-none cursor-pointer border-none"
              >
                <option value="all" className="bg-[#181c24]">All Venues</option>
                <option value="Shankus" className="bg-[#181c24]">Shankus Mahotsav (SG Highway)</option>
                <option value="Mirchi" className="bg-[#181c24]">Mirchi Rock Dandiya</option>
                <option value="United" className="bg-[#181c24]">United Way Grounds (Vadodara)</option>
                <option value="SG Highway" className="bg-[#181c24]">Any SG Highway Open Lawns</option>
              </select>
            </div>
          </div>

          {/* Spoken Languages */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
              Spoken Languages
            </label>
            <div className="relative bg-[#222938] rounded-xl border border-[#334155]">
              <MessageSquare className="w-4 h-4 text-[#2563eb] absolute left-3.5 top-3 pointer-events-none" />
              <select
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value)}
                className="w-full bg-transparent text-white text-xs pl-10 pr-9 py-2.5 outline-none appearance-none cursor-pointer border-none"
              >
                <option value="all" className="bg-[#181c24]">All Languages</option>
                <option value="guj" className="bg-[#181c24]">Gujarati Fluent</option>
                <option value="hin" className="bg-[#181c24]">Hindi + English</option>
                <option value="eng" className="bg-[#181c24]">English Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Popular Quick Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#222938]">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#dfe2ee] font-semibold">Popular Quick Tags:</span>
            {['#LateNightFoodCrawl', '#TraditionalKedia', '#SoloFemaleSafe', '#SanedoSpeedRounds'].map((tag) => (
              <span
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-2.5 py-1 rounded-full cursor-pointer text-[11px] font-medium transition-colors border ${
                  selectedTag === tag
                    ? 'bg-[#facc15] text-[#0f131c] border-[#facc15]'
                    : 'bg-[#222938] text-[#dfe2ee] hover:bg-[#31353e] border-[#334155]'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="text-xs text-[#94a3b8]">
            Showing <span className="text-[#facc15] font-bold">{filteredProfiles.length} Verified Sangath Profiles</span>
          </div>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredProfiles.map((p) => {
          const isInvited = !!invitedIds[p.id];

          return (
            <div
              key={p.id}
              className="group relative flex flex-col justify-between bg-[#181c24] border border-[#222938] rounded-2xl overflow-hidden shadow-lg hover:border-[#334155] transition-all"
            >
              {/* Photo Area */}
              <div className="relative w-full h-56 overflow-hidden bg-[#222938]">
                <img
                  src={p.avatarUrl}
                  alt={p.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0f131c]/40" />

                {/* Top Badge */}
                <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${p.residentTypeBadgeClass}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#facc15]" />
                  {p.residentTypeLabel}
                </div>

                {/* Top Right Verified Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0f131c]/90 border border-[#334155] flex items-center justify-center text-[#facc15]">
                  <Shield className="w-4 h-4 text-[#facc15]" />
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {p.name}, {p.age}
                    </h3>
                    <p className="text-xs text-[#94a3b8] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#facc15]" />
                      {p.destinationNote}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-[#222938] border border-[#334155]">
                    <span className="text-base font-extrabold text-[#facc15] leading-none">
                      {p.syncPercent}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-[#94a3b8] tracking-wider">
                      Sync%
                    </span>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex flex-col gap-4 flex-grow justify-between">
                <div className="flex flex-col gap-3">
                  <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-3">
                    {p.bio}
                  </p>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#222938] text-white text-[10px] font-medium border border-[#334155]">
                      <Calendar className="w-3 h-3 text-[#facc15]" />
                      {p.passDetail}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#222938] text-white text-[10px] font-medium border border-[#334155]">
                      <Sparkles className="w-3 h-3 text-[#2563eb]" />
                      {p.dancingSkillLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#222938] text-white text-[10px] font-medium border border-[#334155]">
                      <Globe className="w-3 h-3 text-[#facc15]" />
                      {p.spokenLanguages.join(' • ')}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] text-[#94a3b8] pb-1">
                    <span className="flex items-center gap-1 text-[#facc15] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#facc15] animate-pulse" />
                      {p.tonightVenueName}
                    </span>
                    <span>Active {p.activeMinutesAgo}m ago</span>
                  </div>

                  {p.type === 'circle' ? (
                    <button
                      onClick={() => handleInvite(p.id)}
                      disabled={isInvited}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-xs shadow transition-all ${
                        isInvited
                          ? 'bg-[#222938] text-emerald-400'
                          : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                      }`}
                    >
                      {isInvited ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          Requested to Join!
                        </>
                      ) : (
                        <>
                          <Users className="w-4 h-4 text-white" />
                          Request to Join Circle
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenChat(p)}
                        className="w-full py-2.5 rounded-lg bg-[#222938] hover:bg-[#31353e] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-[#334155]"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Chat
                      </button>

                      <button
                        onClick={() => handleInvite(p.id)}
                        disabled={isInvited}
                        className={`w-full py-2.5 rounded-lg font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5 ${
                          isInvited
                            ? 'bg-[#222938] text-[#facc15]'
                            : p.dancingSkill === 'pro'
                            ? 'bg-[#dc2626] hover:bg-[#b91c1c] text-white'
                            : 'bg-[#facc15] hover:bg-[#eab308] text-[#0f131c]'
                        }`}
                      >
                        {isInvited ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Sent!
                          </>
                        ) : p.dancingSkill === 'pro' ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            Match Pair
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3.5 h-3.5" />
                            Invite
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Designated Safe Meetup Hubs & Safety Guarantee */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Designated Safe Meetup Hubs */}
        <div className="lg:col-span-2 bg-[#181c24] border border-[#222938] rounded-2xl p-6 shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#222938] border border-[#334155] flex items-center justify-center text-[#facc15] shrink-0">
                <MapPin className="w-5 h-5 text-[#facc15]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  Designated Safe Meetup Hubs
                </h3>
                <p className="text-xs text-[#94a3b8] mt-0.5">
                  Verified on-ground icebreaker points manned by Taal &amp; Raas venue marshals
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-[#222938] text-[#facc15] text-[11px] font-bold uppercase tracking-wider border border-[#334155]">
              LIVE TONIGHT: 8:00 PM – 1:30 AM
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {safeHubs.map((hub) => (
              <div
                key={hub.id}
                className="p-4 rounded-xl bg-[#222938] border border-[#334155] flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{hub.boothName}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#facc15]/20 text-[#facc15] border border-[#facc15]/30">
                    {hub.locationDetails}
                  </span>
                </div>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  {hub.description}
                </p>
                <div className="flex items-center justify-between pt-1 text-xs font-semibold">
                  <span className="text-[#facc15] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Next Circle in {hub.nextCircleInMins} mins
                  </span>
                  <span className="text-[#dfe2ee]">
                    {hub.waitingCount} Dancers Waiting
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sangath Safety Guarantee */}
        <div className="bg-[#181c24] border border-[#222938] rounded-2xl p-6 shadow-xl flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#facc15] text-xs font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4 text-[#facc15]" />
              Sangath Safety Guarantee
            </div>
            <h4 className="text-lg font-bold text-white">Community Respect Pledge</h4>
            <ul className="flex flex-col gap-2 text-xs text-[#94a3b8]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#facc15] shrink-0 mt-0.5" />
                <span>All matches require phone OTP and active entry wristband verification.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#facc15] shrink-0 mt-0.5" />
                <span>Zero-tolerance harassment policy with instant blacklisting across 20+ venues.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#facc15] shrink-0 mt-0.5" />
                <span>Dedicated 24/7 SOS dispatch with Gujarat Police She-Team link.</span>
              </li>
            </ul>
          </div>

          <div className="pt-1">
            <a
              href="tel:1091"
              className="w-full py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow"
            >
              <Phone className="w-4 h-4 text-white" />
              Gujarat Police She-Team SOS Helpline (1091)
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Chat Dialog */}
      {chatTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#181c24] border border-[#334155] rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 bg-[#222938] border-b border-[#334155] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={chatTarget.avatarUrl}
                  alt={chatTarget.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#facc15]"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {chatTarget.name}
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </h4>
                  <p className="text-[11px] text-[#94a3b8]">
                    {chatTarget.destinationNote} • {chatTarget.syncPercent}% Dance Sync
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChatTarget(null)}
                className="p-1 rounded-lg text-[#94a3b8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 h-72 overflow-y-auto flex flex-col gap-3 bg-[#0f131c]">
              <div className="p-2.5 rounded-xl bg-[#222938]/70 border border-[#334155] text-center text-xs text-[#94a3b8]">
                🔒 Verified Sangath Chat. Safe Meetup Hub: Booth at {chatTarget.tonightVenueName}.
              </div>

              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col max-w-[80%] ${
                    msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#facc15] text-[#0f131c] font-medium rounded-br-none'
                        : 'bg-[#222938] text-white border border-[#334155] rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#64748b] mt-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#181c24] border-t border-[#334155] flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Message ${chatTarget.name}...`}
                className="flex-1 bg-[#222938] text-white text-xs px-3 py-2.5 rounded-xl outline-none border border-[#334155] focus:border-[#facc15]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#facc15] text-[#0f131c] font-bold text-xs hover:bg-[#eab308] transition-all flex items-center justify-center gap-1 shadow"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Profile Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#181c24] border border-[#334155] rounded-2xl w-full max-w-md shadow-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#222938]">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#facc15]" />
                Join Raas Sangath Network
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#94a3b8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProfileSubmit} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yashvi Sharma"
                  value={newProfileForm.name}
                  onChange={(e) => setNewProfileForm({ ...newProfileForm, name: e.target.value })}
                  className="w-full mt-1 bg-[#222938] text-white p-2.5 rounded-xl border border-[#334155] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Age</label>
                  <input
                    type="number"
                    min="18"
                    max="65"
                    value={newProfileForm.age}
                    onChange={(e) => setNewProfileForm({ ...newProfileForm, age: Number(e.target.value) })}
                    className="w-full mt-1 bg-[#222938] text-white p-2.5 rounded-xl border border-[#334155] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Origin City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Mumbai, London"
                    value={newProfileForm.cityOrigin}
                    onChange={(e) => setNewProfileForm({ ...newProfileForm, cityOrigin: e.target.value })}
                    className="w-full mt-1 bg-[#222938] text-white p-2.5 rounded-xl border border-[#334155] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Resident Type</label>
                <select
                  value={newProfileForm.residentType}
                  onChange={(e: any) => setNewProfileForm({ ...newProfileForm, residentType: e.target.value })}
                  className="w-full mt-1 bg-[#222938] text-white p-2.5 rounded-xl border border-[#334155] outline-none"
                >
                  <option value="out-state">Out of State / Non-Gujarati Traveler</option>
                  <option value="gujarat">Gujarat Resident (Local)</option>
                  <option value="nri">NRI / International Guest</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Dancing Skill</label>
                <select
                  value={newProfileForm.dancingSkill}
                  onChange={(e: any) => setNewProfileForm({ ...newProfileForm, dancingSkill: e.target.value })}
                  className="w-full mt-1 bg-[#222938] text-white p-2.5 rounded-xl border border-[#334155] outline-none"
                >
                  <option value="beginner">Beginner / Eager to Learn Basic 2-Taali</option>
                  <option value="intermediate">Intermediate (3-Taali &amp; Popat)</option>
                  <option value="pro">Dodhiya Master (12-Step &amp; Fast Rounds)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Tonight's Venue Target</label>
                <select
                  value={newProfileForm.tonightVenueName}
                  onChange={(e) => setNewProfileForm({ ...newProfileForm, tonightVenueName: e.target.value })}
                  className="w-full mt-1 bg-[#222938] text-white p-2.5 rounded-xl border border-[#334155] outline-none"
                >
                  <option value="Shankus Mahotsav">Shankus Mahotsav (SG Highway)</option>
                  <option value="Mirchi Rock Dandiya">Mirchi Rock N Dhol</option>
                  <option value="United Way Grounds">United Way of Baroda Arena</option>
                  <option value="Suvarna Rajpath">Suvarna Navratri Mahotsav</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Short Bio</label>
                <textarea
                  rows={2}
                  value={newProfileForm.bio}
                  onChange={(e) => setNewProfileForm({ ...newProfileForm, bio: e.target.value })}
                  placeholder="Share your dance stamina, who you are traveling with, or what you hope to experience..."
                  className="w-full mt-1 bg-[#222938] text-white p-2.5 rounded-xl border border-[#334155] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-[#facc15] hover:bg-[#eab308] text-[#0f131c] font-bold text-xs shadow transition-all"
              >
                Publish Verified Sangath Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

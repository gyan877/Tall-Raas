import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Car, 
  PlusCircle, 
  Save, 
  Radio, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Ticket, 
  Phone, 
  Navigation,
  Sparkles,
  QrCode
} from 'lucide-react';
import { Venue, BookedPass, ParkingZone, TicketTier } from '../types/navratri';

interface OrganizerDeskProps {
  venues: Venue[];
  onUpdateVenue: (updatedVenue: Venue) => void;
  onAddVenue: (newVenue: Venue) => void;
  bookedPasses: BookedPass[];
  onCheckInPass: (passId: string) => void;
}

export const OrganizerDesk: React.FC<OrganizerDeskProps> = ({
  venues,
  onUpdateVenue,
  onAddVenue,
  bookedPasses,
  onCheckInPass
}) => {
  const [activeTab, setActiveTab] = useState<'control' | 'register' | 'attendees'>('control');
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0]?.id || '');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Currently selected venue to edit
  const currentVenue = venues.find(v => v.id === selectedVenueId) || venues[0];

  // Editable state for selected venue
  const [editFormData, setEditFormData] = useState<Venue>(currentVenue);

  // When selected venue changes
  const handleSelectVenueToEdit = (id: string) => {
    setSelectedVenueId(id);
    const found = venues.find(v => v.id === id);
    if (found) {
      setEditFormData(JSON.parse(JSON.stringify(found)));
    }
  };

  // Save changes to current venue
  const handleSaveVenueChanges = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateVenue(editFormData);
    setSaveSuccessMsg(`Live updates for "${editFormData.name}" broadcasted successfully!`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Form state for creating a brand new venue
  const [newVenueForm, setNewVenueForm] = useState({
    name: '',
    city: 'ahmedabad' as 'ahmedabad' | 'vadodara' | 'surat' | 'rajkot' | 'mumbai',
    area: '',
    address: '',
    lat: 23.0500,
    lng: 72.5200,
    artistHeadliner: '',
    artistType: 'traditional' as any,
    artistTypeLabel: 'Traditional Gujarati Dhol',
    description: '',
    featuredTag: 'Grand Mahotsav',
    dressCode: 'Authentic Traditional Garba Attire',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    startTime: '08:00 PM',
    endTime: '02:00 AM',
    aartiTime: '11:45 PM',
    organizerName: '',
    organizerPhone: '+91 ',
    organizerEmail: '',
    announcement: 'Gate entry open with QR pass scan.',
    ticketPriceSingle: 500,
    ticketPriceVIP: 1200,
    parkingZoneName: 'Main Lawn Ground',
    parkingCapacity: 500,
    parkingAvailable: 250
  });

  const handleRegisterNewVenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVenueForm.name || !newVenueForm.address) return;

    const newVenue: Venue = {
      id: `venue-${Date.now()}`,
      name: newVenueForm.name,
      slug: newVenueForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      city: newVenueForm.city,
      area: newVenueForm.area || `${newVenueForm.city.toUpperCase()} Center`,
      address: newVenueForm.address,
      lat: Number(newVenueForm.lat),
      lng: Number(newVenueForm.lng),
      artistHeadliner: newVenueForm.artistHeadliner || 'Renowned Folk Troupe',
      artistType: newVenueForm.artistType,
      artistTypeLabel: newVenueForm.artistTypeLabel,
      vibeScore: 95,
      sangathMatchPercent: 92,
      crowdDensity: 'Vibrant',
      description: newVenueForm.description || 'Grand Navratri arena with traditional concentric dance circles and live acoustic folk rhythms.',
      featuredTag: newVenueForm.featuredTag,
      dressCode: newVenueForm.dressCode,
      image: newVenueForm.image,
      parkingZones: [
        {
          id: `p-${Date.now()}`,
          name: newVenueForm.parkingZoneName,
          totalSpots: Number(newVenueForm.parkingCapacity),
          availableSpots: Number(newVenueForm.parkingAvailable),
          status: 'flowing',
          walkTimeMins: 3,
          gate: 'Gate 1 Main',
          lat: Number(newVenueForm.lat) + 0.001,
          lng: Number(newVenueForm.lng) + 0.001
        }
      ],
      schedule: {
        nightNumber: 4,
        date: 'Tonight (Night 4)',
        startTime: newVenueForm.startTime,
        endTime: newVenueForm.endTime,
        aartiTime: newVenueForm.aartiTime
      },
      organizer: {
        name: newVenueForm.organizerName || 'Verified Ground Committee',
        phone: newVenueForm.organizerPhone,
        email: newVenueForm.organizerEmail || 'desk@taalraas.com',
        verified: true,
        announcements: [newVenueForm.announcement]
      },
      ticketTiers: [
        {
          id: `t1-${Date.now()}`,
          name: 'General Entry Pass',
          price: Number(newVenueForm.ticketPriceSingle),
          perks: ['Open Lawn Access', 'Parking Access', 'Water Stations'],
          available: true
        },
        {
          id: `t2-${Date.now()}`,
          name: 'VIP Enclosure Pass',
          price: Number(newVenueForm.ticketPriceVIP),
          perks: ['VIP Reserved Lounge', 'Fast Track Gate Entry', 'Complimentary Farsan Box'],
          available: true
        }
      ],
      isOrganizerCustom: true
    };

    onAddVenue(newVenue);
    setSelectedVenueId(newVenue.id);
    setActiveTab('control');
    setSaveSuccessMsg(`New Garba Ground "${newVenue.name}" successfully registered and published live!`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181c24] text-[#dc2626] text-xs font-bold uppercase tracking-wider border border-[#334155]">
              <Radio className="w-3.5 h-3.5 text-[#dc2626] animate-pulse" />
              Real-Time Ground Control Console
            </span>
            <span className="text-xs text-[#94a3b8] uppercase tracking-wider font-semibold">
              Live Broadcast to 50,000+ Dancers
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Organizer <span className="text-[#facc15]">Desk</span>
          </h1>
          <p className="text-sm md:text-base text-[#94a3b8] leading-relaxed">
            Manage your ground locations, update start times and Maha Aarti schedules in real-time, adjust live parking capacity, and monitor pass check-ins.
          </p>
        </div>

        {/* Top Tab Switcher */}
        <div className="flex items-center gap-2 bg-[#181c24] p-1.5 rounded-full border border-[#222938] self-start lg:self-end">
          <button
            onClick={() => setActiveTab('control')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs shadow transition-all ${
              activeTab === 'control'
                ? 'bg-[#facc15] text-[#0f131c]'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4 shrink-0" />
            Live Event Controller
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all ${
              activeTab === 'register'
                ? 'bg-[#facc15] text-[#0f131c]'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            Register New Ground
          </button>
          <button
            onClick={() => setActiveTab('attendees')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all ${
              activeTab === 'attendees'
                ? 'bg-[#facc15] text-[#0f131c]'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            Passes &amp; Check-In ({bookedPasses.length})
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-sm font-semibold flex items-center gap-2 animate-fadeIn shadow-lg">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* TAB 1: Live Event Controller */}
      {activeTab === 'control' && (
        <div className="flex flex-col gap-6">
          {/* Ground Selector Bar */}
          <div className="bg-[#181c24] border border-[#222938] p-4 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">
                Select Venue to Manage:
              </span>
              <select
                value={selectedVenueId}
                onChange={(e) => handleSelectVenueToEdit(e.target.value)}
                className="bg-[#222938] text-white text-xs font-bold px-3 py-2 rounded-xl border border-[#334155] outline-none cursor-pointer"
              >
                {venues.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.area})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Synced with Google Maps API and User Apps</span>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSaveVenueChanges} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Locations & Schedule */}
            <div className="bg-[#181c24] border border-[#222938] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-[#222938]">
                <MapPin className="w-4 h-4 text-[#facc15]" />
                Event Location &amp; Timings
              </h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Venue Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Full Physical Address</label>
                <textarea
                  rows={2}
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#94a3b8] uppercase">GPS Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={editFormData.lat}
                    onChange={(e) => setEditFormData({ ...editFormData, lat: parseFloat(e.target.value) || editFormData.lat })}
                    className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#94a3b8] uppercase">GPS Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={editFormData.lng}
                    onChange={(e) => setEditFormData({ ...editFormData, lng: parseFloat(e.target.value) || editFormData.lng })}
                    className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[#222938] flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Start Time</label>
                    <input
                      type="text"
                      value={editFormData.schedule.startTime}
                      onChange={(e) => setEditFormData({
                        ...editFormData,
                        schedule: { ...editFormData.schedule, startTime: e.target.value }
                      })}
                      className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#94a3b8] uppercase">End Time</label>
                    <input
                      type="text"
                      value={editFormData.schedule.endTime}
                      onChange={(e) => setEditFormData({
                        ...editFormData,
                        schedule: { ...editFormData.schedule, endTime: e.target.value }
                      })}
                      className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Maha Aarti Time &amp; Details</label>
                  <input
                    type="text"
                    value={editFormData.schedule.aartiTime}
                    onChange={(e) => setEditFormData({
                      ...editFormData,
                      schedule: { ...editFormData.schedule, aartiTime: e.target.value }
                    })}
                    className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Column 2: Artists & Real-time Parking Telemetry */}
            <div className="bg-[#181c24] border border-[#222938] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-[#222938]">
                <Car className="w-4 h-4 text-[#2563eb]" />
                Live Parking &amp; Crowd Telemetry
              </h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Headlining Artist</label>
                <input
                  type="text"
                  value={editFormData.artistHeadliner}
                  onChange={(e) => setEditFormData({ ...editFormData, artistHeadliner: e.target.value })}
                  className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
                />
              </div>

              {/* Parking Zone Adjusters */}
              <div className="flex flex-col gap-3 pt-2">
                <span className="text-[11px] font-bold text-[#94a3b8] uppercase">
                  Manage Parking Lots (Available Spots)
                </span>

                {editFormData.parkingZones.map((pz, idx) => (
                  <div key={pz.id} className="p-3 bg-[#222938] rounded-xl border border-[#334155] flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{pz.name}</span>
                      <span className="text-[10px] text-[#94a3b8]">Gate: {pz.gate}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-[#94a3b8]">Available Spots</label>
                        <input
                          type="number"
                          min="0"
                          max={pz.totalSpots}
                          value={pz.availableSpots}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            const newZones = [...editFormData.parkingZones];
                            const status = val === 0 ? 'full' : val < (pz.totalSpots * 0.2) ? 'filling' : 'flowing';
                            newZones[idx] = { ...pz, availableSpots: val, status };
                            setEditFormData({ ...editFormData, parkingZones: newZones });
                          }}
                          className="w-full mt-1 bg-[#181c24] text-white text-xs p-1.5 rounded-lg border border-[#334155] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#94a3b8]">Status</label>
                        <select
                          value={pz.status}
                          onChange={(e: any) => {
                            const newZones = [...editFormData.parkingZones];
                            newZones[idx] = { ...pz, status: e.target.value };
                            setEditFormData({ ...editFormData, parkingZones: newZones });
                          }}
                          className="w-full mt-1 bg-[#181c24] text-white text-xs p-1.5 rounded-lg border border-[#334155] outline-none"
                        >
                          <option value="flowing">Flowing (Green)</option>
                          <option value="filling">Filling Fast (Yellow)</option>
                          <option value="full">Lot Full (Red)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Bulletins, Contact Phone & Broadcast */}
            <div className="bg-[#181c24] border border-[#222938] rounded-2xl p-6 shadow-xl flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-[#222938]">
                  <Phone className="w-4 h-4 text-[#dc2626]" />
                  Direct Contact &amp; Alerts
                </h3>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Organizer Official Phone (For User Calls)</label>
                  <input
                    type="text"
                    value={editFormData.organizer.phone}
                    onChange={(e) => setEditFormData({
                      ...editFormData,
                      organizer: { ...editFormData.organizer, phone: e.target.value }
                    })}
                    className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Live Announcement / Gate Bulletin</label>
                  <textarea
                    rows={3}
                    value={editFormData.organizer.announcements[0] || ''}
                    onChange={(e) => setEditFormData({
                      ...editFormData,
                      organizer: {
                        ...editFormData.organizer,
                        announcements: [e.target.value]
                      }
                    })}
                    placeholder="Broadcast gate alerts, parking diversions, or weather info..."
                    className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none resize-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#222938] border border-[#334155] flex flex-col gap-1 text-xs">
                  <span className="font-bold text-[#facc15] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Instant Sync Protocol:
                  </span>
                  <p className="text-[11px] text-[#94a3b8]">
                    Clicking "Broadcast Live Updates" updates ground locations on Google Maps, parking telemetry, and pass booking prices in real-time.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#facc15] hover:bg-[#eab308] text-[#0f131c] font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Broadcast Live Updates Now
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Register New Ground */}
      {activeTab === 'register' && (
        <form onSubmit={handleRegisterNewVenue} className="bg-[#181c24] border border-[#222938] rounded-2xl p-6 lg:p-8 shadow-xl flex flex-col gap-6 max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-1 pb-4 border-b border-[#222938]">
            <h3 className="text-xl font-bold text-white">Register a New Garba Venue</h3>
            <p className="text-xs text-[#94a3b8]">
              Publish your venue to the Taal &amp; Raas network. Dancers can book passes, call your desk, and navigate directly with Google Maps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Ground / Event Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Navrang Symphony Dandiya"
                value={newVenueForm.name}
                onChange={(e) => setNewVenueForm({ ...newVenueForm, name: e.target.value })}
                className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#94a3b8] uppercase">City</label>
              <select
                value={newVenueForm.city}
                onChange={(e: any) => setNewVenueForm({ ...newVenueForm, city: e.target.value })}
                className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
              >
                <option value="ahmedabad">Ahmedabad</option>
                <option value="vadodara">Vadodara</option>
                <option value="surat">Surat</option>
                <option value="rajkot">Rajkot</option>
                <option value="mumbai">Mumbai</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Area / Landmark</label>
              <input
                type="text"
                placeholder="e.g. SG Highway, Bodakdev"
                value={newVenueForm.area}
                onChange={(e) => setNewVenueForm({ ...newVenueForm, area: e.target.value })}
                className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Headlining Artist</label>
              <input
                type="text"
                placeholder="e.g. Falguni Pathak / Traditional Dholis"
                value={newVenueForm.artistHeadliner}
                onChange={(e) => setNewVenueForm({ ...newVenueForm, artistHeadliner: e.target.value })}
                className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Full Address for Google Maps Navigation *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ground 4, Near Sindhu Bhavan Road, Ahmedabad, Gujarat 380054"
                value={newVenueForm.address}
                onChange={(e) => setNewVenueForm({ ...newVenueForm, address: e.target.value })}
                className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Organizer Phone (For Direct Inquiries) *</label>
              <input
                type="tel"
                required
                placeholder="+91 98250 00000"
                value={newVenueForm.organizerPhone}
                onChange={(e) => setNewVenueForm({ ...newVenueForm, organizerPhone: e.target.value })}
                className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Standard Pass Price (₹)</label>
              <input
                type="number"
                min="0"
                value={newVenueForm.ticketPriceSingle}
                onChange={(e) => setNewVenueForm({ ...newVenueForm, ticketPriceSingle: Number(e.target.value) })}
                className="bg-[#222938] text-white text-xs p-2.5 rounded-xl border border-[#334155] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Publish Ground &amp; Open Live Pass Sales
          </button>
        </form>
      )}

      {/* TAB 3: Passes & Attendee Desk */}
      {activeTab === 'attendees' && (
        <div className="bg-[#181c24] border border-[#222938] rounded-2xl p-6 shadow-xl flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#222938]">
            <div>
              <h3 className="text-lg font-bold text-white">Live Passholder &amp; Gate Entry Log</h3>
              <p className="text-xs text-[#94a3b8]">Verified QR passes issued through the Taal &amp; Raas companion</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#222938] text-[#facc15] text-xs font-bold border border-[#334155]">
                {bookedPasses.length} Total Bookings
              </span>
            </div>
          </div>

          {bookedPasses.length === 0 ? (
            <div className="text-center py-12 text-[#94a3b8] text-xs flex flex-col items-center gap-2">
              <Ticket className="w-10 h-10 text-[#334155]" />
              <p className="font-semibold text-white">No passes booked yet.</p>
              <p>Book a pass from the Explore Venues screen or Dandiya Pass button to see live gate entry logs.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#222938] text-[#94a3b8] uppercase text-[10px]">
                    <th className="py-3 px-3">Pass Code</th>
                    <th className="py-3 px-3">Attendee</th>
                    <th className="py-3 px-3">Venue</th>
                    <th className="py-3 px-3">Tier</th>
                    <th className="py-3 px-3">Gate</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222938]">
                  {bookedPasses.map((pass) => (
                    <tr key={pass.id} className="hover:bg-[#222938]/50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#facc15]">
                        {pass.bookingCode}
                      </td>
                      <td className="py-3 px-3 font-semibold text-white">
                        {pass.buyerName}
                        <div className="text-[10px] text-[#94a3b8]">{pass.buyerPhone}</div>
                      </td>
                      <td className="py-3 px-3 text-[#dfe2ee]">{pass.venueName}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-[#222938] text-white text-[10px] border border-[#334155]">
                          {pass.tierName}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#94a3b8]">{pass.gateEntry}</td>
                      <td className="py-3 px-3">
                        {pass.status === 'checked-in' ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                            ✓ Entered Gate
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-[#facc15]/20 text-[#facc15] text-[10px] font-bold border border-[#facc15]/30">
                            Valid Pass
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        {pass.status !== 'checked-in' && (
                          <button
                            onClick={() => onCheckInPass(pass.id)}
                            className="px-3 py-1 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[11px] font-bold transition-all shadow"
                          >
                            Scan Entry
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

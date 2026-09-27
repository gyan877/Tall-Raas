import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Ticket, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Car, 
  QrCode, 
  Download,
  Share2
} from 'lucide-react';
import { Venue, TicketTier, BookedPass } from '../types/navratri';

interface PassBookingModalProps {
  venues: Venue[];
  initialVenue?: Venue | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (pass: BookedPass) => void;
}

export const PassBookingModal: React.FC<PassBookingModalProps> = ({
  venues,
  initialVenue,
  isOpen,
  onClose,
  onBookingConfirmed
}) => {
  if (!isOpen) return null;

  const [selectedVenueId, setSelectedVenueId] = useState<string>(initialVenue?.id || venues[0]?.id || '');
  const activeVenue = venues.find(v => v.id === selectedVenueId) || venues[0];

  const [selectedNight, setSelectedNight] = useState<number>(4);
  const [selectedTierId, setSelectedTierId] = useState<string>(activeVenue?.ticketTiers[0]?.id || '');
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [buyerName, setBuyerName] = useState('Aanya Patel');
  const [buyerPhone, setBuyerPhone] = useState('+91 98980 12345');
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [confirmedPass, setConfirmedPass] = useState<BookedPass | null>(null);

  const selectedTier = activeVenue?.ticketTiers.find(t => t.id === selectedTierId) || activeVenue?.ticketTiers[0];
  const unitPrice = selectedTier?.price || 499;
  const totalPrice = unitPrice * ticketCount;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeVenue || !selectedTier) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }

    const newPass: BookedPass = {
      id: `pass-${Date.now()}`,
      bookingCode: `TR-2025-${activeVenue.city.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      venueId: activeVenue.id,
      venueName: activeVenue.name,
      venueArea: activeVenue.area,
      nightNumber: selectedNight,
      dateStr: `Night ${selectedNight} • Oct 2025`,
      tierName: selectedTier.name,
      ticketCount: ticketCount,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
      buyerName: buyerName,
      buyerPhone: buyerPhone,
      attendeeNames: [buyerName],
      bookedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      gateEntry: activeVenue.parkingZones[0]?.gate || 'Gate 1 Main',
      parkingPassIncluded: true,
      status: 'valid'
    };

    setConfirmedPass(newPass);
    onBookingConfirmed(newPass);
    setStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#181c24] border border-[#334155] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#222938] border-b border-[#334155] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#facc15] text-[#0f131c] flex items-center justify-center font-bold">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {step === 'form' ? 'Book Dandiya Entry Pass' : 'Pass Confirmed!'}
              </h3>
              <p className="text-[11px] text-[#94a3b8]">Instant RFID Smart Entry Barcode</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#94a3b8] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'form' ? (
            <form onSubmit={handleConfirmBooking} className="flex flex-col gap-5 text-xs">
              {/* Venue Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Selected Garba Venue</label>
                <select
                  value={selectedVenueId}
                  onChange={(e) => {
                    setSelectedVenueId(e.target.value);
                    const v = venues.find(x => x.id === e.target.value);
                    if (v && v.ticketTiers[0]) {
                      setSelectedTierId(v.ticketTiers[0].id);
                    }
                  }}
                  className="bg-[#222938] text-white text-xs font-semibold p-3 rounded-xl border border-[#334155] outline-none"
                >
                  {venues.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.area}) — ₹{v.ticketTiers[0]?.price || 499}
                    </option>
                  ))}
                </select>
              </div>

              {/* Night Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Select Navratri Night</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setSelectedNight(n)}
                      className={`py-2 rounded-xl text-center font-bold text-xs transition-all ${
                        selectedNight === n
                          ? 'bg-[#facc15] text-[#0f131c] shadow'
                          : 'bg-[#222938] text-[#94a3b8] hover:text-white border border-[#334155]'
                      }`}
                    >
                      Night {n}
                      {n === 4 && <span className="block text-[8px] text-[#dc2626] font-extrabold uppercase">Tonight</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ticket Tier Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase">Select Pass Tier</label>
                <div className="flex flex-col gap-2">
                  {activeVenue.ticketTiers.map((tier) => (
                    <label
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedTierId === tier.id
                          ? 'bg-[#222938] border-[#facc15] ring-1 ring-[#facc15]'
                          : 'bg-[#181c24] border-[#334155] hover:border-[#64748b]'
                      }`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-white">{tier.name}</span>
                        <span className="text-[10px] text-[#94a3b8]">{tier.perks.join(' • ')}</span>
                      </div>
                      <span className="text-sm font-extrabold text-[#facc15]">
                        ₹{tier.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between p-3 bg-[#222938] rounded-xl border border-[#334155]">
                <div className="flex flex-col">
                  <span className="font-bold text-white">Number of Dancers</span>
                  <span className="text-[10px] text-[#94a3b8]">Free Entry for children under 5</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-7 h-7 rounded-lg bg-[#181c24] border border-[#334155] text-white font-bold"
                  >
                    −
                  </button>
                  <span className="text-sm font-extrabold text-white w-5 text-center">{ticketCount}</span>
                  <button
                    type="button"
                    onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                    className="w-7 h-7 rounded-lg bg-[#181c24] border border-[#334155] text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buyer Contact */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#94a3b8] uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="bg-[#222938] text-white p-2.5 rounded-xl border border-[#334155] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#94a3b8] uppercase">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="bg-[#222938] text-white p-2.5 rounded-xl border border-[#334155] outline-none"
                  />
                </div>
              </div>

              {/* Price Summary & Submit */}
              <div className="pt-2 border-t border-[#222938] flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94a3b8]">Total Amount ({ticketCount} Pass{ticketCount > 1 ? 'es' : ''})</span>
                  <span className="text-xl font-extrabold text-[#facc15]">₹{totalPrice}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  Confirm &amp; Generate Digital Pass (₹{totalPrice})
                </button>
              </div>
            </form>
          ) : (
            confirmedPass && (
              <div className="flex flex-col items-center gap-5 text-center">
                {/* Digital Ticket Card */}
                <div className="w-full bg-gradient-to-b from-[#222938] to-[#181c24] border-2 border-[#facc15] rounded-3xl p-6 shadow-2xl relative flex flex-col items-center gap-4">
                  {/* Stamp */}
                  <div className="flex items-center justify-between w-full pb-3 border-b border-[#334155]">
                    <span className="text-xs font-bold text-[#facc15] tracking-widest uppercase">
                      Taal &amp; Raas Pass
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      ✓ Confirmed &amp; Verified
                    </span>
                  </div>

                  {/* QR Code Graphic */}
                  <div className="p-3 bg-white rounded-2xl shadow-xl">
                    <svg viewBox="0 0 100 100" className="w-32 h-32">
                      <rect width="100" height="100" fill="white" />
                      {/* Stylized QR Matrix Pattern */}
                      <rect x="10" y="10" width="25" height="25" fill="#0f131c" />
                      <rect x="15" y="15" width="15" height="15" fill="white" />
                      <rect x="18" y="18" width="9" height="9" fill="#0f131c" />
                      
                      <rect x="65" y="10" width="25" height="25" fill="#0f131c" />
                      <rect x="70" y="15" width="15" height="15" fill="white" />
                      <rect x="73" y="18" width="9" height="9" fill="#0f131c" />
                      
                      <rect x="10" y="65" width="25" height="25" fill="#0f131c" />
                      <rect x="15" y="70" width="15" height="15" fill="white" />
                      <rect x="18" y="73" width="9" height="9" fill="#0f131c" />

                      <rect x="40" y="15" width="15" height="8" fill="#0f131c" />
                      <rect x="42" y="30" width="20" height="8" fill="#0f131c" />
                      <rect x="40" y="45" width="8" height="20" fill="#0f131c" />
                      <rect x="55" y="45" width="12" height="12" fill="#0f131c" />
                      <rect x="70" y="65" width="18" height="18" fill="#0f131c" />
                    </svg>
                  </div>

                  {/* Pass Details */}
                  <div className="flex flex-col gap-1 w-full">
                    <span className="font-mono text-base font-extrabold text-[#facc15] tracking-wider">
                      {confirmedPass.bookingCode}
                    </span>
                    <h4 className="text-base font-bold text-white">{confirmedPass.venueName}</h4>
                    <p className="text-xs text-[#94a3b8]">{confirmedPass.venueArea}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full text-xs pt-2 border-t border-[#334155]">
                    <div className="p-2 rounded-xl bg-[#0f131c] flex flex-col text-left">
                      <span className="text-[10px] text-[#94a3b8] uppercase">Night / Date</span>
                      <span className="font-bold text-white">{confirmedPass.dateStr}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#0f131c] flex flex-col text-left">
                      <span className="text-[10px] text-[#94a3b8] uppercase">Gate Entry</span>
                      <span className="font-bold text-[#facc15]">{confirmedPass.gateEntry}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full text-xs text-[#94a3b8]">
                    <span>Passholder: <strong className="text-white">{confirmedPass.buyerName}</strong></span>
                    <span>{confirmedPass.ticketCount} Dancer{confirmedPass.ticketCount > 1 ? 's' : ''} (Paid ₹{confirmedPass.totalPrice})</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl bg-[#facc15] hover:bg-[#eab308] text-[#0f131c] font-bold text-xs shadow transition-all"
                  >
                    Done &amp; Save to Wallet
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

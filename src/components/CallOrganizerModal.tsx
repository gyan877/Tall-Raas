import React, { useState } from 'react';
import { X, Phone, ShieldCheck, Copy, Check, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Venue } from '../types/navratri';

interface CallOrganizerModalProps {
  venue: Venue | null;
  isOpen: boolean;
  onClose: () => void;
  onBookPass: (venue: Venue) => void;
}

export const CallOrganizerModal: React.FC<CallOrganizerModalProps> = ({
  venue,
  isOpen,
  onClose,
  onBookPass
}) => {
  if (!isOpen || !venue) return null;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(venue.organizer.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#181c24] border border-[#334155] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#222938] border-b border-[#334155] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#facc15] text-[#0f131c] flex items-center justify-center font-bold">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Call Ground Organizer</h3>
              <p className="text-[11px] text-[#94a3b8]">{venue.name}</p>
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
        <div className="p-6 flex flex-col gap-5 text-xs">
          {/* Organizer Info Box */}
          <div className="p-4 rounded-2xl bg-[#222938] border border-[#334155] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">{venue.organizer.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Official Desk
              </span>
            </div>

            <p className="text-[#94a3b8] text-[11px]">
              Direct line for entry pass queries, VIP lounges, parking valet reservations, and lost-and-found.
            </p>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0f131c] border border-[#334155] mt-1">
              <span className="font-mono text-base font-bold text-[#facc15]">
                {venue.organizer.phone}
              </span>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-[#222938] text-white hover:text-[#facc15] text-xs font-semibold flex items-center gap-1 border border-[#334155] transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-[#94a3b8]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#facc15] shrink-0" />
              <span>Ground Helpline active daily from <strong>4:00 PM – 2:30 AM</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#facc15] shrink-0" />
              <span>{venue.address}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#222938]">
            <a
              href={`tel:${venue.organizer.phone.replace(/[^0-9+]/g, '')}`}
              className="w-full py-3.5 rounded-xl bg-[#facc15] hover:bg-[#eab308] text-[#0f131c] font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now ({venue.organizer.phone})
            </a>

            <button
              onClick={() => {
                onClose();
                onBookPass(venue);
              }}
              className="w-full py-2.5 rounded-xl bg-[#222938] hover:bg-[#31353e] text-white font-bold text-xs border border-[#334155] transition-colors"
            >
              Or Book Pass Online (Instant QR)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

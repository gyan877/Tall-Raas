import React from 'react';
import { X, Ticket, QrCode, MapPin, Calendar, CheckCircle2, Navigation, Trash2 } from 'lucide-react';
import { BookedPass } from '../types/navratri';

interface PassWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  passes: BookedPass[];
  onOpenBooking: () => void;
}

export const PassWalletModal: React.FC<PassWalletModalProps> = ({
  isOpen,
  onClose,
  passes,
  onOpenBooking
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#181c24] border border-[#334155] rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#222938] border-b border-[#334155] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#facc15] text-[#0f131c] flex items-center justify-center font-bold">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">My Dandiya Pass Wallet</h3>
              <p className="text-[11px] text-[#94a3b8]">{passes.length} Active Digital Wristbands</p>
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
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
          {passes.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center gap-3 text-xs text-[#94a3b8]">
              <Ticket className="w-12 h-12 text-[#334155]" />
              <p className="text-sm font-bold text-white">No passes booked yet</p>
              <p>Book passes for tonight's top Garba grounds with fast-track RFID smart entry.</p>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#facc15] text-[#0f131c] font-bold text-xs shadow hover:bg-[#eab308] transition-all"
              >
                Book Dandiya Pass Now
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {passes.map((pass) => (
                <div
                  key={pass.id}
                  className="bg-[#222938] border border-[#334155] rounded-2xl p-5 shadow-lg flex flex-col gap-3 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-sm font-extrabold text-[#facc15]">
                        {pass.bookingCode}
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">{pass.venueName}</h4>
                      <p className="text-xs text-[#94a3b8] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#facc15]" /> {pass.venueArea}
                      </p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      ✓ Valid Entry
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs pt-1 border-t border-[#334155]/60">
                    <div className="p-2 rounded-lg bg-[#181c24] flex flex-col">
                      <span className="text-[10px] text-[#94a3b8]">Night</span>
                      <span className="font-bold text-white">{pass.dateStr}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#181c24] flex flex-col">
                      <span className="text-[10px] text-[#94a3b8]">Tier</span>
                      <span className="font-bold text-white">{pass.tierName}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#181c24] flex flex-col">
                      <span className="text-[10px] text-[#94a3b8]">Gate</span>
                      <span className="font-bold text-[#facc15]">{pass.gateEntry}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#94a3b8] pt-1">
                    <span>Passholder: <strong className="text-white">{pass.buyerName}</strong> ({pass.ticketCount} dancer{pass.ticketCount > 1 ? 's' : ''})</span>
                    <span className="font-bold text-[#facc15]">Paid ₹{pass.totalPrice}</span>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                Book Pass for Another Ground
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Bell, AlertTriangle, Car, Users, Sparkles, CheckCircle2 } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: 'explore' | 'parking' | 'sangath' | 'organizer') => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: 'parking',
      title: 'Mirchi Rock West Lot Full',
      time: '6m ago',
      desc: 'Traffic marshals diverting cars to East Express Lot via Service Lane 2. 24 spots left.',
      actionTab: 'parking' as const,
      actionText: 'View Parking Map'
    },
    {
      id: 2,
      type: 'sangath',
      title: 'Dr. Kabir Shah sent an invite',
      time: '18m ago',
      desc: 'Matched with 96% sync for Shankus Mahotsav VIP Enclosure tonight.',
      actionTab: 'sangath' as const,
      actionText: 'View Dance Match'
    },
    {
      id: 3,
      type: 'bulletin',
      title: 'Shankus Mahotsav: Daily Icebreaker',
      time: '34m ago',
      desc: 'Communal icebreaker circle starts at 8:30 PM near Food Court 2. Manned by She-Team marshals.',
      actionTab: 'explore' as const,
      actionText: 'Check Ground'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#181c24] border border-[#334155] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#222938] border-b border-[#334155] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#facc15] text-[#0f131c] flex items-center justify-center font-bold">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Live Ground Alerts</h3>
              <p className="text-[11px] text-[#94a3b8]">Real-time telemetry and organizer broadcasts</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#94a3b8] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-5 flex flex-col gap-3 max-h-[75vh] overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-4 rounded-2xl bg-[#222938] border border-[#334155] flex flex-col gap-2 shadow"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs flex items-center gap-1.5">
                  {n.type === 'parking' && <Car className="w-3.5 h-3.5 text-[#dc2626]" />}
                  {n.type === 'sangath' && <Users className="w-3.5 h-3.5 text-[#facc15]" />}
                  {n.type === 'bulletin' && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                  {n.title}
                </span>
                <span className="text-[10px] text-[#94a3b8]">{n.time}</span>
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed">{n.desc}</p>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToTab(n.actionTab);
                }}
                className="self-start text-[11px] font-bold text-[#facc15] hover:underline pt-1 flex items-center gap-1"
              >
                {n.actionText} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
